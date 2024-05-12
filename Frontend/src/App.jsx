import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const roomId = uuidv4();
  console.log(roomId);

  return (
    <>
      <Sidebar roomId={roomId}/>
      <Main roomId={roomId}/>
    </>
  )
}

export default App
