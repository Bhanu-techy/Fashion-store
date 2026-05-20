import { IoFilterSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import "./index.css"

function Filter({setCategory, search, setSearch, onClickSearch}) {
  return (
    <div className='filters-div'>
        <h2>Search by title</h2>
        <div className="search-bar">
            <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} className="input"/>
            <button className="search-btn" onClick={onClickSearch}><CiSearch size={25}/></button>
        </div>
        <div>
        <h2><span><IoFilterSharp/> </span>Filters</h2>
         <select onChange={(e)=>setCategory(e.target.value)}>
                <option value="" selected disabled>Features</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electonics">Electonics</option>
            </select>
        </div>
        
    </div>
  )
}

export default Filter