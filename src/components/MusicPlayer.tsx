
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, SkipBack, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element when component mounts
  useEffect(() => {
    const audio = new Audio('/lovable-uploads/diger-yarim.mp3');
    audioRef.current = audio;
    
    const handleLoadedData = () => {
      console.log("Audio loaded successfully, duration:", audio.duration);
      setDuration(audio.duration);
      setIsLoaded(true);
      setLoadError(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setLoadError(true);
      setIsLoaded(false);
      toast({
        title: "Oynatma hatası",
        description: "Müzik dosyası yüklenemedi. Dosya yolunu kontrol edin.",
        variant: "destructive"
      });
    };
    
    // Add event listeners
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('loadedmetadata', handleLoadedData); // Try both events
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    // Force preload
    audio.preload = "auto";
    try {
      audio.load();
      console.log("Audio loading started");
    } catch (err) {
      console.error("Error loading audio:", err);
    }
    
    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('loadedmetadata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Audio paused");
    } else {
      console.log("Attempting to play audio");
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully");
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Playback failed:", error);
            toast({
              title: "Oynatma hatası",
              description: "Tarayıcınız otomatik oynatmaya izin vermiyor olabilir.",
              variant: "destructive"
            });
            setIsPlaying(false);
          });
      }
    }
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
    console.log("Audio muted:", !isMuted);
  };
  
  const restart = () => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = 0;
    console.log("Audio restarted");
    if (!isPlaying) {
      togglePlay();
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
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    console.log("Seek to:", newTime);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="p-6 flex flex-col items-center">
        {/* Album Cover */}
        <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
          <img 
            src="/lovable-uploads/8995c772-0203-4cb0-802d-a92d1b6c4c75.png" 
            alt="Müzik Kapağı" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full">
          <h3 className="font-medium font-sans text-center text-xl mb-1">ATE - Diğer Yarım</h3>
          <p className="text-sm text-gray-500 font-sans text-center mb-4">mp3semti.com</p>
          
          {loadError && (
            <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
              <AlertCircle size={16} />
              <span className="text-sm">Şarkı yüklenirken bir sorun oluştu</span>
            </div>
          )}
          
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
              disabled={!isLoaded || loadError}
            />
          </div>
          
          {/* Control buttons */}
          <div className="flex justify-center items-center gap-3 mt-2">
            <Button 
              onClick={restart}
              variant="outline" 
              size="icon"
              className="rounded-full h-10 w-10 flex items-center justify-center border-love-300 hover:bg-love-100"
              disabled={!isLoaded || loadError}
            >
              <SkipBack className="h-5 w-5 text-love-600" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="icon"
              className="rounded-full h-14 w-14 flex items-center justify-center border-love-300 hover:bg-love-100"
              disabled={!isLoaded || loadError}
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
              disabled={!isLoaded || loadError}
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
    </div>
  );
};

export default MusicPlayer;
