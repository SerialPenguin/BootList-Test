import { useNavigate } from "react-router-dom";


function  LogOutBtn({ setLoggedIn, setUsername }){
const navigate = useNavigate();

      const handleLogout = () => {
          setLoggedIn(false);
          setUsername("");
          sessionStorage.removeItem("Token"); // Remove token from session storage
          navigate("/");
        };

    return <button onClick={handleLogout}>Logout</button>
  }


  export default LogOutBtn;

