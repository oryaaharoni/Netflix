import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';
import "./searchBox.css";

const SearchBox = () => {
  const navigate = useNavigate();
  // const { search } = useLocation();
  const searchInputRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState(undefined);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    console.log('in here')
    if (!query && query !== "") {
      return;
    }

    if (!userInfo) {
      navigate('/signin');
    }

    console.log("query", query);

    const filterUrl = getFilterUrl({ query: query });

    console.log("filterUrl", filterUrl);
    navigate(filterUrl);
  }, [query])


  const getFilterUrl = (filter) => {
    console.log('filter: ', filter)
    console.log('filter query: ', filter.query)
    const link = `/search?q=${filter.query}`;
    return link;
  }

  // useEffect(() => {
  //   if (searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [searchInputRef]);


  useEffect(() => {
    if (showSearch) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);


  return (
    <div className='icons'>
      <button className="fa fa-search" ref={searchInputRef} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', fontSize: 'medium' }} aria-hidden="true" onClick={() => setShowSearch(!showSearch)}></button>
      {showSearch &&
        <input onChange={(e) => setQuery(e.target.value)} value={query} style={{ color: 'black' }} id="q" name='q' type='text' placeholder='search'></input>}
    </div>
  )
}

export default SearchBox