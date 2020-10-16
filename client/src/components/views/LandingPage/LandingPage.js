import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {
  const [Works, setWorks] = useState([]);

  useEffect(() => {
    axios.get("/api/work/getWorks").then((response) => {
      if (response.data.success) {
        console.log(response.data.works);
        setWorks(response.data.works);
      } else {
        alert("Failed to get Works");
      }
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  const renderCards = Works.map((work, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/work/${work._id}`}>
            <img
              style={{ width: "100%" }}
              alt="work"
              src={`http://localhost:5000/${work.filePath}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span></span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          // avatar={<Avatar src={work.writer.image} />}
          title={work.title}
        />
        {/* <span>{work.writer.name} </span> */}
        <br />
        {/* <span style={{ marginLeft: "3rem" }}> {work.views}</span>-{" "}
        <span> {moment(work.createdAt).format("MMM Do YY")} </span> */}
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <button onClick={onClickHandler}>Log out</button>
      <Title level={2}> Works List </Title>
      <hr />
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default withRouter(LandingPage);
