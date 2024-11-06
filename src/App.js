import "./App.css";
import React, { useState, useEffect } from "react";
import CreateUser from "./components/createUser";
import { fetchMultipleGithubUsers } from "./components/githubAPI";

function App() {
  const [users, setUsers] = useState([]);

  // mock data
  const [usernames, setUsernames] = useState([
    "mojombo",
    "defunkt",
    "pjhyett",
    "wycats",
    "evanphx",
    "linghu",
    "brynary",
    "davetang",
  ]);

  // fetch github users start
  useEffect(() => {
    const fetchUsers = async () => {
      const userDataArray = await fetchMultipleGithubUsers(usernames);
      const userObject = userDataArray.map((user) => ({
        id: user.id,
        name: user.name,
        email: `${user.login}@gmail.com`,
        age: Math.floor(Math.random() * (60 - 19) + 19),
        status: user.side_admin ? "Active" : "Inactive",
      }));
      setUsers(userObject);
    };
    fetchUsers();
  }, [usernames]);
  // fetch github user end

  // render new user start
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setNewUser(storedUsers);
  }, []);
  // render new user end

  return (
    <>
      {/* header & title*/}
      <header className="App-header">
        <h1>DataTech</h1>
      </header>

      {/* main content start */}

      <main>
        {/* filter, sort, new user handler */}
        <div>
          <form>
            <input type="search" id="query" placeholder="Search..." />
            <button>Search</button>
          </form>
          <button>Sort</button>
        </div>

        {/* githubAPI users table start */}
        <h2>Github Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* map user by id */}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* githubAPI users table end */}

        {/* new user table start */}
        <h2>New Users</h2>
        <button
          id="open-dialog"
          onClick={() => document.querySelector("dialog").showModal()}
        >
          Add User
        </button>
        <dialog>
          <CreateUser />
        </dialog>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {newUser.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* new user table end */}
      </main>

      {/* main content end */}
    </>
  );
}

export default App;
