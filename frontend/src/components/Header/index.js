import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { FiShoppingCart } from "react-icons/fi";
import CartContext from '../../Context/CartContext';
import "./index.css"

function Header() {

  const {cartItems} = useContext(CartContext)
  const cartLength = cartItems.length

  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/login")
  }

  return (
    <div className='header-div'>
        <h3 className='store-name'>Lumina Store</h3>
        <nav className='nav-items'>
            <Link to="/">
            <p>Home</p>
            </Link>
        </nav>
          <Link to="/cart" className='cart-icon'>
            Cart
            <FiShoppingCart size={20}/>
            {cartLength >0 && <span className='cart-count'>{cartLength}</span>}
          </Link>
          <button className='logout' onClick={onClickLogout}>
            Logout
          </button>
  </div>
  )
}

export default Header