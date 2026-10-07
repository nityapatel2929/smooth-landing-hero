
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fallbackSettings, getSiteSettings, type SiteSettings } from '@/lib/cms';

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  useEffect(() => { void getSiteSettings().then(setSettings); }, []);
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{settings.business_name}</h3>
            <p className="text-gray-400">
              Premium plywood, hardware, and turnkey construction solutions for your dream spaces.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries((settings.social_links ?? {}) as Record<string, unknown>).filter(([, url]) => typeof url === 'string' && url).map(([name, url]) => (
                <a key={name} href={url as string} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white capitalize text-sm border border-gray-700 rounded-full px-3 py-1">{name}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/plywood-hardware-ahmedabad" className="text-gray-400 hover:text-white">Plywood &amp; Hardware</Link></li>
              <li><Link to="/residential-interior-construction" className="text-gray-400 hover:text-white">Residential Interiors</Link></li>
              <li><Link to="/commercial-interior-construction" className="text-gray-400 hover:text-white">Commercial Interiors</Link></li>
              <li><Link to="/interior-construction-ahmedabad" className="text-gray-400 hover:text-white">Interior Construction</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-400">{settings.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-400">{settings.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-400">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {settings.business_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;