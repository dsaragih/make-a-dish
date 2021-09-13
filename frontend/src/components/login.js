import React, { useState } from 'react'
import UserDataService from '../services/user';

function Login (props) {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [register, setRegister] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  
  const login = () => {
    UserDataService.getUser(user.name)
    .then(res => {
      console.log(res.data)
      if (register) {
        if (res.data.count.length === 0) {
          props.login(user);
  
          const data = {
            name: user.name,
            user_id: user.id
          }
  
          UserDataService.registerUser(data)
          .then(res => {
          })
          .catch(e => console.error(e))
  
          props.history.push('/')
        } else {
          console.log(res.data)
          alert("username is unavailable")
        }
      } else {
        if (res.data.count.length === 0) {
          alert("user does not exist")
        } else {
          if (user.id === res.data.count[0].user_id) {
            props.login(user);
            props.history.push('/')
          } else {
            alert("ID is incorrect");
          }
        }
      }
    })
    .catch(e => console.error(e))
  }

  return (
    <div className="submit-form">
      {register && (
        <h4>Register</h4>
      )}
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>
        <button onClick={login} className="mt-3 btn btn-success">
          Login
        </button>
        <div className="mt-3">
          If you don't have an account click the button below to register
        </div>
        <button style={{backgroundColor: "transparent"}} onClick={() => setRegister(true)}>Register</button> 
      </div>
    </div>
  );
};

export default Login;