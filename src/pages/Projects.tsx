import React, { Suspense } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 'modern-villa',
    title: 'Modern Apartment Interior',
    location: 'Ahemdabad',
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary apartment featuring custom plywood furniture, premium hardware, and modern design elements.',
    category: 'Residential',
    
  },
  {
    id: 'Bunglow',
    title: 'Bunglow Makeover',
    location: 'Ahemdabad',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'A modern area in the bungalow with specially designed furniture and clever storage solutions.',
    category: 'Residential',
   
  },
  {
    id: 'luxury-apartment',
    title: 'Luxury Apartment Renovation',
    location: 'Ahemdabad',
    thumbnail: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    description: 'A complete apartment makeover featuring high-quality plywood cabinets and stylish, designer handles and fixtures.',
    category: 'Residential',
    
  },
  {
    id: 'Morden Design Villa',
    title: 'Latest attractive design villa',
    location: 'Ahemdabad',
    thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    description: 'Custom villa interior with elegant wood paneling and built-in furniture.',
    category: 'Residential',
   
  }
];

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    layout
  >
    <img
      src={project.thumbnail}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="text-white">
          <p className="text-xs sm:text-sm font-medium text-primary-200 mb-1 sm:mb-2">{project.category}</p>
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{project.title}</h3>
          <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
            {project.description}
          </p>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center text-sm sm:text-base text-white hover:text-primary-200 transition-colors"
          >
            View Project <ArrowRight className="ml-1 sm:ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <LazyMotion features={domAnimation}>
      <div className="pt-16 min-h-screen">
        {/* Hero Section */}
        <div className="relative py-12 sm:py-16 md:py-20">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
              className="w-full h-full object-cover"
              alt="Luxury Home Design"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gray-900/70" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Our Projects</h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto px-4">
                Explore our portfolio of premium woodworking and interior projects
              </p>
            </motion.div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2000&q=80"
              className="w-full h-full object-cover"
              alt="Woodworking Background"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <Suspense fallback={<div>Loading...</div>}>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    inView={inView}
                  />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default Projects;