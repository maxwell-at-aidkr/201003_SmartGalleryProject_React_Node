import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  UploadOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  // 로그아웃 상태의 Right Menu
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">
            <LoginOutlined style={{ fontSize: "25px", paddingTop: "10px" }} />
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">
            <UserAddOutlined style={{ fontSize: "25px", paddingTop: "10px" }} />
          </a>
        </Menu.Item>
      </Menu>
    );
    // 로그인된 상태의 Right Menu
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="Upload">
          <a href="/work/upload">
            <UploadOutlined style={{ fontSize: "25px", paddingTop: "10px" }} />
          </a>
        </Menu.Item>
        <Menu.Item key="Cart">
          <a href="/user/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "25px", paddingTop: "10px" }}
            />
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>
            <LogoutOutlined style={{ fontSize: "25px", paddingTop: "10px" }} />
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
