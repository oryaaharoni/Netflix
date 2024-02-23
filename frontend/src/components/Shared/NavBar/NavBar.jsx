import './navBar.css'

const NavBar = () => {
  return (
    <div>
      <ul className='ul-navBar'>
        {/* <Header/> */}

        <li>
          <a href="/">
            <img src="../../../public/Netflix-logo.png" width={100} height={40} alt="netflix logo" />
          </a>
        </li>

        <div>

          <li><a href='/'>Home Page</a></li>
          <li><a href='/series'>Series</a></li>
          <li><a href='/movies'>Movies</a></li>
          <li><a href='/mylist'>My List</a></li>
        </div>

        <div className='icons-navBar'>

          <li className="fa fa-search" aria-hidden="true"></li>
          {/* <li>notification</li> */}
          {/* <li>drop list</li> */}
        </div>
      </ul>
    </div>
  )
}

export default NavBar