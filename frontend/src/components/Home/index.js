import {useState, useEffect} from 'react'
import { Oval } from "react-loader-spinner";
import Header from '../Header'
import Footer from '../Footer'
import Product from '../Product'
import Filter from '../Filter'
import "./index.css"

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
}

function Home() {
    
    const [state, setState] = useState(stateConstants.in_progress)
    const [data, setData] = useState([])
    const [loadMore, setLoadMore] = useState(false)
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")

    const getDetails = async () => {
            const response = await fetch("https://fashion-store-xjgc.onrender.com/products")
            const details = await response.json()
            const someData=details.slice(3,13)
            if (response.ok){
                setData(someData)
                setState(stateConstants.success)
            }else{
                setState(stateConstants.failure)
            }}

    useEffect(()=>{
        getDetails()
    },[])


    const onClickLoadMore = async ()=>{
        setState(stateConstants.in_progress)
        const response = await fetch("https://fashion-store-xjgc.onrender.com/products")
            const fullData = await response.json()
            if (response.ok){
                setData(fullData)
                setState(stateConstants.success)
            }
            setLoadMore(true)
            setSearch("")
    }

    const filterData = category!==""? data.filter(each=> each.category.includes(category)) : data

    const onClickSearch = () => {
        const searchResult = data.filter(each => each.title.toLowerCase().includes(search.toLocaleLowerCase()))
        setData(searchResult)
    }

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
      <button type="button" className='tryagain-btn' onClick={getDetails} >
        Try again
      </button>
    </div>)

    const renderSuccessView = () => (
        <div className='productlist-div'>
            <Filter setCategory={setCategory} search={search} setSearch={setSearch} onClickSearch={onClickSearch}/>
            <div className='text-center'>
                <div className='text'>
                    <h1 className='heading'>Discover Our Product</h1>
                    <p className='para'>Browse our latest collection of premium design for the modern styles.</p>
                </div>
            <ul className='products-list'>
            {filterData.map(each=>(
                <Product key={each.id} details={each}/>
            ))}
            </ul>
            {!loadMore && <button className='load-more-btn' id='load-more' onClick={onClickLoadMore}>Load More</button>}
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
    <div className='home-div'>
    {renderResultView()}
    </div>
    <Footer/>
    </>
  )
}

export default Home