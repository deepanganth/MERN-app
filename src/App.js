import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, SetListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get("https://github.com/deepanganth/MERN-app/getUsers").then((response) => {
      SetListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("https://github.com/deepanganth/MERN-app/createUser", {
      name,
      age,
      username: user,
    }).then((response) => {
      SetListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username: user,
        },
      ]);
    });
  };

  return (
    <div className="section-1">
      <div className="display-users">
        {listOfUsers.map((user) => {
          return (
            <div className="user-list">
              <p>ID:{user._id}</p>
              <p>Name:{user.name}</p>
              <p>Age:{user.age}</p>
              <p>User Name:{user.username}</p>
              <p>------------------------------</p>
            </div>
          );
        })}
      </div>
      <div className="input-user">
        <input
          type="text"
          placeholder="name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
        <button onClick={createUser}>create user</button>
      </div>
    </div>
  );
}

export default App;
