
import { useState, useEffect } from 'react';

const LoveCounter = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('January 1, 2025 00:00:00').getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      // Hesaplamalar (MS cinsinden)
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ years, days, hours, minutes, seconds });
    };

    // İlk güncelleştirme
    updateCounter();

    // Her saniye güncelle
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-8">
      <h3 className="text-center text-xl font-script text-love-500 mb-4">
        Şu tarihten beri birlikteyiz:
      </h3>
      
      <div className="flex justify-center gap-2 md:gap-4">
        <div className="counter-box min-w-[60px]">
          <div className="text-center">
            <div className="counter-value">{timeElapsed.years}</div>
            <div className="counter-label">Yıl</div>
          </div>
        </div>
        
        <div className="counter-box min-w-[60px]">
          <div className="text-center">
            <div className="counter-value">{timeElapsed.days}</div>
            <div className="counter-label">Gün</div>
          </div>
        </div>
        
        <div className="counter-box min-w-[60px]">
          <div className="text-center">
            <div className="counter-value">{timeElapsed.hours}</div>
            <div className="counter-label">Saat</div>
          </div>
        </div>
        
        <div className="counter-box min-w-[60px]">
          <div className="text-center">
            <div className="counter-value">{timeElapsed.minutes}</div>
            <div className="counter-label">Dakika</div>
          </div>
        </div>
        
        <div className="counter-box min-w-[60px]">
          <div className="text-center">
            <div className="counter-value">{timeElapsed.seconds}</div>
            <div className="counter-label">Saniye</div>
          </div>
        </div>
      </div>
      
      <div className="my-6">
        <div className="w-full flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="250" height="30" viewBox="0 0 250 30" fill="none">
            <path d="M1 15C1 15 50 -5 125 15C200 35 249 15 249 15" stroke="#D946EF" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoveCounter;
