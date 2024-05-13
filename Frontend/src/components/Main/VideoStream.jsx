import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import './main.css'

const serverUrl = 'http://localhost:5000'; // Replace with your server URL

const VideoStream = ({ roomId }) => {

  const videoRef = useRef(null);
  const socketRef = useRef();
  const [userStream, setUserStream] = useState(null);
  const userVideoRef = useRef(null);

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
      
      socketRef.current.emit('userJoined', (stream) => {
        console.log('User joined with stream');
        setUserStream(videoRef.current.srcObject);
      });

      if (userStream && userVideoRef.current) {
        userVideoRef.current.srcObject = userStream;
      }

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userStream]);

  return (
    <div className='videos'  id='vid'>
      <video className='video' ref={videoRef} autoPlay muted playsInline />
      {userStream ? (
        <video ref={userVideoRef} className='video' autoPlay playsInline />
      ): null}
    </div>
  );
};

export default VideoStream;
