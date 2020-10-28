import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Typography } from "antd";
const { Title } = Typography;

function LandingPage() {
  const [Works, setWorks] = useState([]);

  useEffect(() => {
    axios.post("/api/works/getWorks").then((response) => {
      if (response.data.success) {
        setWorks(response.data.workInfo);
      } else {
        alert("모든 작품 정보를 가져오는데 실패했습니다");
      }
    });
  }, []);

  const renderCard = Works.map((work, index) => {
    return (
      <Col lg={8} md={8} xs={24} key={index}>
        <Card
          key={index}
          cover={
            <a href={`/work/${work._id}`}>
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={work.WorkImages[0]}
              />
            </a>
          }
        >
          <Meta title={work.title} description={`$${work.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>작품 목록</Title>
        <br />
      </div>
      {/* Filter */}
      {/* Search */}
      <Row gutter={[16, 16]}>{renderCard}</Row>
    </div>
  );
}

export default LandingPage;
