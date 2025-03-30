
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const spotifyIframeRef = useRef<HTMLIFrameElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="p-4">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
            <img 
              src="/lovable-uploads/7d0987f3-26b7-4cc1-8410-eb5931612915.png" 
              alt="Müzik Kapağı" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-medium font-sans">Diğer Yarım</h3>
            <p className="text-sm text-gray-500 font-sans">ATE</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={toggleMute}
              variant="outline" 
              size="icon"
              className="rounded-full h-10 w-10 flex items-center justify-center border-love-300 hover:bg-love-100"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-love-600" />
              ) : (
                <Volume2 className="h-5 w-5 text-love-600" />
              )}
            </Button>
            
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="icon"
              className="rounded-full h-12 w-12 flex items-center justify-center border-love-300 hover:bg-love-100"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-love-600" />
              ) : (
                <Play className="h-6 w-6 text-love-600" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <iframe 
          ref={spotifyIframeRef}
          src="https://open.spotify.com/embed/track/7pOchuc40Mz0znJX50HaR5?utm_source=generator" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="rounded-md"
        ></iframe>
      </div>
      
      <audio ref={audioRef}>
        <source src="https://cdn.discordapp.com/attachments/1070343308642742352/1231360845006225499/diger-yarim_b51cc952ff1630f.mp3" type="audio/mp3" />
        Tarayıcınız audio etiketini desteklemiyor.
      </audio>
    </div>
  );
};

export default MusicPlayer;
