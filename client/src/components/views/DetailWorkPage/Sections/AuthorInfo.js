import React, { useState, useEffect } from "react";
import { Typography } from "antd";
const { Title } = Typography;

function AuthorInfo(props) {
  const [AuthorImage, setAuthorImage] = useState([]);
  useEffect(() => {
    setAuthorImage(props.detail.AuthorImage);
  }, [props.detail.AuthorImage]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "5% 0 0 0",
        }}
      >
        <Title level={4}>작가: {props.detail.author}</Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          alt={"작가 이미지"}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "500px",
            maxHeight: "500px",
            padding: "0 5% 0 0 ",
          }}
          src={AuthorImage}
        />
      </div>
    </div>
  );
}

export default AuthorInfo;
