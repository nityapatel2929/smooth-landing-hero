
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Premium Woodworking"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-6"
          >
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div ref={ref} className="py-20 px-4 relative">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Woodworking Craftsmanship"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-6">
                  For over two decades, we've been at the forefront of the woodworking and construction industry, 
                  delivering exceptional quality and craftsmanship to our clients. Our journey began with a simple 
                  passion for woodworking and has evolved into a comprehensive solution provider for all construction 
                  and interior needs.
                </p>
                <p className="text-gray-700 mb-6">
                  We take pride in our ability to source the finest materials, employ skilled craftsmen, and deliver 
                  projects that exceed expectations. Our commitment to quality and customer satisfaction has earned 
                  us the trust of countless homeowners, architects, and interior designers.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Unwavering commitment to quality</li>
                  <li>Transparent communication throughout the project</li>
                  <li>Innovation in design and execution</li>
                  <li>Sustainable practices and materials</li>
                  <li>Customer satisfaction above all</li>
                </ul>
                <p className="text-gray-700">
                  Today, we continue to grow and evolve, embracing new technologies and techniques while maintaining 
                  our core values of quality, integrity, and customer focus. We look forward to bringing your vision 
                  to life with our expertise and dedication.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;