
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '010125Ei.') {
      navigate('/home');
    } else {
      toast({
        title: "Hatalı Şifre",
        description: "Lütfen doğru şifreyi girin.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-[100px] opacity-20 rounded-full -z-10"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2 animate-fade-in">Aşkımızın Sitesi</h1>
          <p className="text-gray-300">İrem Atalar'ın Özel Sitesi</p>
        </div>
        
        <Card className="bg-gray-900/80 border border-gray-800 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-pink-500 text-center">Giriş</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Özel anılarımızı görmek için şifre gerekli
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
                  Giriş Yap
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              {showHint ? (
                <p className="text-sm text-gray-400">İpucu: bizim şifremiz sevgilim</p>
              ) : (
                <Button 
                  variant="link" 
                  onClick={() => setShowHint(true)}
                  className="mx-auto text-sm text-pink-400 hover:text-pink-300"
                >
                  İpucu göster
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
