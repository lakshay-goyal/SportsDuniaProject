import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundLines } from "../components/ui/background-lines";

function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="dark">
      <BackgroundLines className="h-screen w-full flex items-center justify-center flex-col px-4 bg-neutral-900">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-100 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Welcome to SportsDuniya
        </h2>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto animate-spin" />
      </BackgroundLines>
    </div>
  );
}

export default WelcomePage;
