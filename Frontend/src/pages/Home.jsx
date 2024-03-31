import React from 'react'
import './home.scss'
import logo from "/src/assets/logo.png";

const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src={logo} alt="logo" className='homePageLogo' />
        <h4 className="mainLabel"> Paste Room Id</h4>
        <div className="inputGroup">
          <input className="inputBox" placeholder="Room Id"></input>
          <input className="inputBox" placeholder="User Name"></input>
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        {/* <h4>
          Code together, innovate together. Share, collaborate, and build
          something amazing. Happy coding!
        </h4> */}
        <h5>
          Built by &nbsp;
          <a href="https://github.com/Github2k10">Ankit Kumar </a> , &nbsp;
          <a href="https://github.com/meghana-raikar">Meghana Raikar</a> ,
          &nbsp;
          <a href="#">Chaitanya narayankar</a> , &nbsp;
          <a href="#">Shrinath</a>
        </h5>
      </footer>
    </div>
  );
}

export default Home