import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './main.css'

const serverUrl = 'http://localhost:5000'; // Replace with your server URL

const VideoStream = ({ roomId }) => {

  const videoRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the server
    socketRef.current = io(serverUrl);

    // Join the video call room
    socketRef.current.emit('join-call', roomId);

    // Access user media and start video
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing user media:', error);
      });
  
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  
  return (
    <div className='videos'  id='vid'>
      <video className='video' ref={videoRef} autoPlay muted playsInline />
    </div>
  );
};

export default VideoStream;
