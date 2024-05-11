import React from 'react';
import './main.css';
import { assets } from '../../assets/assets';

const Main = () => {
  return (
    <div className='main'>
      <nav className='nav'>
        <p>Video Chat</p>
        <img src={assets.user_img} alt="" />
      </nav>

      <section>
        <div className="videos">
            <div className="video" id='self'></div>
            <div className="video" id='user'></div>
        </div>
        <div className='send-id'>
            <input type="text" placeholder='Enter the ID' />
            <button type="submit">Call</button>
        </div>
      </section>
    </div>
  )
}

export default Main
