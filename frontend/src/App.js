import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home';
import ProductItem from './components/ProductItem';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductItem/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )}

export default App
