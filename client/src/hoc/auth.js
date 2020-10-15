import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { withRouter } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 안한 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        // 로그인 한 상태  
        } else {
          // 로그인 했지만 관리자만 들어갈 수 있는 페이지에 들어가려 할 때
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            // 로그인한 유저가 출입 불가능한 페이지에 들어갈 때
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return withRouter(AuthenticationCheck);
}
