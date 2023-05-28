import { useNavigate } from "react-router-dom";


function RegisterBtn (){
const navigate = useNavigate();

const handleRegister = (username) => {
    navigate("/auth/register")

  }
  return <button onClick={handleRegister}>Register</button>
};
  export default RegisterBtn;