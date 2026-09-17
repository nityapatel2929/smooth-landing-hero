
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSiteSettings, fallbackSettings, whatsappUrl } from '@/lib/cms';

const WhatsAppButton = () => {
  const [number, setNumber] = useState(fallbackSettings.whatsapp_number);
  useEffect(() => { void getSiteSettings().then((settings) => setNumber(settings.whatsapp_number)); }, []);
  return (
    <motion.a
      href={whatsappUrl(number)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
};

export default WhatsAppButton;