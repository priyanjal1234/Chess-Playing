import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import ChessGame from './pages/ChessGame'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Landing />}/>
        <Route path='/room/:roomId/:color' element = {<ChessGame />}/>
      </Routes>
    </div>
  )
}

export default App