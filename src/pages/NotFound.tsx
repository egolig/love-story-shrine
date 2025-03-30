
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-love-200 to-secondary">
      <div className="text-center p-8">
        <h1 className="text-6xl font-script text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! Bu sayfa bulunamadı</p>
        <Button onClick={() => navigate('/')}>
          Giriş Sayfasına Dön
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
