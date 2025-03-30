
import { Card } from '@/components/ui/card';

const PhotoGallery = () => {
  const photos = [
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
      caption: "Seni çok seviyorum"
    },
  ];

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-12">
        {photos.map((photo, index) => (
          <Card key={index} className="overflow-hidden bg-transparent border-0 shadow-none">
            <div className="photo-frame mx-auto max-w-md relative">
              <img 
                src={photo.src} 
                alt={`Anımız ${index + 1}`} 
                className="w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-3 text-white">
                <p className="text-center font-medium">{photo.caption}</p>
              </div>
            </div>
            <p className="mt-4 text-center text-xl text-love-500">{photo.caption}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
