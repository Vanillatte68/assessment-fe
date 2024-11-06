import { useState } from "react";
import { useLocalStorage } from "./userStorage";
import "../App.css";
function closeModal() {
  document.querySelector("dialog").close();
  document.querySelector("form").reset();
}
function validate() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  if (name === "" || email === "" || age === "" || !inputValidate()) {
    alert("Please fill in all fields");
    return false;
  } else {
    return true;
  }
}
function inputValidate() {
  const email = document.getElementById("email").value;
  const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const errorMsg = document.getElementById("errorMsg");
  if (!regexEmail.test(email)) {
    errorMsg.style.display = "block";
    return false;
  } else {
    errorMsg.style.display = "none";
    return true;
  }
}
const CreateUser = () => {
  // user data state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [userList, setUserList] = useLocalStorage("users", []);
  // submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      age: age,
      status: "Active",
    };
    setUserList([...userList, newUser]);
    console.log(newUser);
    closeModal();
  };
  return (
    <div>
      {/* new user form start */}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          onKeyUp={inputValidate}
        />
        <span className="errorMsg" id="errorMsg">
          Invalid email address
        </span>
        <label>Age</label>
        <input
          id="age"
          type="number"
          placeholder="Age"
          value={age}
          required
          onChange={(event) => setAge(event.target.value)}
        />
        <div className="btnContainer">
          <button id="btnSubmit" type="submit">
            Add User
          </button>
          <button
            type="reset"
            onClick={() => {
              setName("");
              setEmail("");
              setAge("");
            }}
          >
            Reset
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
      {/* new user form end */}
    </div>
  );
};
export default CreateUser;
