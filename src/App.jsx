// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout'
import PropertyHeroSection from './pages/PropertyHeroSection/PropertyHeroSection'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import PropertyListingPage from './pages/PropertyListingPage/PropertyListingPage'
import BuyerDashboard from './pages/BuyerDashboard/BuyerDashboard'
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import ContactUs from './pages/ContactUs/ContactUs'
import AdminProfile from './pages/AdminProfile/AdminProfile'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
// import MyPropertiesList from './pages/MyPropertiesList/MyPropertiesList'
import SellerPropertiesList from './pages/SellerPropertiesList/SellerPropertiesList'
import AboutUs from './pages/AboutUs/AboutUs'
import AdminPropertyList from './pages/AdminPropertyList/AdminPropertyList'
import AdminUsersList from './pages/AdminUsersList/AdminUsersList'
import AddProperty from './pages/AddProperty/AddProperty'

function App() {

  return (
    <>
      <div>
        <Routes>
          {/* Auth routes (no Header/Footer) */}
          <Route path='/' element={<LoginPage />} />
          <Route path='register' element={<RegistrationPage />} />

          {/* All other routes render inside MainLayout (Header + Outlet + Footer) */}
          <Route element={<MainLayout />}>
            <Route path='home' element={<PropertyHeroSection />} />
            <Route path='PropertyListing' element={<PropertyListingPage />} />
            <Route path='AddProperty' element={<AddProperty />} />
            <Route path='BuyerDashboard' element={<BuyerDashboard />} />
            <Route path='SellerDashboard' element={<SellerDashboard />} />
            <Route path='PropertyDetailsPage/:propertyId' element={<PropertyDetailsPage />} />
            <Route path='ContactUs' element={<ContactUs />} />
            <Route path='AdminProfile' element={<AdminProfile />} />
            <Route path='AdminDashboard' element={<AdminDashboard />} />
            <Route path='SellerPropertiesList' element={<SellerPropertiesList />} />
            <Route path='AboutUs' element={<AboutUs />} />
            <Route path='AdminPropertyList' element={<AdminPropertyList />} />
            <Route path='AdminUsersList' element={<AdminUsersList />} />
          </Route>

          {/* Fallback: redirect unknown routes to login (adjust if you prefer different behavior) */}
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
