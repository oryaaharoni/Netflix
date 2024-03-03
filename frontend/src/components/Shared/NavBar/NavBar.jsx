import { useNavigate } from 'react-router-dom'
import './navBar.css'

const NavBar = ({className}) => {

  const navigate = useNavigate();

  return (
    <div id="mainDivNavBar" className={className}>
      <ul className='ul-navBar'>
        <li>
          <a href="/">
            <img src="../../../public/Netflix-logo.png" width={100} height={40} alt="netflix logo" />
          </a>
        </li>

        <div>
          <li><a href='/'>Home Page</a></li>
          <li><a href='/series'>Series</a></li>
          <li><a href='/movies'>Movies</a></li>
          <li><a href='/myList'>My List</a></li>
        </div>

        <div className='icons-navBar'>
          {/* add here search (maybe change to button) , add onchange to input*/}
          <li><a className="fa fa-search" aria-hidden="true" href='/info'></a></li>
          <input onChange={() => navigate('/search')} className="searchInput" type='text' placeholder='search'></input>

          {/* <li>notification</li> */}
          {/* <li>drop list</li> */}
        </div>
      </ul>
    </div>
  )
}

export default NavBar