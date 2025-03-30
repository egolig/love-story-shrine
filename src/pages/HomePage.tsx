
import { useState, useEffect } from 'react';
import LoveCounter from '@/components/LoveCounter';
import MusicPlayer from '@/components/MusicPlayer';
import LocationMap from '@/components/LocationMap';
import PhotoGallery from '@/components/PhotoGallery';
import LoveGame from '@/components/LoveGame';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl text-center font-script text-love-500">
            Seni Çok Seviyorum
            <br />
            <span className="text-primary">İrem Atalar❤️</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-script text-center mb-4 text-love-600">Sevgilim,</h2>
          <p className="text-center mb-6">
            Bu üç aylık yolculuğumuzda seninle geçirdiğim her anın kıymetini biliyorum. 
            Hayatıma girdiğin günden beri her şey daha güzel, daha anlamlı. 
            Bu özel günde sana olan sevgimi bu küçük sürprizle göstermek istedim.
            Seni çok seviyorum.
          </p>
        </div>

        <LoveCounter />
        <MusicPlayer />
        <LocationMap />
        <PhotoGallery />
        <LoveGame />
        
        <div className="my-8 text-center">
          <img 
            src="/lovable-uploads/c57676b4-8cd6-4c87-9b18-5213cbe2cc9b.png" 
            alt="Birlikte" 
            className="mx-auto max-w-full rounded-lg shadow-lg"
          />
          <p className="mt-4 text-xl font-script text-love-600">Sonsuz Aşkla...</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
