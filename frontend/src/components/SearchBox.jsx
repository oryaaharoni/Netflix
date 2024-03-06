import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery]= useState("");

    useEffect(() => {
      if (!query){
        return;
      }

      console.log("query", query);
      console.log("search", search);
      const filterUrl= getFilterUrl(search, {query: query});

      console.log("filterUrl", filterUrl);
      navigate(filterUrl);
    }, [query])
    

    const getFilterUrl= (searchFromUrl, filter) => {

        const searchParams = new URLSearchParams(searchFromUrl);
        const q = searchParams.get("q");
        const link = `/search?q=${query}`;
        // navigate(link);
        return link;
        
        
    }

  return (
    <div>
        <div className='icons-navBar'>
            <button className="fa fa-search" aria-hidden="true" onClick={()=> setShowSearch(!showSearch)}></button>
            { showSearch && 
            <input onChange={(e)=>setQuery(e.target.value)} style={{color:'black'}} id="q" name='q' type='text' placeholder='search'></input> }
        </div>
  </div>
  )
}

export default SearchBox