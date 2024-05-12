import React, { useState } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import VideoStream from './VideoStream';

const Main = ({roomId}) => {
  const [id, setId] = useState(false);

  return (
    <div className='main'>
      <nav className='nav'>
        <p>Video Chat</p>
        <img src={assets.user_img} alt="" />
      </nav>

      <section>
          <VideoStream roomId={id ? roomId : null}/>
        <div className='send-id'>
          <input type="text" placeholder='Enter the ID' />
          <button type="submit" onClick={()=>setId(true)}>Call</button>
        </div>
      </section>
    </div>
  )
}

export default Main
