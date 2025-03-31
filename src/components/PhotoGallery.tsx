
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';

const PhotoGallery = () => {
  const isMobile = useIsMobile();
  const [showNote, setShowNote] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  const photos = [
    {
      src: "/lovable-uploads/308daa76-2a5b-40d2-8d94-b47a553a5d66.png",
      caption: "Tüm hikayenin başlangıcı...",
      loveNote: "Seni tanıdığım ilk an hayatımın en güzel anıydı. O anda kalbimde bir şeyler değişti ve sana her gün biraz daha aşık oldum."
    },
    {
      src: "/lovable-uploads/c57676b4-8cd6-4c87-9b18-5213cbe2cc9b.png",
      caption: "Seni öpmeden, dokunmadan aşık oldum",
      loveNote: "Sana olan sevgim her geçen gün büyüyor. Sesin, gülüşün, varlığın... Her şeyinle mükemmelsin ve benim dünyadaki en büyük şansımsın."
    },
    {
      src: "/lovable-uploads/7d0987f3-26b7-4cc1-8410-eb5931612915.png",
      caption: "Seninle tanışmak başıma gelen en güzel şey",
      loveNote: "Kalbimi sana verdim ve bundan hiç pişman değilim. Seninle geçirdiğim her an, hayatımın en değerli zamanları. İyi ki varsın sevgilim."
    },
    {
      src: "/lovable-uploads/6784f03a-e8b8-44b2-92e1-ba3328f06e03.png",
      caption: "Seninle konuştuğumuz ilk gün seni bu kadar seveceğimi bilmiyordum",
      loveNote: "Senin için her şeyi yaparım, tüm hayatım boyunca seni sevmeye devam edeceğim. Sen benim kalbimin tek sahibisin."
    },
    {
      src: "/lovable-uploads/b9397c4e-6282-4975-ab9c-a71acd433d96.png",
      caption: "Şimdi o güne şükrediyorum",
      loveNote: "Seninle geçirdiğim her an, kalbimde bir hazine gibi. Gülüşün, beni hayata bağlayan en güçlü bağ. Seni sonsuza dek seveceğim."
    },
    {
      src: "/lovable-uploads/14bec2d4-dfd1-4136-ba82-e88ffb1bda55.png",
      caption: "Seni Çok Seviyorum Aşkımmmm",
      loveNote: "Sen benim hayalimdeki aşksın, kalbimin ilacı, ruhuma huzur veren tek insansın. Her gün seninle uyanmak, en büyük hayalim. Seni çok seviyorum aşkım."
    },
  ];

  const handlePhotoClick = (note: string, index: number) => {
    setCurrentNote(note);
    setCurrentIndex(index);
    setShowNote(true);
  };

  // Handle closing note when clicking anywhere
  const handleClickOutside = () => {
    if (showNote) {
      setShowNote(false);
      setCurrentIndex(null);
    }
  };

  return (
    <div className="my-12" onClick={handleClickOutside}>
      <div className="grid grid-cols-1 gap-32 md:gap-24">
        {photos.map((photo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-center min-h-screen md:min-h-0 items-center relative"
          >
            <div 
              className={`polaroid-frame ${isMobile ? 'w-full max-w-[90vw]' : 'max-w-md'} transform rotate-1 hover:rotate-0 transition-all duration-300 cursor-pointer relative`}
              onClick={(e) => {
                e.stopPropagation();
                handlePhotoClick(photo.loveNote, index);
              }}
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

                {/* Overlay and note directly on photo - now using regular font */}
                <AnimatePresence>
                  {showNote && currentIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                      <div className="bg-white p-6 rounded-md shadow-xl max-w-[90%] z-10 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNote(false);
                          }}
                          className="absolute right-2 top-2 p-1 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
                        >
                          <X className="h-4 w-4 text-pink-500" />
                        </button>
                        <p className="text-center text-gray-800 font-medium pt-2">
                          {currentNote}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
