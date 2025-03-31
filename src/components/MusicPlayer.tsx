
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, SkipBack, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

// Import an audio file that we know works
import sampleAudio from '../assets/sample-audio.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Set the audio source using the imported file
    audio.src = sampleAudio;
    
    // Try to load the audio
    audio.load();
    
    return () => {
      // Clean up event listeners
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        
        // Stop and unload audio
        audio.pause();
        audio.src = '';
      }
    };
  }, []);
  
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setDuration(audio.duration);
    console.log("Audio metadata loaded, duration:", audio.duration);
  };
  
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setCurrentTime(audio.currentTime);
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    
    toast({
      title: "Parça bitti",
      description: "Şarkı çalma tamamlandı.",
    });
  };
  
  const handleError = (e: Event) => {
    console.error("Audio loading error:", e);
    setLoadError(true);
    setIsLoaded(false);
    
    toast({
      title: "Oynatma hatası",
      description: "Şarkı yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
      variant: "destructive"
    });
  };
  
  const handleCanPlayThrough = () => {
    console.log("Audio can play through");
    setIsLoaded(true);
    setLoadError(false);
    
    toast({
      title: "Müzik yüklendi",
      description: "Şarkı başarıyla yüklendi, çalmaya hazır.",
    });
  };
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("Audio paused");
    } else {
      audio.play().catch(error => {
        console.error("Playback error:", error);
        toast({
          title: "Oynatma hatası",
          description: "Şarkı çalınamadı. Tarayıcınız otomatik oynatmaya izin vermiyor olabilir.",
          variant: "destructive"
        });
      });
      setIsPlaying(true);
      console.log("Audio playing");
    }
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
    console.log("Audio muted:", audio.muted);
  };
  
  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    console.log("Audio restarted");
    
    if (!isPlaying) {
      audio.play().catch(error => {
        console.error("Playback error:", error);
      });
      setIsPlaying(true);
    }
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    console.log("Seek to:", newTime);
  };
  
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !value.length) return;
    
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    
    // If previously muted, unmute when volume is adjusted
    if (isMuted && newVolume > 0) {
      audio.muted = false;
      setIsMuted(false);
    }
  };
  
  // Calculate progress percentage for the Progress component
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  // If loading fails or while loading, offer a direct audio element fallback
  if (loadError) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
        <div className="p-6 flex flex-col items-center">
          <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
            <img 
              src="/lovable-uploads/1098590261438951476.jpeg" 
              alt="Müzik Kapağı" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full">
            <h3 className="font-medium font-sans text-center text-xl mb-1">ATE - Diğer Yarım</h3>
            <p className="text-sm text-gray-500 font-sans text-center mb-4">Ses Dosyası</p>
            
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-4">
              <AlertCircle size={16} />
              <span className="text-sm">Gelişmiş oynatıcı yüklenemedi. Basit oynatıcı kullanılıyor.</span>
            </div>
            
            <audio controls className="w-full">
              <source src="/assets/sample-audio.mp3" type="audio/mpeg" />
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
              <p>Tarayıcınız audio etiketi desteklemiyor.</p>
            </audio>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="p-6 flex flex-col items-center">
        {/* Album Cover */}
        <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
          <img 
            src="/lovable-uploads/1098590261438951476.jpeg" 
            alt="Müzik Kapağı" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full">
          <h3 className="font-medium font-sans text-center text-xl mb-1">ATE - Diğer Yarım</h3>
          <p className="text-sm text-gray-500 font-sans text-center mb-4">Ses Dosyası</p>
          
          {!isLoaded && !loadError && (
            <div className="flex items-center justify-center gap-2 text-blue-500 mb-4">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              <span className="text-sm">Şarkı yükleniyor...</span>
            </div>
          )}
          
          <div className="mb-4 w-full">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <Slider
              defaultValue={[0]}
              max={duration || 100}
              step={0.1}
              value={[currentTime]}
              onValueChange={handleProgressChange}
              disabled={!isLoaded || loadError}
              className="mt-1"
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
          
          {/* Volume Slider */}
          <div className="mt-4 px-4">
            <Slider
              defaultValue={[1]}
              max={1}
              step={0.01}
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              disabled={!isLoaded || loadError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
