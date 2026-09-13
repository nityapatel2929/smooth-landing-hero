import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader = ({ src, alt, className = '' }: ImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const styles = useSpring({
    opacity: isLoaded ? 1 : 0,
    config: { duration: 300 }
  });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <animated.img
      src={src}
      alt={alt}
      style={styles}
      className={`${className} ${!isLoaded ? 'blur-sm' : ''}`}
      loading="lazy"
      decoding="async"
      fetchpriority="high"
    />
  );
};

export default ImageLoader;