import React, { useRef, useEffect } from 'react';

const VideoStream = ({ containerId, width, height }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };

    getMedia();

    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(videoRef.current);
    }

    return () => {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
      videoRef.current.srcObject = null;
      container.removeChild(videoRef.current);
    };
  }, [containerId]);

  return <video ref={videoRef} style={{ width, height }} />;
};

export default VideoStream;
