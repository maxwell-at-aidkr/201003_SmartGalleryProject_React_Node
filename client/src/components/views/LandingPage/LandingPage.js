import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function LandingPage() {
  const [Works, setWorks] = useState([]);

  useEffect(() => {
    axios.post("/api/works/getWorks").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setWorks(response.data.workInfo);
        alert("모든 작품 정보를 가져오는데 성공했습니다");
      } else {
        alert("모든 작품 정보를 가져오는데 실패했습니다");
      }
    });
  }, []);

  const renderCard = Works.map((work, index) => {
    console.log("work", work);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          key={index}
          cover={
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${work.WorkImages[0]}`}
            />
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
        <h2>Work List</h2>
      </div>
      {/* Filter */}
      {/* Search */}
      <Row gutter={[16, 16]}>{renderCard}</Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
