import React, { useState } from "react";
import "./home.scss";
import logo from "/src/assets/logo.png";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    //to avoid page reload
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("created a new room");
    // pop up after creating a room
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id & Username is required");
      return;
    }
    //redirect
    navigate(`/editor/${roomId}`, {
      // after redirecting to new page ie from login to editor page ,we can acess the username
      state: {
        username,
      }
    })
  };

//enter key to join
  const handleInputEnter = (e) => {
    if(e.code === 'Enter') {
      joinRoom();
    }

  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src={logo} alt="logo" className="homePageLogo" />
        <h4 className="mainLabel"> Paste Room Id</h4>
        <div className="inputGroup">
          <input
            className="inputBox"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          ></input>
          <input
            className="inputBox"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          ></input>
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
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
          <a href="https://github.com/Github2k10">Ankit Kumar</a> & &nbsp;
          <a href="https://github.com/meghana-raikar">Meghana Raikar</a>
          &nbsp;
          {/* <a href="#">Chaitanya narayankar</a> , &nbsp;
          <a href="#">Shrinath</a> */}
        </h5>
      </footer>
    </div>
  );
};

export default Home;
