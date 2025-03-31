
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1A1A1A] bg-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-pink-500 mb-2 animate-fade-in">Aşkımızın Sitesi</h1>
          <p className="text-pink-300">3. ay özel kutlamamıza hoş geldin</p>
        </div>
        
        <Card className="bg-[#222222] border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-pink-500">Giriş</CardTitle>
            <CardDescription className="text-pink-300/70">
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
                    className="bg-[#333333] border-gray-700 text-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                  Giriş Yap
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              {showHint ? (
                <p className="text-sm text-pink-300/70">İpucu: bizim şifremiz sevgilim</p>
              ) : (
                <Button 
                  variant="link" 
                  onClick={() => setShowHint(true)}
                  className="mx-auto text-sm text-pink-300"
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
