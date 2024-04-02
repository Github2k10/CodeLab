import React, { useState } from "react";
import "./editorPage.scss";
import logo from "/src/assets/logo.png";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "meghana" },
    { socketId: 2, username: "Ankit " },
    { socketId: 3, username: "shrinath" },
    { socketId: 4, username: "chaitanya" }
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          {/* logo div */}
          <div className="logo">
            <img className="logoImage" src={logo} alt="logo" />
          </div>
          <h3>Connected</h3>

          {/* participants div */}
          <div className="clientsList">
            {
              clients.map ((client) => (
                  <Client key={client.socketId} username = {client.username} />

              ))
            }


          </div>
        </div>

      <button className="btn copyBtn">Copy Room Id</button>
      <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap"> 
      <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
