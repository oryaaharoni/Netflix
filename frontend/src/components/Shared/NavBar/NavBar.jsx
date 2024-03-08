import './navBar.css'
import SearchBox from '../../SearchBox';
import { useLocation } from 'react-router-dom';

const NavBar = ({ className }) => {
  console.log(className)
  const location = useLocation();
  const isSignInOrSignUpPage = location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/resetPwd" || location.pathname === "/forgotPwd";


  function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display = dropdownContent.style.display === "inline-block" ? "none" : "inline-block";
  }



  if (isSignInOrSignUpPage) {
    return null
  }

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
          <SearchBox></SearchBox>
          {/* add here search (maybe change to button) , add onchange to input*/}
          {/* <li><a className="fa fa-search" aria-hidden="true" href='/info'></a></li> */}
          {/* <input onChange={() => navigate('/search')} className="searchInput" type='text' placeholder='search'></input> */}

          {/* <li>notification</li> */}
          {/* <li>drop list</li> */}


          {/* <div className='dropdown'>
            <button className='btnDropdown'>
              <img className='imgDropdown' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' />
            </button>
            <div className='dropdown-content'></div>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
          </div> */}


          <div className='dropdown'>
            <button className='btnDropdown' onClick={() => toggleDropdown()}>
              <img className='imgDropdown' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Avatar' />
            </button>
            <div id="myDropdown" className='dropdown-content'>
              <a href="#">Option 1</a>
              <br />
              <a href="#">Sign out of Netlix</a>
            </div>
          </div>



        </div>
      </ul>
    </div>
  )
}

export default NavBar