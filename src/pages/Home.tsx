import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PenTool as Tool, Clock, Award, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Tool className="w-12 h-12" />,
    title: "Premium Quality Interior Design",
    description: "Expert interior designers in Ahmedabad delivering premium quality materials and craftsmanship"
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "Timely Project Delivery",
    description: "On-time completion of interior projects across Ahmedabad with professional execution"
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Expert Interior Team",
    description: "Skilled interior designers and craftsmen with years of experience in Ahmedabad"
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Customer-Focused Approach",
    description: "Trusted interior design services in Ahmedabad with 100% customer satisfaction"
  }
];

const testimonials = [
  {
    name: "Sandip Patel",
    role: "Homeowner in Ahmedabad",
    content: "Best interior designers in Ahmedabad! The quality of their plywood and workmanship is outstanding. Highly recommended for turnkey interior solutions!",
    image: "https://icon-library.com/images/man-png-icon/man-png-icon-2.jpg"
  },
  {
    name: "Anjali Jain",
    role: "Home Owner in Ahmedabad",
    content: "Top interior design experts in Ahmedabad who used premium materials and made our interiors amazing without any fuss. Best turnkey interior services!",
    image: "https://th.bing.com/th/id/OIP.Dq-yh9tKQV8oKaUvEKMhXgHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  },
  {
    name: "Rahul Jani",
    role: "Home Owner in Ahmedabad",
    content: "Excellent interior construction services in Ahmedabad. Everything from plywood selection to final execution was handled professionally!",
    image: "https://icon-library.com/images/man-png-icon/man-png-icon-2.jpg"
  }
];

const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

const Testimonials = () => {
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  const startAnimation = () => {
    controls.start({
      x: [0, -(duplicatedTestimonials.length * 350)],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      },
    });
  };

  const handleHoverStart = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleHoverEnd = () => {
    setIsPaused(false);
    startAnimation();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>
      <div className="overflow-hidden w-full">
        <motion.div
          animate={controls}
          className="flex space-x-6"
          style={{ minWidth: 'max-content' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl w-[320px] shrink-0"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-100 italic">{testimonial.content}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?auto=format&fit=crop&q=80&w=2000"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/809796283/rendition/720p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e2f25a07ce2c7a41f5bfa9a1cc2d802da2c21ea3c3cfdb3c6d82c1c86c95d634"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <AnimatePresence>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative h-full flex flex-col items-center justify-center text-white px-4"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-center mb-6"
            >
              From Concept to Creation
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
            >
              Premium Plywood, Hardware & Expert interior construction Turnkey Solutions
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex space-x-4"
            >
              <a 
                href="https://wa.me/+919377640080"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                Get a Quote
              </a>
              <Link 
                to="/services"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div ref={ref} className="py-20 px-4 relative">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Woodworking Background"
          />
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every aspect of our work, from materials to execution
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 relative">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Carpentry Workshop"
          />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            What Our Clients Say
          </h2>
          <Suspense fallback={<div className="text-center text-white">Loading testimonials...</div>}>
            <Testimonials />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;