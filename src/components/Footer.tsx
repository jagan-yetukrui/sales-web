import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="glass-card border-t border-white/20 mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PC</span>
              </div>
              <span className="text-lg font-bold gradient-text">
                Product Customizer 2.0
              </span>
            </div>
            <p className="text-neutral-600 mb-6 max-w-md">
              Experience next-generation product customization with cutting-edge design and seamless interactions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: '𝕏' },
                { name: 'LinkedIn', icon: 'in' },
                { name: 'GitHub', icon: '⚡' },
                { name: 'Dribbble', icon: 'D' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-neutral-600 hover:text-primary-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <span className="text-sm font-semibold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Customize', href: '/customize' },
                { name: 'Checkout', href: '/checkout' },
                { name: 'Support', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Documentation', href: '#' },
                { name: 'API Reference', href: '#' },
                { name: 'Design System', href: '#' },
                { name: 'Changelog', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 text-sm">
            © {currentYear} Product Customizer 2.0. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-sm"
              whileHover={{ y: -1 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-sm"
              whileHover={{ y: -1 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-sm"
              whileHover={{ y: -1 }}
            >
              Cookie Policy
            </motion.a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-40 animate-pulse-slow" />
      <div className="absolute top-4 left-4 w-1 h-1 bg-accent-500 rounded-full opacity-60 animate-bounce-slow" />
    </motion.footer>
  );
};

export default Footer;
