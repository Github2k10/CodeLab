import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Toaster } from "react-hot-toast";

import notify from "../../services/toast";
import initSocket from "../../services/socket";
import style from "./Editor.module.scss";
import NavBar from "../NavBar/NavBar";

const EditorLayout = () => {
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const [code, setCode] = useState("// here is your code...");
  const editorDidMount = useCallback((editor, monaco) => {
    editor.focus();
  }, []);
  document.title = "Editor";

  const { roomId } = useParams();
  const username = document.cookie.split(";")[1].split("=")[1];

  const handleErrors = (e) => {
    console.log("socket error", e);
    notify("Socket connection failed, try again later.");
    // navigate("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit("JOIN", { roomId, username });

      socketRef.current.on("JOINED", ({ code, clients }) => {
        console.log(clients);
        setCode(code);
      });

      socketRef.current.on("code change", ({ newCode }) => {
        setCode(newCode);
      });

      socketRef.current.on("disconnected", ({ username }) => {
        console.log(username);
      });
    };

    init();

    window.addEventListener("beforeunload", leave);

    return () => {
      window.removeEventListener("beforeunload", leave);
    };
  }, []);

  const leave = () => {
    if (socketRef.current) {
      socketRef.current.emit("leave", roomId);
    }
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const onChange = (newValue) => {
    setCode(newValue);
    if (socketRef.current) {
      socketRef.current.emit("code change", { roomId, newCode: newValue });
    }
  };
  return (
    <>
      <NavBar />

      <div className={style.editor}>
        <Editor
          width="100%"
          height="calc(100vh - 70px)"
          language="javascript"
          theme="vs-light"
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </div>

      <Toaster />
    </>
  );
};

export default EditorLayout;
