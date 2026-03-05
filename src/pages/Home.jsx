import React, { useState, useEffect } from 'react';

const BieStoreTShirtShop = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showTShirt, setShowTShirt] = useState(false);
  const [currentTShirt, setCurrentTShirt] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particleEffect, setParticleEffect] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Track window size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  // Simulate loading
  useEffect(() => {
    if (loadingProgress < 100 && !showNextButton && !showWelcome) {
      const timer = setTimeout(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 80) {
            setShowWelcome(true);
            setShowNextButton(true);
            setParticleEffect(true);
            setTimeout(() => setParticleEffect(false), 3000);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 40);

      return () => clearTimeout(timer);
    }
  }, [loadingProgress, showNextButton, showWelcome]);

  const handleNextClick = () => {
    setShowTShirt(true);
    setShowWelcome(false);
    setShowNextButton(false);
    setParticleEffect(true);
    setTimeout(() => setParticleEffect(false), 1500);
  };

 
 

  // Responsive font sizes
  const getHeaderSize = () => {
    if (windowWidth < 640) return "text-4xl";
    if (windowWidth < 768) return "text-5xl";
    if (windowWidth < 1024) return "text-6xl";
    return "text-8xl";
  };

  const getLoadingSize = () => {
    if (windowWidth < 640) return "w-64 h-64";
    if (windowWidth < 768) return "w-80 h-80";
    return "w-96 h-96";
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-48 sm:w-72 h-48 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-48 sm:w-72 h-48 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      {particleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(windowWidth < 640 ? 15 : 30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl w-full">

          {/* Animated Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 transform hover:scale-105 transition-transform duration-500">
            <h1 className="relative">
              <span className={`${getHeaderSize()} font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x px-2`}>
                BIE STORE
              </span>
            </h1>
            <div className="relative mt-2 sm:mt-3 md:mt-4">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 tracking-[0.2em] sm:tracking-[0.3em] uppercase animate-pulse px-2">
                BIE STORE | STREETWEAR SINCE 2025
              </p>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-20"></div>
            </div>
          </div>

          {/* Loading Section */}
          {!showTShirt && (
            <div className="relative px-2 sm:px-4">
              
              {/* Welcome Screen at 80% */}
              {showWelcome && (
                <div className="mb-8 sm:mb-10 md:mb-12 text-center animate-fade-in-up">
                  <div className="relative inline-block">
                    {/* Congratulations Animation */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    
                    <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/10">
                      {/* Floating Emojis */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
                        <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">🎉</span>
                        <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce animation-delay-300">✨</span>
                        <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce animation-delay-700">🎊</span>
                      </div>

                      {/* Welcome Message */}
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3 sm:mb-4">
                        WELCOME TO
                      </h2>
                      <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6">
                        BIE_STORE
                      </h3>
                      
                      {/* Animated Progress Bar */}
                      <div className="w-48 sm:w-56 md:w-64 mx-auto h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                          style={{ width: `${loadingProgress}%` }}
                        />
                      </div>

                      <p className="text-gray-400 text-sm sm:text-base mb-2">
                        {loadingProgress}% Loaded
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Ready to explore our collection!
                      </p>

                      {/* Confetti Effect */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: `${3 + Math.random() * 2}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Circular Progress (Hidden when welcome screen shows) */}
              {!showWelcome && (
                <div className={`relative ${getLoadingSize()} mx-auto mb-8 sm:mb-10 md:mb-12`}>
                  {/* Outer Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20 animate-pulse"></div>

                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      className="text-gray-800"
                      strokeWidth={windowWidth < 640 ? "6" : "8"}
                      stroke="currentColor"
                      fill="transparent"
                      r={windowWidth < 640 ? "100" : windowWidth < 768 ? "130" : "170"}
                      cx={windowWidth < 640 ? "128" : windowWidth < 768 ? "160" : "192"}
                      cy={windowWidth < 640 ? "128" : windowWidth < 768 ? "160" : "192"}
                    />
                    <circle
                      className="text-transparent"
                      strokeWidth={windowWidth < 640 ? "6" : "8"}
                      stroke="url(#gradient)"
                      fill="transparent"
                      r={windowWidth < 640 ? "100" : windowWidth < 768 ? "130" : "170"}
                      cx={windowWidth < 640 ? "128" : windowWidth < 768 ? "160" : "192"}
                      cy={windowWidth < 640 ? "128" : windowWidth < 768 ? "160" : "192"}
                      strokeDasharray={`${2 * Math.PI * (windowWidth < 640 ? 100 : windowWidth < 768 ? 130 : 170)}`}
                      strokeDashoffset={`${2 * Math.PI * (windowWidth < 640 ? 100 : windowWidth < 768 ? 130 : 170) * (1 - loadingProgress / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.3s' }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className={`block ${windowWidth < 640 ? 'text-4xl' : 'text-5xl sm:text-6xl md:text-7xl'} font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400`}>
                        {loadingProgress}%
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 tracking-widest mt-1 sm:mt-2 block">
                        LOADING
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading Message */}
              {!showWelcome && (
                <div className="text-center space-y-3 sm:space-y-4">
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg animate-pulse">
                    Crafting your premium experience
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="w-48 sm:w-56 md:w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Next Button */}
              {showNextButton && showWelcome && (
                <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-center group px-2">
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                  <button
                    onClick={handleNextClick}
                    className="relative w-full sm:w-auto px-6 sm:px-10 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-base sm:text-lg md:text-xl lg:text-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 hover:rotate-1 hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl">EXPLORE COLLECTION</span>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  </button>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                    <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-ping"></span>
                    <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-ping animation-delay-300"></span>
                    <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-ping animation-delay-700"></span>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Footer */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12 text-gray-600 text-xs sm:text-sm">
            <p>© 2025 BIE STORE. All rights reserved. | Premium Streetwear Since 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BieStoreTShirtShop;