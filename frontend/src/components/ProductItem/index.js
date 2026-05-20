import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'

import { Oval } from "react-loader-spinner";
import CartContext from '../../Context/CartContext'
import Header from '../Header';
import Footer from '../Footer';
import "./index.css"

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
}

function ProductItem() {

    const [state, setState] = useState(stateConstants.in_progress)
    const [details, setDetails] = useState({})
    const [quantity, setQuantity] = useState(1)
    const {id} = useParams()

    const {addToCart} = useContext(CartContext)

    const getDetails = async () => {
            const url =`https://fashion-store-xjgc.onrender.com/products/${id}`
            const response = await fetch(url)
            const data = await response.json()
            console.log('mongo')
            if (response.ok){
                setDetails(data)
                setState(stateConstants.success)
            }else{
                setState(stateConstants.failure)
            }
        }

    useEffect(()=>{
        const getDetails = async () => {
            const url =`https://fashion-store-xjgc.onrender.com/products/${id}`
            const response = await fetch(url)
            const data = await response.json()
            
            if (response.ok){
                setDetails(data)
                setState(stateConstants.success)
            }else{
                setState(stateConstants.failure)
            }
        }
        getDetails()
    },[id])

    const onClickPlus = async () => {
        setQuantity(prev => prev+1)
    }

    const onClickMinus = async () => {
        if (quantity>1){
            setQuantity(prev => prev-1)
        }
    }

    const onClickAddToCart = () => {
        addToCart({...details, quantity})
    }

    const {image, title, description, rating={}, price, category}= details

    const renderLoadingView = () => (
        <div className="profile-loader" data-testid="loader">
        <Oval
                visible={true}
                height="80"
                width="80"
                color="#5e84c9ff"
                ariaLabel="oval-loading"
                secondaryColor="#92aaedff"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1751650133/failureView_po4xd8.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className='tryagain-btn' onClick={getDetails}>
        Try again
      </button>
    </div>)

    const renderSuccessView = () => (
    <div className='product-item-div'>
        <div className='product-img-div'>
            <img src={image} alt={title} className='product-img'/>
        </div>
        <div className='product-details-div'>
            <h1>{title}</h1>
            <p className='description'>{description}</p>
            <p>Category : {category}</p>
            <p className='price'>$ {price}</p>
            <p>Rating : {rating.rate}</p>
            <p>Rating Count : {rating.count}</p>
            <div className='counter'>
                <button onClick={onClickMinus}>-</button>
                <h2>{quantity}</h2>
                <button onClick={onClickPlus}>+</button>
            </div>
            <button onClick={onClickAddToCart} className='add-to-cart'>Add To Cart</button>
        </div>
    </div>
  )

  
    const renderResultView = () => {
        switch (state) {
        case stateConstants.success:
            return renderSuccessView()
        case stateConstants.failure:
            return renderFailureView()
        case stateConstants.in_progress:
            return renderLoadingView()
        default:
            return null
        }
  }

  return (
    <>
    <Header/>
    {renderResultView()}
    <Footer/>
    </>
  )
}

export default ProductItem