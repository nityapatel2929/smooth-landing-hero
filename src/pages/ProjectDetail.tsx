import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react';

const projectsData = {
  'modern-villa': {
    title: 'Modern Apartment Interior',
    location: 'Ahemdabad',
    date: 'July 2024',
    category: 'Residential',
    description: 'A contemporary apartment featuring custom plywood furniture, premium hardware fittings, and modern design elements. This project showcases our expertise in creating luxurious living spaces.',
    challenge: 'The main challenge was maximizing space utilization while maintaining a luxurious feel. We needed to integrate multiple functions within compact areas while ensuring a seamless design flow.',
    solution: 'We implemented a sophisticated design approach using premium materials and smart space planning. The project features custom-built furniture, innovative lighting solutions, and high-end finishes.',
    images: [
      {
        url: 'https://i.ibb.co/vCgrQxcW/house1.jpg',
        caption: 'Master Bedroom with Custom Headboard'
      },
      {
        url: 'https://i.ibb.co/4wgpwdDd/house2.jpg',
        caption: 'Bedroom Beautiful design'
      },
      {
        url: 'https://i.ibb.co/HLGncZ90/house5.jpg',
        caption: 'Modern Kitchen Design'
      },
      {
        url: 'https://i.ibb.co/LhbvBwS0/house4.jpg',
        caption: 'Custom Wardrobe Solutions'
      },
      {
        url: 'https://i.ibb.co/Css0g1f8/house3.jpg',
        caption: 'Elegant Dining Area'
      },
      {
        url: 'https://i.ibb.co/RG1Gm52c/house6.jpg',
        caption: 'Bedroom'
      },
      
    
    ],
    features: [
      'Custom plywood furniture with premium finishes',
      'LED strip lighting and recessed spotlights',
      'Marble-pattern feature walls',
      'Built-in storage solutions',
      'Premium curtains with pelmets',
      'Modern dining area with custom cabinetry',
      'High-gloss tile flooring',
      'Designer wall textures and patterns'
    ]
  },
  'Bunglow': {
    title: 'Bunglow Makeover',
    location: 'Ahemdabad',
    date: 'August 2024',
    category: 'Residential',
    description: 'We completely redid this bungalow, adding modern furniture for work, comfortable spots for everyone to be together, and smart storage ideas. This shows how we can make homes that work great and look stylish too.',
    challenge: 'The main thing was figuring out how to have open areas for everyone to hang out and also private spots for quiet time, all while making the whole bungalow look good together.',
    solution: 'We came up with a layout that can change easily, with furniture that can be moved around. We also used things to help with sound, so there are both open spaces and quiet corners that work well.',
    images: [
      {
        url: 'https://i.ibb.co/yBgzmtNY/house10.jpg',
        caption: 'Elegant Bedroom'
      },
      {
        url: 'https://i.ibb.co/hF23xHBS/house11.jpg',
        caption: 'Customized Wardrobe'
      },
      {
        url: 'https://i.ibb.co/W8bb9Mm/house12.jpg',
        caption: 'Customized Bedroom with wardrobe'
      },
      {
        url: 'https://i.ibb.co/tphpKgTq/house13.jpg',
        caption: 'Customized Design bedroom'
      },
      {
        url: 'https://i.ibb.co/rKCMX6gn/house14.jpg',
        caption: 'Prayer room (temple)'
      },
      {
        url: 'https://i.ibb.co/RpqTpsL7/house22.jpg',
        caption: 'Modular kitchen'
      },
      {
        url: 'https://i.ibb.co/WW2MJbFt/house20.jpg',
        caption: 'Attractive Drawing room'
      },
      {
        url: 'https://i.ibb.co/gLS0frMD/house19.jpg',
        caption: 'Elegant Drawing room.'
      }
    ],
    features: [
      'Custom workstations with cable management',
      'Acoustic panels and partitions',
      'Modern conference rooms',
      'Collaborative areas',
      'Premium storage solutions',
      'LED lighting systems',
      'Ergonomic furniture',
      'Smart space utilization'
    ]
  },
  'luxury-apartment': {
    title: 'Luxury Apartment Renovation',
    location: 'Miami Beach',
    date: 'September 2024',
    category: 'Residential',
    description: 'A high-end apartment renovation showcasing premium materials, custom cabinetry, and sophisticated design elements. This project represents the pinnacle of luxury living.',
    challenge: 'Integrating modern amenities while preserving the classic architectural elements of the space.',
    solution: 'We carefully blended contemporary design with traditional elements, using high-end materials and custom-made furniture pieces.',
    images: [
      {
        url: 'https://i.ibb.co/svMdBgKN/house17.jpg',
        caption: 'Grand Living Room'
      },
      {
        url: 'https://i.ibb.co/zhqjdC8L/house15.jpg',
        caption: 'Master Suite'
      },
      {
        url: 'https://i.ibb.co/bjZNTQ2b/house16.jpg',
        caption: 'Master bedroom'
      },
      {
        url: 'https://i.ibb.co/hJnRRv8G/house18.jpg',
        caption: 'Drawing Room'
      },
      {
        url: 'https://i.ibb.co/3Y7090w6/house25.jpg',
        caption: 'Bedroom'
      },
      {
        url: 'https://i.ibb.co/Myp0H73W/house26.jpg',
        caption: 'Entry Door'
      }
    ],
    features: [
      'Custom millwork throughout',
      'Smart home integration',
      'Premium stone surfaces',
      'Designer lighting fixtures',
      'Custom walk-in closets',
      'Home automation systems',
      'High-end appliances',
      'Luxury finishes'
    ]
  },
  'Morden Design Villa': {
    title: 'Latest attractive design villa',
    location: 'Ahemdabad',
    date: 'October 2024',
    category: 'Residential',
    description: 'An elegant villa interior featuring custom woodwork, ambient Bedroom and Bathroom, and sophisticated dining space. This project showcases our expertise in hospitality design.',
    challenge: 'The main difficulty was designing the bedrooms, bathrooms, and dining area with unique styles while ensuring they all felt like part of one beautiful, luxurious villa.',
    solution: 'We focused on using custom woodwork and lighting to create the right mood in each space. By carefully choosing similar elegant touches throughout, we made sure each room felt special but still flowed together perfectly.',
    images: [
      {
        url: 'https://i.ibb.co/hqzdqcp/house27.jpg',
        caption: 'Grand Bedroom'
      },
      {
        url: 'https://i.ibb.co/WvfCGxGT/house28.jpg',
        caption: 'Elegant Bedroom'
      },
      {
        url: 'https://i.ibb.co/BVJ8SrY3/house29.jpg',
        caption: 'Theme Based bedroom design for kids'
      },
      {
        url: 'https://i.ibb.co/VYxTWPwM/house30.jpg',
        caption: 'Avengers theme based bedroom'
      },
      {
        url: 'https://i.ibb.co/NzG6qyy/house31.jpg',
        caption: 'Elegant design house entrance'
      },
      {
        url: 'https://i.ibb.co/3YSGNYG8/house32.jpg',
        caption: 'Attractive bedroom design'
      }
    ],
    features: [
      'Custom wood paneling',
      'Ambient lighting design',
      'Premium seating solutions',
      'Wine display units',
      'Custom bar design',
      'Acoustic treatment',
      'Designer furniture',
      'Premium finishes'
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="pt-24 px-4 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <Link to="/projects" className="text-primary hover:text-primary-dark mt-4 inline-block">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={project.images[0].url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center text-white hover:text-primary-200 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Projects
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {project.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {project.date}
                </div>
                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  {project.category}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-xl text-gray-600 mb-8">{project.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-gray-600 mb-8">{project.challenge}</p>
            
            <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
            <p className="text-gray-600 mb-12">{project.solution}</p>
          </motion.div>

          {/* Project Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;