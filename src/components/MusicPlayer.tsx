
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

// Import the audio file as fallback only
import songFile from '../assets/Ate - Diğer Yarım (Official Video).mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Primary GitHub audio source
  const primarySource = 'https://raw.githubusercontent.com/passerbyzju/ate-diger-yarim/main/ate-diger-yarim.mp3';
  
  // List of fallback audio sources to try if primary fails
  const fallbackSources = [
    'https://github.com/passerbyzju/ate-diger-yarim/raw/main/ate-diger-yarim.mp3',
    '/lovable-uploads/ate-diger-yarim.mp3',
    '/ate-diger-yarim.mp3',
    songFile
  ];
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleAudioError);
    
    // Try to load audio from the primary source first
    loadAudioSource(primarySource);
    
    return () => {
      // Clean up event listeners
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleAudioError);
        
        // Stop and unload audio
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Function to set the audio source and load it
  const loadAudioSource = (source: string) => {
    if (!audioRef.current) return;
    
    try {
      console.log(`Loading audio source: ${source}`);
      audioRef.current.src = source;
      setAudioSource(source);
      audioRef.current.load();
      audioRef.current.crossOrigin = "anonymous"; // Add CORS support
      setAudioError(null);
    } catch (error) {
      console.error("Error loading audio source:", error);
      handleSourceFailure(source);
    }
  };
  
  // Function to handle failures and try fallback sources
  const handleSourceFailure = (failedSource: string) => {
    console.log(`Source failed: ${failedSource}`);
    
    // If primary source failed, try fallbacks
    if (failedSource === primarySource) {
      console.log("Primary source failed, trying fallbacks");
      tryFallbackSources(0);
    } else {
      // Find the index of the failed fallback source
      const failedIndex = fallbackSources.indexOf(failedSource);
      if (failedIndex !== -1 && failedIndex < fallbackSources.length - 1) {
        tryFallbackSources(failedIndex + 1);
      } else {
        setAudioError("Failed to load audio from any source");
        toast({
          title: "Audio Error",
          description: "Unable to load the audio file. Please try again later.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Function to try fallback sources one by one
  const tryFallbackSources = (index: number) => {
    if (index >= fallbackSources.length) {
      console.error("All audio sources failed to load");
      setAudioError("Failed to load audio from any source");
      toast({
        title: "Audio Error",
        description: "Unable to load the audio file. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    const source = fallbackSources[index];
    console.log(`Trying fallback source ${index + 1}/${fallbackSources.length}:`, source);
    loadAudioSource(source);
  };
  
  const handleAudioError = (e: Event) => {
    const audio = e.target as HTMLAudioElement;
    console.error("Audio error:", audio.error);
    
    // If current source failed, try fallbacks
    handleSourceFailure(audioSource || '');
  };
  
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
  };
  
  const handleCanPlayThrough = () => {
    console.log("Audio can play through");
    setIsLoaded(true);
    setAudioError(null);
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
        setAudioError(`Playback error: ${error.message}`);
        handleSourceFailure(audioSource || '');
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
        setAudioError(`Playback error: ${error.message}`);
      });
      setIsPlaying(true);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !value.length) return;
    
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    
    if (isMuted && newVolume > 0) {
      audio.muted = false;
      setIsMuted(false);
    }
  };
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="p-6 flex flex-col items-center">
        <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
          <img 
            src="/lovable-uploads/cbb7681a-ed22-49c1-aa4c-19cea252676f.png" 
            alt="ATE - Diğer Yarım" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full">
          <h3 className="font-medium font-sans text-center text-xl mb-4">ATE - Diğer Yarım</h3>
          
          {audioError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{audioError}</AlertDescription>
            </Alert>
          )}
          
          <div className="mb-4 w-full">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex justify-center items-center gap-3 mt-2">
            <Button 
              onClick={restart}
              variant="outline" 
              size="icon"
              className="rounded-full h-10 w-10 flex items-center justify-center border-love-300 hover:bg-love-100"
              disabled={!isLoaded}
            >
              <SkipBack className="h-5 w-5 text-love-600" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="icon"
              className="rounded-full h-14 w-14 flex items-center justify-center border-love-300 hover:bg-love-100"
              disabled={!isLoaded}
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
              disabled={!isLoaded}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-love-600" />
              ) : (
                <Volume2 className="h-5 w-5 text-love-600" />
              )}
            </Button>
          </div>
          
          <div className="mt-4 px-4">
            <Slider
              defaultValue={[1]}
              max={1}
              step={0.01}
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              disabled={!isLoaded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
