// Advanced product data structure for App 2.0
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  image: string;
  specs?: string[];
  description?: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  variants: ProductVariant[];
  previewImage?: string;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'protection' | 'accessories' | 'services' | 'financing';
  icon?: string;
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  colors: ProductColor[];
  addons: ProductAddon[];
  category: 'laptop' | 'phone' | 'vehicle' | 'wearable';
  brand: string;
  featured?: boolean;
  specs?: {
    display?: string;
    processor?: string;
    battery?: string;
    storage?: string;
  };
}

// Enhanced product data for App 2.0
export const products: Product[] = [
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro M3',
    description: 'Supercharged by M3 chip. Built for pros.',
    basePrice: 1999,
    category: 'laptop',
    brand: 'Apple',
    featured: true,
    specs: {
      display: '14.2-inch Liquid Retina XDR',
      processor: 'Apple M3 chip',
      battery: 'Up to 18 hours',
      storage: '512GB SSD'
    },
    colors: [
      {
        id: 'space-black',
        name: 'Space Black',
        hex: '#1c1c1e',
        variants: [
          { 
            id: 'm3-512gb', 
            name: 'M3 / 8GB / 512GB', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['8-core CPU', '10-core GPU', '512GB SSD'],
            description: 'Perfect for everyday tasks and creative work'
          },
          { 
            id: 'm3-1tb', 
            name: 'M3 / 8GB / 1TB', 
            price: 200, 
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['8-core CPU', '10-core GPU', '1TB SSD'],
            description: 'More storage for your creative projects'
          },
          { 
            id: 'm3-pro-512gb', 
            name: 'M3 Pro / 18GB / 512GB', 
            price: 400, 
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['12-core CPU', '18-core GPU', '512GB SSD'],
            description: 'Pro performance for demanding workflows'
          }
        ]
      },
      {
        id: 'silver',
        name: 'Silver',
        hex: '#d1d1d1',
        variants: [
          { 
            id: 'm3-512gb', 
            name: 'M3 / 8GB / 512GB', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['8-core CPU', '10-core GPU', '512GB SSD'],
            description: 'Perfect for everyday tasks and creative work'
          },
          { 
            id: 'm3-1tb', 
            name: 'M3 / 8GB / 1TB', 
            price: 200, 
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['8-core CPU', '10-core GPU', '1TB SSD'],
            description: 'More storage for your creative projects'
          },
          { 
            id: 'm3-pro-512gb', 
            name: 'M3 Pro / 18GB / 512GB', 
            price: 400, 
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['12-core CPU', '18-core GPU', '512GB SSD'],
            description: 'Pro performance for demanding workflows'
          }
        ]
      }
    ],
    addons: [
      { 
        id: 'apple-care-pro', 
        name: 'Apple Care+ for Mac', 
        price: 399, 
        description: 'Extended warranty and technical support',
        category: 'protection',
        icon: '🛡️',
        popular: true
      },
      { 
        id: 'magic-mouse', 
        name: 'Magic Mouse', 
        price: 79, 
        description: 'Wireless mouse with Multi-Touch surface',
        category: 'accessories',
        icon: '🖱️'
      },
      { 
        id: 'magic-keyboard', 
        name: 'Magic Keyboard with Touch ID', 
        price: 149, 
        description: 'Wireless keyboard with Touch ID',
        category: 'accessories',
        icon: '⌨️'
      },
      { 
        id: 'usb-c-hub', 
        name: 'USB-C Hub', 
        price: 79, 
        description: 'Connect multiple devices with one port',
        category: 'accessories',
        icon: '🔌'
      }
    ]
  },
  {
    id: 'tesla-model-y',
    name: 'Tesla Model Y',
    description: 'Electric SUV with Autopilot capabilities.',
    basePrice: 47240,
    category: 'vehicle',
    brand: 'Tesla',
    featured: true,
    specs: {
      display: '15-inch touchscreen',
      processor: 'Tesla Full Self-Driving computer',
      battery: 'Up to 330 miles range',
      storage: '68 cubic feet cargo space'
    },
    colors: [
      {
        id: 'pearl-white',
        name: 'Pearl White Multi-Coat',
        hex: '#ffffff',
        variants: [
          { 
            id: 'standard-range', 
            name: 'Standard Range', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['279 miles range', '0-60 mph in 5.0s', 'Top speed 135 mph'],
            description: 'Efficient and practical for daily driving'
          },
          { 
            id: 'long-range', 
            name: 'Long Range AWD', 
            price: 5000, 
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['330 miles range', '0-60 mph in 4.8s', 'Top speed 135 mph'],
            description: 'All-wheel drive with extended range'
          },
          { 
            id: 'performance', 
            name: 'Performance', 
            price: 10000, 
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['303 miles range', '0-60 mph in 3.5s', 'Top speed 155 mph'],
            description: 'Maximum performance and acceleration'
          }
        ]
      },
      {
        id: 'midnight-silver',
        name: 'Midnight Silver Metallic',
        hex: '#4a4a4a',
        variants: [
          { 
            id: 'standard-range', 
            name: 'Standard Range', 
            price: 0, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['279 miles range', '0-60 mph in 5.0s', 'Top speed 135 mph'],
            description: 'Efficient and practical for daily driving'
          },
          { 
            id: 'long-range', 
            name: 'Long Range AWD', 
            price: 5000, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['330 miles range', '0-60 mph in 4.8s', 'Top speed 135 mph'],
            description: 'All-wheel drive with extended range'
          },
          { 
            id: 'performance', 
            name: 'Performance', 
            price: 10000, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['303 miles range', '0-60 mph in 3.5s', 'Top speed 155 mph'],
            description: 'Maximum performance and acceleration'
          }
        ]
      },
      {
        id: 'deep-blue',
        name: 'Deep Blue Metallic',
        hex: '#1e3a8a',
        variants: [
          { 
            id: 'standard-range', 
            name: 'Standard Range', 
            price: 0, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['279 miles range', '0-60 mph in 5.0s', 'Top speed 135 mph'],
            description: 'Efficient and practical for daily driving'
          },
          { 
            id: 'long-range', 
            name: 'Long Range AWD', 
            price: 5000, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['330 miles range', '0-60 mph in 4.8s', 'Top speed 135 mph'],
            description: 'All-wheel drive with extended range'
          },
          { 
            id: 'performance', 
            name: 'Performance', 
            price: 10000, 
            image: 'https://www.tesla.com/sites/default/files/images/model-y/model-y-hero-social.jpg',
            specs: ['303 miles range', '0-60 mph in 3.5s', 'Top speed 155 mph'],
            description: 'Maximum performance and acceleration'
          }
        ]
      }
    ],
    addons: [
      { 
        id: 'enhanced-autopilot', 
        name: 'Enhanced Autopilot', 
        price: 6000, 
        description: 'Navigate on Autopilot and Auto Lane Change',
        category: 'services',
        icon: '🤖',
        popular: true
      },
      { 
        id: 'full-self-driving', 
        name: 'Full Self-Driving Capability', 
        price: 12000, 
        description: 'Complete autonomous driving capabilities',
        category: 'services',
        icon: '🚗'
      },
      { 
        id: 'premium-interior', 
        name: 'Premium Interior', 
        price: 2000, 
        description: 'Premium materials and enhanced comfort',
        category: 'accessories',
        icon: '🪑'
      },
      { 
        id: 'wall-connector', 
        name: 'Wall Connector', 
        price: 500, 
        description: 'Home charging station installation',
        category: 'accessories',
        icon: '🔌'
      }
    ]
  },
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270',
    description: 'Maximum comfort meets maximum style.',
    basePrice: 150,
    category: 'wearable',
    brand: 'Nike',
    featured: true,
    specs: {
      display: 'N/A',
      processor: 'N/A',
      battery: 'N/A',
      storage: 'N/A'
    },
    colors: [
      {
        id: 'white-black',
        name: 'White/Black',
        hex: '#ffffff',
        variants: [
          { 
            id: 'size-8', 
            name: 'Size 8', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Classic white and black colorway'
          },
          { 
            id: 'size-9', 
            name: 'Size 9', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Classic white and black colorway'
          },
          { 
            id: 'size-10', 
            name: 'Size 10', 
            price: 0, 
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Classic white and black colorway'
          }
        ]
      },
      {
        id: 'black-white',
        name: 'Black/White',
        hex: '#000000',
        variants: [
          { 
            id: 'size-8', 
            name: 'Size 8', 
            price: 0, 
            image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-max-270-mens-shoes-KkLcGR.png',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Sleek black and white design'
          },
          { 
            id: 'size-9', 
            name: 'Size 9', 
            price: 0, 
            image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-max-270-mens-shoes-KkLcGR.png',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Sleek black and white design'
          },
          { 
            id: 'size-10', 
            name: 'Size 10', 
            price: 0, 
            image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-max-270-mens-shoes-KkLcGR.png',
            specs: ['Air Max 270 unit', 'Mesh upper', 'Rubber outsole'],
            description: 'Sleek black and white design'
          }
        ]
      }
    ],
    addons: [
      { 
        id: 'nike-care', 
        name: 'Nike Care Protection', 
        price: 25, 
        description: 'Extended warranty and care services',
        category: 'protection',
        icon: '🛡️',
        popular: true
      },
      { 
        id: 'custom-insoles', 
        name: 'Custom Insoles', 
        price: 35, 
        description: 'Personalized comfort insoles',
        category: 'accessories',
        icon: '👟'
      },
      { 
        id: 'shoe-care-kit', 
        name: 'Shoe Care Kit', 
        price: 20, 
        description: 'Keep your shoes looking fresh',
        category: 'accessories',
        icon: '🧽'
      }
    ]
  }
];