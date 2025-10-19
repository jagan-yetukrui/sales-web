# 🚀 Product Customizer App 2.0

A next-generation product customization web application inspired by Apple, Tesla, and Nike design systems. Built with modern React, TypeScript, and cutting-edge UI/UX principles.

![Product Customizer App 2.0](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-black)

## ✨ Features

### 🎨 **Core Customization**

- **Product Selection**: MacBook Pro M3, Tesla Model Y, Nike Air Max 270
- **Color Customization**: Multiple color options with live preview
- **Configuration Options**: Storage, variants, and specifications
- **Add-ons & Accessories**: Extended warranties, peripherals, and upgrades
- **Financing Options**: Multiple payment and financing plans

### 🚀 **Advanced Features**

- **Product Comparison**: Side-by-side comparison of up to 3 products
- **Wishlist Management**: Save and organize favorite configurations
- **Interactive Product Tours**: Guided walkthrough of features
- **Social Sharing**: Share configurations across social platforms
- **Advanced Filtering**: Smart filtering by category, brand, price, and features
- **Product Reviews**: User reviews and ratings system

### 🎯 **User Experience**

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Performance Optimized**: Lazy loading, image optimization, and efficient rendering
- **Accessibility**: Keyboard navigation, ARIA roles, and screen reader support
- **Persistent Storage**: Local storage for user preferences and configurations

## 🛠️ Tech Stack

### **Frontend**

- **React 18** with Hooks and Context API
- **TypeScript** for type safety and better development experience
- **TailwindCSS** for utility-first styling
- **Framer Motion** for smooth animations and transitions
- **React Router DOM** for client-side routing

### **Design System**

- **Glassmorphic UI** with backdrop blur effects
- **Modern Color Palette**: Clean whites, sophisticated grays, and accent colors
- **Typography**: Inter and Poppins font families
- **Micro-interactions**: Hover effects, scale animations, and smooth transitions

### **Performance**

- **Optimized Images**: Lazy loading with Intersection Observer
- **Code Splitting**: Dynamic imports for better bundle management
- **Memoization**: React.memo and useMemo for performance optimization
- **Debounced Updates**: Smooth state management without excessive re-renders

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jagan-yetukrui/sales-web.git
   cd sales-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProductViewer.tsx    # Main product display
│   ├── OptionSelector.tsx    # Configuration options
│   ├── ProductComparison.tsx # Product comparison feature
│   ├── Wishlist.tsx         # Wishlist management
│   ├── ProductTour.tsx      # Interactive tours
│   ├── SocialSharing.tsx    # Social media sharing
│   ├── AdvancedFiltering.tsx # Advanced filtering
│   ├── ProductReviews.tsx   # Reviews and ratings
│   └── OptimizedImage.tsx   # Image optimization
├── pages/               # Application pages
│   ├── LandingPage.tsx      # Homepage
│   ├── CustomizePage.tsx    # Main customization interface
│   └── CheckoutPage.tsx     # Checkout process
├── context/             # React Context for state management
│   └── CustomizerContext.tsx
├── data/                # Static data and configurations
│   └── products.ts
├── hooks/               # Custom React hooks
│   └── usePerformance.ts
└── styles/              # Global styles and CSS
    └── index.css
```

## 🎨 Design Philosophy

### **Apple-Inspired Minimalism**

- Clean, uncluttered interfaces
- Focus on content and functionality
- Subtle animations and transitions
- High-quality typography and spacing

### **Tesla-Inspired Innovation**

- Futuristic design elements
- Smooth, fluid interactions
- Modern color schemes
- Advanced feature integration

### **Nike-Inspired Energy**

- Dynamic animations
- Bold, confident design choices
- Engaging user interactions
- Performance-focused experience

## 🔧 Configuration

### **Product Data**

Products are configured in `src/data/products.ts` with the following structure:

```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  category: "laptop" | "vehicle" | "wearable";
  basePrice: number;
  colors: ProductColor[];
  addons: ProductAddon[];
  financingOptions: FinancingOption[];
}
```

### **Styling**

The design system is built with TailwindCSS and custom CSS utilities:

- **Colors**: Primary blues, accent purples, neutral grays
- **Typography**: Inter for body text, Poppins for headings
- **Spacing**: Consistent 8px grid system
- **Animations**: Framer Motion for smooth transitions

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
```

### **Deploy to Vercel**

```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify**

```bash
npm run build
# Upload the 'build' folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple** for design inspiration and user experience principles
- **Tesla** for innovative interface design and smooth interactions
- **Nike** for dynamic animations and engaging user experiences
- **React Team** for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Contact

**Ramarao**

- GitHub: [@jagan-yetukrui](https://github.com/jagan-yetukrui)
- Repository: [sales-web](https://github.com/jagan-yetukrui/sales-web)

---

⭐ **Star this repository if you found it helpful!**
