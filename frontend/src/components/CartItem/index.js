import {useContext} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

function CartItem({Item}) {

    const {removeFromCart} =useContext(CartContext)
    const {image, title, category, price, quantity, id } = Item
    const totalPrice = price*quantity

  return (
    <li className='cartItem'>
        <img src={image} className='cart-img' alt={title}/>
        <p>{category}</p>
        <p>Quantity : {quantity}</p>
        <p>${totalPrice}</p>
        <button onClick={()=>removeFromCart(id)} className='remove-btn'>Remove</button>
    </li>
  )
}

export default CartItem