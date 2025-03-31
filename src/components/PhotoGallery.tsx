
import { motion } from 'framer-motion';

const PhotoGallery = () => {
  const photos = [
    {
      src: "/lovable-uploads/308daa76-2a5b-40d2-8d94-b47a553a5d66.png",
      caption: "Tüm hikayenin başlangıcı..."
    },
    {
      src: "/lovable-uploads/c57676b4-8cd6-4c87-9b18-5213cbe2cc9b.png",
      caption: "Seni öpmeden, dokunmadan aşık oldum"
    },
    {
      src: "/lovable-uploads/7d0987f3-26b7-4cc1-8410-eb5931612915.png",
      caption: "Seninle tanışmak başıma gelen en güzel şey"
    },
    {
      src: "/lovable-uploads/6784f03a-e8b8-44b2-92e1-ba3328f06e03.png",
      caption: "Seninle konuştuğumuz ilk gün seni bu kadar seveceğimi bilmiyordum"
    },
    {
      src: "/lovable-uploads/b9397c4e-6282-4975-ab9c-a71acd433d96.png",
      caption: "Şimdi o güne şükrediyorum"
    },
    {
      src: "/lovable-uploads/14bec2d4-dfd1-4136-ba82-e88ffb1bda55.png",
      caption: "Seni Çok Seviyorum Aşkımmmm"
    },
  ];

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 gap-16">
        {photos.map((photo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="polaroid-frame max-w-xs transform rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="bg-white p-3 pt-4 shadow-xl rounded-sm">
                <img 
                  src={photo.src} 
                  alt={`Anımız ${index + 1}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="pt-4 pb-3 px-2">
                  <p className="text-center text-gray-800">{photo.caption}</p>
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
