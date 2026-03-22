"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TV() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isOnline, setIsOnline] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [orientation, setOrientation] = useState('landscape');
  const [videoError, setVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Component mount check
    setIsMounted(true);

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsReducedMotion(prefersReducedMotion);
    };

    // Network connectivity check
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Orientation check
    const checkOrientation = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    // Screen size check with validation
    const checkScreenSize = () => {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Validate window dimensions
        if (width <= 0 || height <= 0) {
          console.warn('Invalid window dimensions detected');
          return;
        }

        if (width < 640) {
          setScreenSize('mobile');
        } else if (width < 768) {
          setScreenSize('small-tablet');
        } else if (width < 1024) {
          setScreenSize('tablet');
        } else if (width < 1440) {
          setScreenSize('desktop');
        } else {
          setScreenSize('large-desktop');
        }
      } catch (error) {
        console.error('Error checking screen size:', error);
        setHasError(true);
      }
    };

    // Video retry logic
    const retryVideo = () => {
      if (retryCount < 3 && !videoLoaded) {
        setRetryCount(prev => prev + 1);
        setVideoError(false);
        // Force iframe reload by updating src
        setTimeout(() => {
          setVideoLoaded(false);
        }, 1000);
      }
    };

    // Initial checks
    checkReducedMotion();
    checkOnlineStatus();
    checkOrientation();
    checkScreenSize();

    // Event listeners
    const handleResize = () => {
      checkScreenSize();
      checkOrientation();
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const handleError = () => {
      setHasError(true);
      setVideoError(true);
      retryVideo();
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('error', handleError);
    
    // Reduced motion preference listener
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', checkReducedMotion);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleError);
      motionMediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, [retryCount, videoLoaded]);

  // Don't render until mounted (SSR safety)
  if (!isMounted) {
    return <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center ">
      {/* Error and Status Indicators */}
      {/* {hasError && (
        <div className="absolute top-4 left-4 z-50 bg-red-600 text-white px-3 py-2 rounded-md text-sm">
          Error: Component failed to initialize properly
        </div>
      )} */}
      
      {/* {!isOnline && (
        <div className="absolute top-4 right-4 z-50 bg-yellow-600 text-white px-3 py-2 rounded-md text-sm">
          Offline - Video may not load
        </div>
      )} */}

      {/* {isReducedMotion && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
          Reduced Motion Enabled
        </div>
      )} */}

      {/* {orientation === 'portrait' && screenSize === 'mobile' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
          Consider rotating to landscape for better viewing
        </div>
      )} */}
      {/* TV Frame - Responsive sizing */}
      <div 
        className="relative" 
        style={{width: '100%', height: '100%', marginTop: '0%', transform: 'rotate(-2deg)'}}
        // style={{ 
        //   width: screenSize === 'mobile' ? '95vw' : 
        //         screenSize === 'small-tablet' ? '90vw' : 
        //         screenSize === 'tablet' ? '85vw' : 
        //         screenSize === 'desktop' ? '100vw' : '100vw', 
        //   height: screenSize === 'mobile' ? '70vh' : 
        //          screenSize === 'small-tablet' ? '75vh' : 
        //          screenSize === 'tablet' ? '80vh' : 
        //          screenSize === 'desktop' ? '120vh' : '140vh',
        //   // aspectRatio: '16/9',
        //   marginTop: screenSize === 'mobile' ? 30 : 
        //             screenSize === 'small-tablet' ? 40 : 
        //             screenSize === 'tablet' ? 60 : 
        //             screenSize === 'desktop' ? 150 : 200
        // }}
      >
        <Image
          src="/tv.png"
          alt="TV Frame"
          fill
          className="object-contain"
          priority
        />

        {/* Video inside TV - Mobile responsive positioning */}
        {/* <div 
          className="absolute bg-black z-20 flex justify-center items-center overflow-hidden rounded-md"
          style={{
            top: screenSize === 'mobile' ? '46%' : 
                screenSize === 'small-tablet' ? '46%' : 
                screenSize === 'tablet' ? '46%' : 
                screenSize === 'desktop' ? '46%' : '46%',
            left: screenSize === 'mobile' ? '20%' : 
                 screenSize === 'small-tablet' ? '22%' : 
                 screenSize === 'tablet' ? '22%' : 
                 screenSize === 'desktop' ? '22%' : '22%',
            width: screenSize === 'mobile' ? '44%' : 
                  screenSize === 'small-tablet' ? '42%' : 
                  screenSize === 'tablet' ? '42%' : 
                  screenSize === 'desktop' ? '42%' : '42%',
            height: screenSize === 'mobile' ? '32%' : 
                   screenSize === 'small-tablet' ? '36%' : 
                   screenSize === 'tablet' ? '39%' : 
                   screenSize === 'desktop' ? '40%' : '40%'
          }}
        > */}
          {/* <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/sUOPOvJMWXw?autoplay=${!isReducedMotion ? '1' : '0'}&mute=0&controls=0&rel=0&modestbranding=1&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => {
              setVideoLoaded(true);
              setVideoError(false);
              setRetryCount(0);
            }}
            onError={() => {
              setVideoError(true);
              setHasError(true);
              console.error('Video failed to load');
            }}
            style={{
              border: 'none',
              transition: isReducedMotion ? 'none' : 'all 0.3s ease',
              // width: '100%',
              // height: '100%',
              // minWidth: screenSize === 'mobile' ? '200px' : 
              //          screenSize === 'small-tablet' ? '300px' : 
              //          screenSize === 'tablet' ? '200' : 
              //          screenSize === 'desktop' ? '240px' : '300px',
              // minHeight: screenSize === 'mobile' ? '30px' : 
              //           screenSize === 'small-tablet' ? '50px' : 
              //           screenSize === 'tablet' ? '60px' : 
              //           screenSize === 'desktop' ? '70px' : '80px',
              // maxWidth: '100%',
              // maxHeight: '100%'
            }}
          ></iframe> */}
          
          {/* {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
              <div>Loading video...</div>
              {retryCount > 0 && <div className="text-xs mt-1">Retry attempt: {retryCount}/3</div>}
            </div>
          )} */}

          {/* {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 text-white text-sm p-4">
              <div className="text-red-400 mb-2">⚠️ Video failed to load</div>
              <div className="text-center mb-4">
                {!isOnline ? 'No internet connection' : 'Unable to load video content'}
              </div>
              {retryCount < 3 && (
                <button 
                  onClick={() => {
                    setVideoError(false);
                    setVideoLoaded(false);
                    setRetryCount(prev => prev + 1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
                >
                  Retry ({retryCount}/3)
                </button>
              )}
              {retryCount >= 3 && (
                <div className="text-xs text-gray-400">
                  Maximum retry attempts reached
                </div>
              )}
            </div>
          )} */}
        {/* </div> */}
      
      </div>
      <div className="relative" style={{ width: '100%', height: '100%', zIndex: 20 }}>
        <div className="relative w-full h-full">
          <Image
            src="/Drone.svg"
            alt="Flying Ribbons"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
