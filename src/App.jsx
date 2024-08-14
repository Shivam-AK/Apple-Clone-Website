import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/Model"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"
import Smoke from "./components/Smoke"

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path='/' element={
          <>
            <Hero />
            <Highlights />
            <Features />
            <HowItWorks />
            <Footer />
          </>
        } />
        <Route
          path='/*'
          element={
            <>
              <Routes>
                <Route path='/model' element={<Model />} />
                <Route path='/smoke' element={<Smoke />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App


