
import React, { useEffect, useRef } from 'react';

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

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
    <div className="my-8">
      <h3 className="text-center text-xl font-script text-love-500 mb-4">
        Seninle İlk Tanıştığımız Yer:
      </h3>
      <div className="rounded-xl overflow-hidden shadow-lg" ref={mapRef}></div>
    </div>
  );
};

export default LocationMap;
