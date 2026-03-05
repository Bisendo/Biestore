import React, { useState, useEffect } from 'react';

const BieStoreTShirtShop = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showTShirt, setShowTShirt] = useState(false);
  const [currentTShirt, setCurrentTShirt] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particleEffect, setParticleEffect] = useState(false);

  // T-shirt collection with local gradient backgrounds (no external images)
  const tShirts = [
    {
      id: 1,
      gradient: "bg-gradient-to-br from-gray-100 to-gray-200",
      color: "Pearl White",
      accent: "from-purple-400 to-pink-400",
      shadow: "shadow-white/20"
    },
    {
      id: 2,
      gradient: "bg-gradient-to-br from-gray-900 to-gray-800",
      color: "Midnight Black",
      accent: "from-purple-500 to-pink-500",
      shadow: "shadow-black/20"
    },
    {
      id: 3,
      gradient: "bg-gradient-to-br from-blue-900 to-blue-800",
      color: "Royal Navy",
      accent: "from-cyan-400 to-blue-400",
      shadow: "shadow-blue-900/20"
    },
    {
      id: 4,
      gradient: "bg-gradient-to-br from-red-600 to-red-500",
      color: "Passion Red",
      accent: "from-yellow-400 to-orange-400",
      shadow: "shadow-red-600/20"
    },
    {
      id: 5,
      gradient: "bg-gradient-to-br from-purple-700 to-purple-600",
      color: "Royal Purple",
      accent: "from-pink-400 to-purple-400",
      shadow: "shadow-purple-700/20"
    },
    {
      id: 6,
      gradient: "bg-gradient-to-br from-emerald-600 to-teal-500",
      color: "Emerald Green",
      accent: "from-yellow-300 to-green-300",
      shadow: "shadow-emerald-600/20"
    },
    {
      id: 7,
      gradient: "bg-gradient-to-br from-amber-500 to-yellow-500",
      color: "Sunset Gold",
      accent: "from-red-400 to-pink-400",
      shadow: "shadow-amber-500/20"
    },
    {
      id: 8,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
      color: "Rose Pink",
      accent: "from-purple-400 to-pink-400",
      shadow: "shadow-pink-500/20"
    }
  ];

  // Simulate loading with particle effect
  useEffect(() => {
    if (loadingProgress < 100 && !showNextButton) {
      const timer = setTimeout(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 80) {
            setShowNextButton(true);
            setParticleEffect(true);
            setTimeout(() => setParticleEffect(false), 2000);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 40);

      return () => clearTimeout(timer);
    }
  }, [loadingProgress, showNextButton]);

  const handleNextClick = () => {
    setShowTShirt(true);
    setShowNextButton(false);
    setParticleEffect(true);
    setTimeout(() => setParticleEffect(false), 1500);
  };

  const handleNextTShirt = () => {
    setCurrentTShirt((prev) => (prev + 1) % tShirts.length);
    setParticleEffect(true);
    setTimeout(() => setParticleEffect(false), 800);
  };

  const handlePrevTShirt = () => {
    setCurrentTShirt((prev) => (prev - 1 + tShirts.length) % tShirts.length);
    setParticleEffect(true);
    setTimeout(() => setParticleEffect(false), 800);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* Animated Background with Moving Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      {particleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full">

          {/* Animated Header */}
          <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
            <h1 className="relative">
              <span className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
                BIE STORE
              </span>
            </h1>
            <div className="relative mt-4">
              <p className="text-xl text-gray-400 tracking-[0.3em] uppercase animate-pulse">
                Premium Streetwear Collection
              </p>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 blur opacity-20"></div>
            </div>
          </div>

          {/* Loading Section */}
          {!showTShirt && (
            <div className="relative">
              {/* Circular Progress with Glow */}
              <div className="relative w-96 h-96 mx-auto mb-12">
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20 animate-pulse"></div>

                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    className="text-gray-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="170"
                    cx="192"
                    cy="192"
                  />
                  <circle
                    className="text-transparent"
                    strokeWidth="8"
                    stroke="url(#gradient)"
                    fill="transparent"
                    r="170"
                    cx="192"
                    cy="192"
                    strokeDasharray={`${2 * Math.PI * 170}`}
                    strokeDashoffset={`${2 * Math.PI * 170 * (1 - loadingProgress / 100)}`}
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
                    <span className="block text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      {loadingProgress}%
                    </span>
                    <span className="text-sm text-gray-500 tracking-widest mt-2 block">
                      LOADING
                    </span>
                  </div>
                </div>

                {/* Floating Dots */}
                <div className="absolute -inset-4">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-float"></div>
                  <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-float animation-delay-1000"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-500 rounded-full animate-float animation-delay-2000"></div>
                </div>
              </div>

              {/* Loading Message */}
              <div className="text-center space-y-4">
                <p className="text-gray-400 text-lg animate-pulse">
                  Crafting your premium experience
                </p>

                {/* Animated Progress Bar */}
                <div className="w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>

              {/* Next Button with Spectacular Animation */}
              {showNextButton && (
                <div className="relative mt-12 text-center group">
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                  <button
                    onClick={handleNextClick}
                    className="relative px-16 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-1 hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                      DISCOVER COLLECTION
                      <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  </button>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 space-x-2">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                    <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-ping animation-delay-300"></span>
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-700"></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* T-Shirt Display Section */}
          {showTShirt && (
            <div className="space-y-12">
              {/* Main Display Card */}
              <div className="relative group">
                {/* Animated Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>

                <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* T-Shirt Visual */}
                    <div className="relative">
                      {/* 3D Tilt Effect */}
                      <div
                        className="relative transform-gpu transition-all duration-700 hover:rotate-2 hover:scale-105"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {/* Main T-Shirt Shape */}
                        <div className={`relative w-full aspect-square ${tShirts[currentTShirt].gradient} rounded-[40%] rounded-t-[30%] shadow-2xl ${tShirts[currentTShirt].shadow} overflow-hidden`}>

                          {/* Fabric Texture */}
                          <div className="absolute inset-0" style={{
                            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none"/%3E%3Cpath d="M30 0v60M0 30h60" stroke="%23ffffff" stroke-width="0.5" stroke-opacity="0.1"/%3E%3C/svg%3E')`,
                            opacity: '0.2'
                          }}></div>
                          {/* Collar */}
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-10 bg-black/20 rounded-full"></div>

                          {/* Sleeves */}
                          <div className="absolute -left-6 top-16 w-16 h-32 bg-inherit rounded-l-full shadow-2xl"></div>
                          <div className="absolute -right-6 top-16 w-16 h-32 bg-inherit rounded-r-full shadow-2xl"></div>

                          {/* Printed Text with 3D Effect */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              {/* Shadow */}
                              <div className="absolute inset-0 bg-black/20 blur-2xl transform translate-y-2 scale-95"></div>

                              {/* Main Text */}
                              <div className={`relative px-8 py-4 bg-white/95 backdrop-blur rounded-xl shadow-2xl transform ${isHovering ? 'rotate-0 scale-110' : 'rotate-[-5deg]'} transition-all duration-700 border-2 border-white/50`}>
                                <span className={`text-3xl font-black bg-gradient-to-r ${tShirts[currentTShirt].accent} bg-clip-text text-transparent tracking-wider`}>
                                  BIE_STORE
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Hem */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-black/20 rounded-full"></div>
                        </div>

                        {/* Floating Particles on Hover */}
                        {isHovering && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 0.5}s`
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Color Swatch */}
                      <div className="absolute -bottom-4 -right-4 bg-black/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <div className={`w-12 h-12 rounded-full ${tShirts[currentTShirt].gradient} border-4 border-white/20`}></div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                      {/* Title */}
                      <div>
                        <h2 className="text-5xl font-black text-white mb-2">
                          {tShirts[currentTShirt].color}
                        </h2>
                        <p className="text-gray-400 text-lg tracking-wide">Premium Edition T-Shirt</p>
                      </div>

                      {/* Color Selector */}
                      <div className="space-y-4">
                        <p className="text-gray-300 text-sm uppercase tracking-wider">Available Colors</p>
                        <div className="flex flex-wrap gap-3">
                          {tShirts.map((shirt, index) => (
                            <button
                              key={shirt.id}
                              onClick={() => {
                                setCurrentTShirt(index);
                                setParticleEffect(true);
                                setTimeout(() => setParticleEffect(false), 500);
                              }}
                              className="group relative"
                            >
                              <div className={`absolute -inset-0.5 bg-gradient-to-r ${shirt.accent} rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300 ${currentTShirt === index ? 'opacity-100' : ''}`}></div>
                              <div className={`relative w-12 h-12 rounded-full ${shirt.gradient} border-2 border-white/20 transform group-hover:scale-110 transition-all duration-300 ${currentTShirt === index ? 'scale-110 ring-2 ring-white' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: '✨', text: 'Premium Cotton' },
                          { icon: '🎨', text: 'Screen Printed' },
                          { icon: '💧', text: 'Water Resistant' },
                          { icon: '⭐', text: '5 Year Warranty' }
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
                            <span className="text-2xl">{feature.icon}</span>
                            <span className="text-gray-300 text-sm">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-6">
                        <span className="text-5xl font-black text-white">$49.99</span>
                        <span className="text-gray-400 line-through">$89.99</span>
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          -44%
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                          <span className="relative z-10">Add to Cart 🛒</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <button className="px-6 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10">
                          ❤️
                        </button>
                      </div>

                      {/* Navigation */}
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={handlePrevTShirt}
                          className="flex-1 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Previous
                        </button>
                        <button
                          onClick={handleNextTShirt}
                          className="flex-1 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                          Next
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowTShirt(false);
                    setLoadingProgress(0);
                    setShowNextButton(false);
                    setCurrentTShirt(0);
                  }}
                  className="text-gray-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mx-auto group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 text-gray-600 text-sm">
            <p>© 2024 BIE STORE. All rights reserved. | Premium Streetwear Since 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BieStoreTShirtShop;