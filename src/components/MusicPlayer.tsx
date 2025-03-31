
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, SkipBack } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = audioRef.current;
    
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
      };

      const setAudioTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleAudioEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (audio) audio.currentTime = 0;
      };

      // Add event listeners
      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handleAudioEnd);
      
      // Trigger loading the audio data
      audio.load();

      // Clean up event listeners
      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playback started successfully");
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="p-6 flex flex-col items-center">
        {/* Album Cover - Placed on top with medium size */}
        <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
          <img 
            src="/lovable-uploads/7d0987f3-26b7-4cc1-8410-eb5931612915.png" 
            alt="Müzik Kapağı" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full">
          <h3 className="font-medium font-sans text-center text-xl mb-1">ATE - Diğer Yarım</h3>
          <p className="text-sm text-gray-500 font-sans text-center mb-4">mp3semti.com</p>
          
          <div className="mb-4 w-full">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input 
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Control buttons below the progress bar */}
          <div className="flex justify-center items-center gap-3 mt-2">
            <Button 
              onClick={restart}
              variant="outline" 
              size="icon"
              className="rounded-full h-10 w-10 flex items-center justify-center border-love-300 hover:bg-love-100"
            >
              <SkipBack className="h-5 w-5 text-love-600" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="icon"
              className="rounded-full h-14 w-14 flex items-center justify-center border-love-300 hover:bg-love-100"
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-love-600" />
              ) : (
                <Play className="h-7 w-7 text-love-600" />
              )}
            </Button>
            
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
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} preload="auto">
        {/* Update this source with the correct MP3 file path after downloading from mp3semti.com */}
        <source src="/lovable-uploads/diger-yarim.mp3" type="audio/mp3" />
        Tarayıcınız audio etiketini desteklemiyor.
      </audio>
    </div>
  );
};

export default MusicPlayer;
