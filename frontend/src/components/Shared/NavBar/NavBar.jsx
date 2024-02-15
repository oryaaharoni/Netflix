import Header from "../Header"
import './navBar.css'

const NavBar = () => {
  return (
    <div>
      <ul>
        {/* <Header/> */}

        <li>
          <a>
            <img src="../../../public/Netflix-logo.png" width={100} alt="netflix logo" />
          </a>
        </li>


        <li><a href='/homepage'>Home Page</a></li>
        <li><a href='/homepage'>Series</a></li>
        <li><a href='/'>Movies</a></li>
        <li><a href='/'>My List</a></li>
        
        <li class="fa fa-search" aria-hidden="true"><a></a></li>
        {/* <li>notification</li> */}
        {/* <li>drop list</li> */}
      </ul>
    </div>
  )
}

export default NavBar