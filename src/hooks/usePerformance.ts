import { useCallback, useMemo, useRef, useEffect } from 'react';

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current > 10) {
      console.warn('Component rendered too many times, consider optimization');
    }
  });

  return {
    renderCount: renderCount.current,
    isOverRendering: renderCount.current > 10
  };
};

// Debounced callback hook for performance
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
};

// Memoized image preloader
export const useImagePreloader = (imageUrls: string[]) => {
  const preloadedImages = useRef<Set<string>>(new Set());
  
  const preloadImages = useCallback(() => {
    imageUrls.forEach(url => {
      if (!preloadedImages.current.has(url)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          preloadedImages.current.add(url);
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
        };
      }
    });
  }, [imageUrls]);
  
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);
  
  return {
    isImagePreloaded: (url: string) => preloadedImages.current.has(url),
    preloadImages
  };
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);
  
  return observerRef.current;
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const startTime = useRef<number>(Date.now());
  
  const measurePerformance = useCallback((label: string) => {
    const endTime = Date.now();
    const duration = endTime - startTime.current;
    
    if (duration > 100) {
      console.warn(`Performance warning: ${label} took ${duration}ms`);
    }
    
    return duration;
  }, []);
  
  const resetTimer = useCallback(() => {
    startTime.current = Date.now();
  }, []);
  
  return {
    measurePerformance,
    resetTimer
  };
};
