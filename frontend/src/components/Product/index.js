import { Link} from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import "./index.css"

function Product({details}) {
    const {title, price, description, rating, image, _id}=details
    const name=title.split(" ").slice(0,3).join(" ")
    const info=description.slice(0,31)
    
  return (
    <div className='product-div'>
        <img src={image} alt={title} className='image'/>
        <div className='title-div'>
            <p className='title'>{name}</p>
            <p><FaRegStar/> {rating.rate}</p>
        </div>
        <p className='title'>{info}...</p>
       <div className="dflex price-view-more">
         <p className='price'>$ {price}</p>
        <Link to={`/product/${_id}`}>
        <button className="view-more">View More</button>
        </Link>
       </div>
    </div>
  )
}

export default Product