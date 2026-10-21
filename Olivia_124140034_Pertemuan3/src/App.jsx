import { Route, Routes } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import NotFound from './pages/NotFound/NotFound'

// Router (HashRouter) dipasang di main.jsx agar App mudah dites dengan MemoryRouter
function App() {
  return (
    <BookProvider>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BookProvider>
  )
}

export default App
