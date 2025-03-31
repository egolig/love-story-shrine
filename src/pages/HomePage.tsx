
import { useState, useEffect } from 'react';
import LoveCounter from '@/components/LoveCounter';
import LocationMap from '@/components/LocationMap';
import PhotoGallery from '@/components/PhotoGallery';
import LoveGame from '@/components/LoveGame';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} min-h-screen`}>
      <header className="bg-white shadow-md py-6 rounded-b-3xl">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-pink-500">
            Seni Çok Seviyorum
            <br />
            <span className="text-primary">İrem Atalar❤️</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl text-center mb-4 text-pink-600 font-bold">Sevgilim,</h2>
          <p className="text-center mb-6 text-lg">
            Bu üç aylık yolculuğumuzda seninle geçirdiğim her anın kıymetini biliyorum. 
            Hayatıma girdiğin günden beri her şey daha güzel, daha anlamlı. 
            Bu özel günde sana olan sevgimi bu küçük sürprizle göstermek istedim.
            Seni çok seviyorum.
          </p>
        </div>

        <LoveCounter />
        <LocationMap />
        <PhotoGallery />
        <LoveGame />
      </main>
    </div>
  );
};

export default HomePage;
