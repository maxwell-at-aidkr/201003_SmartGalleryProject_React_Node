import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  // Redux 활용 setup
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // submit의 default로 설정된 action을 제거해야 이하 로직을 실행시킬 수 있음
    event.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    // Redux 활용 step 1: dispatch로 action(loginUser(body)) 전달
    dispatch(loginUser(body)).then((response) => {
      // loginSuccess 메세지 확인 후 시작페이지로 이동
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("failed to login");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
