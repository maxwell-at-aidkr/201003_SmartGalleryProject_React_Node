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

  // onChange: inputs 상태 관리, inputs 기존 객체 복사 후 새로 입력된 값 추가
  const onChange = (e) => {
    setInputs({
      // TODO: ...inputs 풀어쓰면?
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const nextId = useRef(4);

  // onCreate: 입력값으로 user 객체 content 생성 후 기존 객체에 추가, input 값 설정
  const onCreate = () => {
    const user = {
      id: nextId.current,
      // TODO: 풀어쓰면?
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
