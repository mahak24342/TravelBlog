"use client"
import { useEffect, useState } from 'react';

const Share = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if the Web Share API is supported
    if (navigator.share) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check this out!',
        text: 'Have a look at this amazing page.',
        url: window.location.href,
      });
      console.log('Content shared successfully');
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return (
    <div>
      {isSupported ? (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={handleShare}
        >
          Share this page
        </button>
      ) : (
        <p>Sharing is not supported on this browser.</p>
      )}
    </div>
  );
};

export default Share;
