
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from './components/Pages/Index'
import Game from "./Game";
import ProfilesPage from './components/Pages/ProfilePages';
import './App.css'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/play" element={<Game />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
