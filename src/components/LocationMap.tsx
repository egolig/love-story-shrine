
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Google Maps embed kodunu oluştur
    if (mapRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.0703739262767!2d35.56574347606376!3d38.45542507225668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152a6678329bc051%3A0x5c93da879e249064!2sMimarsinan%2C%20Bozant%C4%B1%20Cd.%20No%3A184%2C%2038020%20Kocasinan%2FKayseri!5e0!3m2!1str!2str!4v1714916870872!5m2!1str!2str";
      iframe.width = "100%";
      iframe.height = "300";
      iframe.style.border = "0";
      iframe.allowFullscreen = false;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      
      mapRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <motion.div 
      className="my-8" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center min-h-screen md:min-h-0 items-center">
        <div className={`polaroid-frame ${isMobile ? 'w-full max-w-[90vw]' : 'max-w-md'} transform rotate-1 hover:rotate-0 transition-all duration-300`}>
          <div className="bg-white p-4 pt-5 shadow-xl rounded-sm">
            <div 
              ref={mapRef} 
              className="w-full h-auto" 
              style={{ minHeight: isMobile ? '50vh' : '350px' }}
            ></div>
            <div className="pt-5 pb-4 px-3">
              <p className="text-center text-gray-800 text-lg">Seni İlk Gördüğüm Yer</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationMap;
