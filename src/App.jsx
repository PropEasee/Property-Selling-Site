// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Component/Header'
import PropertyHeroSection from './pages/PropertyHeroSection/PropertyHeroSection'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import Footer from './Component/Footer'
import PropertyListingPage from './pages/PropertyListingPage/PropertyListingPage'
import BuyerDashboard from './pages/BuyerDashboard/BuyerDashboard'
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import ContactUs from './pages/ContactUs/ContactUs'

function App() {

  return (
    <>
    <div>
      <Header></Header>
      <Routes>
        <Route
          path='/'
          element={<LoginPage/>}
        />

        <Route
          path='register'
          element={<RegistrationPage />}
        />
        <Route
          path='Home'
          element={<PropertyHeroSection></PropertyHeroSection>}
        />
        <Route
          path='PropertyListing'
          element={<PropertyListingPage/>}
        />
        <Route
          path='BuyerDashboard'
          element={<BuyerDashboard/>}
        />
        <Route
          path='SellerDashboard'
          element={<SellerDashboard/>}
        />
        <Route
          path='PropertyDetailsPage'
          element={<PropertyDetailsPage/>}
        />
        <Route
          path='ContactUs'
          element={<ContactUs/>}
        />

      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
