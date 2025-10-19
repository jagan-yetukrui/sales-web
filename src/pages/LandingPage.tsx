import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const LandingPage: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Hero Heading */}
          <motion.h1
            className="text-6xl lg:text-8xl font-bold text-neutral-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Design.
            <br />
            <span className="gradient-text">Customize.</span>
            <br />
            Experience.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-xl lg:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Create your perfect device — your way.
            <br />
            Experience next-generation customization with cutting-edge design and seamless interactions.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link to="/customize">
              <motion.button
                className="btn-primary text-lg px-12 py-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Customizing
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating Product Previews */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="glass-card p-6 rounded-2xl text-center card-hover"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {product.brand.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full">
                    {product.brand}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Preview Cards */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience the future of product customization with cutting-edge technology and premium design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Materials",
                description: "Titanium, aluminum, and glass crafted to perfection",
                icon: "✨",
                color: "from-primary-500 to-primary-600"
              },
              {
                title: "Endless Options",
                description: "Colors, storage, and accessories tailored to you",
                icon: "🎨",
                color: "from-accent-500 to-accent-600"
              },
              {
                title: "Live Preview",
                description: "See your choices come to life in real-time",
                icon: "👁️",
                color: "from-primary-500 to-accent-500"
              },
              {
                title: "AR Experience",
                description: "Preview your product in augmented reality",
                icon: "🥽",
                color: "from-accent-500 to-primary-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-6 rounded-2xl text-center card-hover"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Carousel */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            className="text-xl font-semibold text-neutral-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Trusted by leading brands
          </motion.h3>
          
          <motion.div
            className="flex items-center justify-center gap-12 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {['Apple', 'Tesla', 'Nike', 'Samsung', 'Google'].map((brand, index) => (
              <motion.div
                key={brand}
                className="text-2xl font-bold text-neutral-400"
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {brand}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-primary-500 rounded-full opacity-40"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-3 h-3 bg-accent-500 rounded-full opacity-30"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default LandingPage;