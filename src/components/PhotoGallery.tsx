
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const PhotoGallery = () => {
  const isMobile = useIsMobile();
  
  const photos = [
    {
      src: "/lovable-uploads/308daa76-2a5b-40d2-8d94-b47a553a5d66.png",
      caption: "Tüm hikayenin başlangıcı...",
    },
    {
      src: "/lovable-uploads/c57676b4-8cd6-4c87-9b18-5213cbe2cc9b.png",
      caption: "Seni öpmeden, dokunmadan aşık oldum",
    },
    {
      src: "/lovable-uploads/7d0987f3-26b7-4cc1-8410-eb5931612915.png",
      caption: "Seninle tanışmak başıma gelen en güzel şey",
    },
    {
      src: "/lovable-uploads/6784f03a-e8b8-44b2-92e1-ba3328f06e03.png",
      caption: "Seninle konuştuğumuz ilk gün seni bu kadar seveceğimi bilmiyordum",
    },
    {
      src: "/lovable-uploads/b9397c4e-6282-4975-ab9c-a71acd433d96.png",
      caption: "Şimdi o güne şükrediyorum",
    },
    {
      src: "/lovable-uploads/14bec2d4-dfd1-4136-ba82-e88ffb1bda55.png",
      caption: "Seni Çok Seviyorum Aşkımmmm",
    },
  ];

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 gap-32 md:gap-24">
        {photos.map((photo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-center min-h-screen md:min-h-0 items-center"
          >
            <div 
              className={`polaroid-frame ${isMobile ? 'w-full max-w-[90vw]' : 'max-w-md'} transform rotate-1 hover:rotate-0 transition-all duration-300`}
            >
              <div className="bg-white p-4 pt-5 shadow-xl rounded-sm">
                <img 
                  src={photo.src} 
                  alt={`Anımız ${index + 1}`} 
                  className="w-full h-auto object-cover"
                  style={{ minHeight: isMobile ? '50vh' : '350px' }}
                />
                <div className="pt-5 pb-4 px-3">
                  <p className="text-center text-gray-800 text-lg">{photo.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
