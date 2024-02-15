import './navBar.css'

const NavBar = () => {
  return (
    <div>
      <ul>
        {/* <Header/> */}

        <li>
          <a href="/homepage">
            <img src="../../../public/Netflix-logo.png" width={100} height={40} alt="netflix logo" />
          </a>
        </li>


        <li><a href='/homepage'>Home Page</a></li>
        <li><a href='/series'>Series</a></li>
        <li><a href='/movies'>Movies</a></li>
        <li><a href='/mylist'>My List</a></li>
        
        <li className="fa fa-search" aria-hidden="true"><a></a></li>
        {/* <li>notification</li> */}
        {/* <li>drop list</li> */}
      </ul>
    </div>
  )
}

export default NavBar