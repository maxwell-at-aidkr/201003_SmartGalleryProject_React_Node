import React, { useState, useRef } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function App() {
  // inputs init state
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  // destructure inputs
  const { username, email } = inputs;

  // onChange: 기존 객체 복사 후 새로 입력된 값 추가
  const onChange = (e) => {
    setInputs({
      // TODO: ...inputs 풀어쓰면?
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // users init state
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ]);

  const nextId = useRef(4);
  // coCreate:
  const onCreate = () => {
    // input 값으로 user 객체 content 생성
    const user = {
      id: nextId.current,
      // TODO: 풀어써보자
      username,
      email,
    };
    // users state update
    setUsers([...users, user]);
    // inputs state update(-> init)
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
