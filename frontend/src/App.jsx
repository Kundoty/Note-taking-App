import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create' element={<CreatePage />} />
          <Route path='/note/:id' element={<NoteDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
