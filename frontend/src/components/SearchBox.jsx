import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
    const { search }= useLocation();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery]= useState("");

    useEffect(() => {
      if (!query){
        return;
      }

      console.log("query", query);
      const filterUrl= getFilterUrl(search, {query: query});
      navigate(filterUrl);
    }, [query])
    

    const getFilterUrl= (searchFromUrl, filter) => {

        const searchParams = new URLSearchParams(searchFromUrl);
        
        
    }

  return (
    <div>
        <div className='icons-navBar'>
            <button className="fa fa-search" aria-hidden="true" onClick={()=> setShowSearch(!showSearch)}></button>
            { showSearch && 
            <input onChange={() => navigate('/search')} className="searchInput" type='text' placeholder='search'></input> }
           
        </div>
  </div>
  )
}

export default SearchBox