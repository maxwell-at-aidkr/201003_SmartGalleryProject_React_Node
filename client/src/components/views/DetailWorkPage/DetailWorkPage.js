import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import axios from "axios";
import WorkInfo from "./Sections/WorkInfo";
import WorkImage from "./Sections/WorkImage";
import AuthorInfo from "./Sections/AuthorInfo";

function DetailWorkPage(props) {
  const [Work, setWork] = useState([]);
  const workId = props.match.params.workId;

  useEffect(() => {
    axios
      .get(`/api/works/works_by_id?id=${workId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data", response.data);
          setWork(response.data.workDetailInfo[0]);
        } else {
          alert("해당 작품에 대한 정보를 가져오는데 실패했습니다");
        }
      });
  }, []);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Work.title}</h1>
      </div>
      <Row>
        <Col lg={24} xs={24}>
          <WorkImage detail={Work} />
        </Col>
        <Col lg={24} xs={24}>
          <AuthorInfo detail={Work} />
        </Col>
        <Col lg={24} xs={24}>
          <WorkInfo detail={Work} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailWorkPage;
