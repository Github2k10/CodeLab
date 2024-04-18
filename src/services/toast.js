import toast from "react-hot-toast";

const notify = (message) =>
  toast(message, {
    duration: 2000,
    position: "top-center",
    style: {
      backgroundColor: "#5f5fff",
      color: "white",
      width: "250px",
    },
  });

export default notify