import { useState } from "react";
import Button from "./Button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Params {email, password}
  // Set userState to the user found in db
  const checkUser = async (credentials) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const allUsers = response.data;
      const userFound = allUsers.find(
        (user) => user.email == credentials.email
      );

      if (userFound && userFound.password === credentials.password) {
        setUser(userFound);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };
  //updates newEmail when user types
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(
      await checkUser({
        email: "ana@test.com",
        password: "password",
      })
    );

    // succesful submission
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button class="login-button" type="submit" text="Login" />
      </form>
    </div>
  );
};

export default Login;
