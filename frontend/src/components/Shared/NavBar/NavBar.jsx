import './navBar.css'

const NavBar = () => {
  return (
    <div>
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
          <li><a href='/mylist'>My List</a></li>
        </div>

        <div className='icons-navBar'>
          {/* add here search (maybe change to button) , add onchange to input*/}
          <li><a className="fa fa-search" aria-hidden="true" href='/'></a></li>
          <input className="searchInput" type='text' placeholder='search'></input>

          {/* <li>notification</li> */}
          {/* <li>drop list</li> */}
        </div>
      </ul>
    </div>
  )
}

export default NavBar