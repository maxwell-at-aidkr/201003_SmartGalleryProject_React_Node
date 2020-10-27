import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">
          <HomeOutlined style={{ fontSize: "25px", paddingTop: "10px" }} />
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
