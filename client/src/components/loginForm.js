import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please provide a username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("Token", data.accessToken);
        onLogin(username);
        const jwtArray = data.accessToken.split(".");
        const jwtPayload = JSON.parse(atob(jwtArray[1]));
        setUserRole(jwtPayload.role);
        if (jwtPayload.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/books");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginForm({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLoginFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!username || !password) {
//       setError("Please provide a username and password");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         sessionStorage.setItem("Token", data.accessToken);
//         onLogin(username);
//         navigate("/books"); // Navigate to the BookList page
//       } else {
//         setError("Invalid username or password");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("An error occurred while logging in");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleLoginFormSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;