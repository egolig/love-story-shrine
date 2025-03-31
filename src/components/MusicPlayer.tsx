
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
  
  // YouTube kullanımına geçiyoruz - daha güvenilir çalışacak
  const youtubeVideoId = "vRf03KHgL_s"; // ATE - Diğer Yarım YouTube videosu
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  // YouTube API için gerekli değişkenler
  const [ytPlayer, setYtPlayer] = useState<any>(null);
  const [ytPlayerReady, setYtPlayerReady] = useState(false);
  
  useEffect(() => {
    // YouTube API'sini yükleme
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    // Global YouTube API fonksiyonunu tanımlama
    (window as any).onYouTubeIframeAPIReady = () => {
      console.log("YouTube API hazır");
      initializeYouTubePlayer();
    };
    
    return () => {
      // API hazır olduğunda tetiklenecek fonksiyonu temizle
      (window as any).onYouTubeIframeAPIReady = null;
      
      // Player'ı temizle
      if (ytPlayer && ytPlayerReady) {
        try {
          ytPlayer.destroy();
        } catch (error) {
          console.error("YouTube player temizlenirken hata:", error);
        }
      }
    };
  }, []);
  
  const initializeYouTubePlayer = () => {
    if (!(window as any).YT) {
      console.log("YouTube API henüz yüklenmedi, 2 saniye sonra tekrar denenecek");
      setTimeout(initializeYouTubePlayer, 2000);
      return;
    }
    
    try {
      console.log("YouTube player oluşturuluyor");
      const player = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: youtubeVideoId,
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'rel': 0,
          'showinfo': 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
      
      setYtPlayer(player);
    } catch (error) {
      console.error("YouTube player oluşturulurken hata:", error);
      setLoadError(true);
      toast({
        title: "Oynatma hatası",
        description: "YouTube video yüklenirken bir sorun oluştu.",
        variant: "destructive"
      });
    }
  };
  
  const onPlayerReady = (event: any) => {
    console.log("YouTube player hazır");
    setYtPlayerReady(true);
    setIsLoaded(true);
    setLoadError(false);
    
    // Video süresini al
    try {
      const duration = event.target.getDuration();
      console.log("Video süresi:", duration);
      setDuration(duration);
      
      toast({
        title: "Müzik yüklendi",
        description: "Şarkı başarıyla yüklendi, çalmaya hazır.",
      });
      
      // İlerleme çubuğunu güncellemek için zamanlayıcı başlat
      const interval = setInterval(() => {
        if (ytPlayer && ytPlayerReady) {
          try {
            const currentTime = ytPlayer.getCurrentTime();
            setCurrentTime(currentTime);
          } catch (e) {
            console.error("Oynatma zamanı alınırken hata:", e);
          }
        }
      }, 1000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Video süresi alınırken hata:", error);
    }
  };
  
  const onPlayerStateChange = (event: any) => {
    console.log("Player durumu değişti:", event.data);
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
    
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      setIsPlaying(true);
    }
    
    // YT.PlayerState.PAUSED = 2
    if (event.data === 2) {
      setIsPlaying(false);
    }
  };
  
  const onPlayerError = (event: any) => {
    console.error("YouTube player hatası:", event.data);
    setLoadError(true);
    setIsLoaded(false);
    toast({
      title: "Oynatma hatası",
      description: "Video oynatılırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
      variant: "destructive"
    });
  };
  
  const togglePlay = () => {
    if (!ytPlayer || !ytPlayerReady) {
      console.error("YouTube player henüz hazır değil");
      return;
    }
    
    try {
      if (isPlaying) {
        ytPlayer.pauseVideo();
        setIsPlaying(false);
        console.log("Video duraklatıldı");
      } else {
        ytPlayer.playVideo();
        setIsPlaying(true);
        console.log("Video oynatılmaya başlandı");
      }
    } catch (error) {
      console.error("Video oynatma/duraklatma hatası:", error);
      toast({
        title: "Oynatma hatası",
        description: "Şarkı çalınamadı. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive"
      });
    }
  };
  
  const toggleMute = () => {
    if (!ytPlayer || !ytPlayerReady) return;
    
    try {
      if (isMuted) {
        ytPlayer.unMute();
        setIsMuted(false);
        console.log("Ses açıldı");
      } else {
        ytPlayer.mute();
        setIsMuted(true);
        console.log("Ses kapatıldı");
      }
    } catch (error) {
      console.error("Ses açma/kapatma hatası:", error);
    }
  };
  
  const restart = () => {
    if (!ytPlayer || !ytPlayerReady) return;
    
    try {
      ytPlayer.seekTo(0);
      console.log("Video başa alındı");
      if (!isPlaying) {
        ytPlayer.playVideo();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Videoyu başa alma hatası:", error);
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
    if (!ytPlayer || !ytPlayerReady) return;
    
    const newTime = parseFloat(e.target.value);
    try {
      ytPlayer.seekTo(newTime);
      setCurrentTime(newTime);
      console.log("İlerleme zamanı değiştirildi:", newTime);
    } catch (error) {
      console.error("İlerleme zamanı değiştirme hatası:", error);
    }
  };
  
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
          <p className="text-sm text-gray-500 font-sans text-center mb-4">Youtube</p>
          
          {loadError && (
            <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
              <AlertCircle size={16} />
              <span className="text-sm">Şarkı yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</span>
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
          
          {/* Gizli YouTube iframe - stil ile gizlenmiş */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div id="youtube-player"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
