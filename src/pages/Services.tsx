import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Hammer, Package, Home, Ruler, PenTool, HardHat } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Package className="w-12 h-12" />,
      title: "Premium Plywood & Laminates in Ahmedabad",
      description: "Extensive collection of premium quality plywood and laminates in Ahmedabad. Best prices and genuine products for all interior requirements.",
      link: "https://wa.me/+919377640080"
    },
    {
      icon: <Hammer className="w-12 h-12" />,
      title: "Hardware Solutions in Ahmedabad",
      description: "Complete range of premium hardware, tools, and fittings from top brands. Visit our hardware store in Ahmedabad for quality products.",
      link: "https://wa.me/+919377640080"
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Modular Interior Solutions",
      description: "Custom modular furniture and interior solutions in Ahmedabad. Expert designers for your home and office interiors.",
      link: "https://wa.me/+919377640080"
    },
    {
      icon: <PenTool className="w-12 h-12" />,
      title: "Interior Design Services",
      description: "Professional interior design services in Ahmedabad. Complete execution from concept to creation with premium finishing.",
      link: "https://wa.me/+919377640080"
    },
    {
      icon: <Ruler className="w-12 h-12" />,
      title: "Architectural Planning",
      description: "Expert architectural design and planning services in Ahmedabad. Comprehensive interior solutions for residential and commercial spaces.",
      link: "https://wa.me/+919377640080"
    },
    {
      icon: <HardHat className="w-12 h-12" />,
      title: "Project Management",
      description: "Professional interior project management and supervision in Ahmedabad. Ensuring quality and timely completion.",
      link: "https://wa.me/+919377640080"
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Carpentry Workshop"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive solutions for all your plywood, hardware, and construction needs
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div ref={ref} className="py-20 px-4 relative">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Woodworking Workshop"
          />
          <div className="absolute inset-0 bg-white/85"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-primary mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  Get Quote
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Workshop"
          />
          <div className="absolute inset-0 bg-primary/90"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Your Project?
          </h2>
          <a
            href="https://wa.me/+919377640080"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;