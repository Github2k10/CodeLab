import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const EditorHelper = () => {
  const navigate = useNavigate();
  const roomId = uuidV4();

  useEffect(() => {
    navigate(`/editor/${roomId}`);
  }, []);
  return <></>;
};

export default EditorHelper;
