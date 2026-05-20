import {useContext} from 'react'
import CartContext from '../../Context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

function Cart() {

  const {cartItems, clearCart} = useContext(CartContext)

  return (
    <>
    <Header/>
      <div className="cart-container">
        <div>
          {cartItems.length ===0 ?
          <EmptyCartView/> :
          <div>
            <div className='cart-head'>
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="remove-all-btn"
                data-testid="remove"
                onClick={clearCart}
              >Remove All</button>
            </div>
          <ul>{cartItems.map(each=>(
              <CartItem key={each.id} Item={each}/>))}
          </ul>
          </div>
          }
        </div>
     </div>
     <Footer/>
     </>
  )
}

export default Cart