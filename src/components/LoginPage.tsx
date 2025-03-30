
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-love-200 to-secondary">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-script text-primary mb-2 animate-fade-in">Özel Anımız</h1>
          <p className="text-muted-foreground">3. ay özel kutlamamıza hoş geldin</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Giriş</CardTitle>
            <CardDescription>
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
                  />
                </div>
                <Button type="submit" className="w-full">
                  Giriş Yap
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              {showHint ? (
                <p className="text-sm text-muted-foreground">İpucu: bizim şifremiz sevgilim</p>
              ) : (
                <Button 
                  variant="link" 
                  onClick={() => setShowHint(true)}
                  className="mx-auto text-sm"
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
