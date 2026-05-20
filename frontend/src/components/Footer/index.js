import { PiInstagramLogoFill } from "react-icons/pi";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import "./index.css"

function Footer() {
  return (
    <div className="footer-div">
        <div className="footer-card">
            <h2>Luminia Store</h2>
            <p>Your one-stop destination for premium modern goods. We source the finest material to bring you good quality</p>
        </div>
        <div className="footer-card">
            <h2>Company</h2>
            <p>About US</p>
            <p>Careers</p>
            <p>Store Locations</p>
            <p>Privacy Policy</p>
        </div>
        <div className="footer-card">
            <h2>Support</h2>
            <p>Contact Support</p>
            <p>Terms & Services</p>
            <p>FAQs</p>
        </div>
        <div className="connect-div">
            <h2>Connect</h2>
            <div className="dflex">
            <div className="insta-div">
                <PiInstagramLogoFill size={18}/>
            </div>
            <div className="insta-div">
                <TbBrandLinkedinFilled size={18}/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Footer