import React, { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react';
import { Product, ProductColor, ProductVariant, ProductAddon } from '../data/products';

// State interface for the customizer
interface CustomizerState {
  selectedProduct: Product | null;
  selectedColor: ProductColor | null;
  selectedVariant: ProductVariant | null;
  selectedAddons: ProductAddon[];
  totalPrice: number;
  isLoading: boolean;
  showARPreview: boolean;
  theme: 'light' | 'dark';
}

// Action types for state management
type CustomizerAction =
  | { type: 'SET_PRODUCT'; payload: Product }
  | { type: 'SET_COLOR'; payload: ProductColor }
  | { type: 'SET_VARIANT'; payload: ProductVariant }
  | { type: 'TOGGLE_ADDON'; payload: ProductAddon }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_AR_PREVIEW' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'RESET_CONFIGURATION' }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<CustomizerState> };

// Initial state
const initialState: CustomizerState = {
  selectedProduct: null,
  selectedColor: null,
  selectedVariant: null,
  selectedAddons: [],
  totalPrice: 0,
  isLoading: false,
  showARPreview: false,
  theme: 'light',
};

// Reducer function for state management
const customizerReducer = (state: CustomizerState, action: CustomizerAction): CustomizerState => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload,
        selectedColor: action.payload.colors[0],
        selectedVariant: action.payload.colors[0].variants[0],
        selectedAddons: [],
        isLoading: true,
      };

    case 'SET_COLOR':
      return {
        ...state,
        selectedColor: action.payload,
        selectedVariant: action.payload.variants[0],
        isLoading: true,
      };

    case 'SET_VARIANT':
      return {
        ...state,
        selectedVariant: action.payload,
      };

    case 'TOGGLE_ADDON':
      const isSelected = state.selectedAddons.some(addon => addon.id === action.payload.id);
      return {
        ...state,
        selectedAddons: isSelected
          ? state.selectedAddons.filter(addon => addon.id !== action.payload.id)
          : [...state.selectedAddons, action.payload],
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'TOGGLE_AR_PREVIEW':
      return {
        ...state,
        showARPreview: !state.showARPreview,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case 'RESET_CONFIGURATION':
      return {
        ...initialState,
        theme: state.theme, // Preserve theme preference
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// Context interface
interface CustomizerContextType {
  state: CustomizerState;
  dispatch: React.Dispatch<CustomizerAction>;
  calculateTotalPrice: () => number;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

// Create context
const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

// Provider component
export const CustomizerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(customizerReducer, initialState);
  
  // Debounced dispatch to prevent rapid state changes
  const debouncedDispatch = useCallback((action: any) => {
    dispatch(action);
  }, []);

  // Calculate total price
  const calculateTotalPrice = React.useCallback((): number => {
    if (!state.selectedProduct || !state.selectedVariant) return 0;
    
    const basePrice = state.selectedProduct.basePrice;
    const variantPrice = state.selectedVariant.price;
    const addonsPrice = state.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    
    return basePrice + variantPrice + addonsPrice;
  }, [state.selectedProduct, state.selectedVariant, state.selectedAddons]);

  // Save configuration to localStorage
  const saveToStorage = React.useCallback(() => {
    const config = {
      selectedProduct: state.selectedProduct,
      selectedColor: state.selectedColor,
      selectedVariant: state.selectedVariant,
      selectedAddons: state.selectedAddons,
      theme: state.theme,
    };
    localStorage.setItem('customizer-config', JSON.stringify(config));
  }, [state.selectedProduct, state.selectedColor, state.selectedVariant, state.selectedAddons, state.theme]);

  // Load configuration from localStorage
  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('customizer-config');
      if (saved) {
        const config = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: config });
      }
    } catch (error) {
      console.error('Failed to load configuration from storage:', error);
    }
  }, [dispatch]);

  // Clear loading state after a short delay
  React.useEffect(() => {
    if (state.isLoading) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 1000); // Clear loading after 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [state.isLoading]);

  // Auto-save to storage when configuration changes - debounced
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.selectedProduct) {
        saveToStorage();
      }
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [state.selectedProduct?.id, state.selectedColor?.id, state.selectedVariant?.id, state.selectedAddons.length]);

  const value: CustomizerContextType = useMemo(() => ({
    state,
    dispatch: debouncedDispatch,
    calculateTotalPrice,
    saveToStorage,
    loadFromStorage,
  }), [state, debouncedDispatch, calculateTotalPrice, saveToStorage, loadFromStorage]);

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
};

// Custom hook to use the context
export const useCustomizer = (): CustomizerContextType => {
  const context = useContext(CustomizerContext);
  if (context === undefined) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
