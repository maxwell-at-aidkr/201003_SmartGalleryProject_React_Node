import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import axios from "axios";
import WorkInfo from "./Sections/WorkInfo";
import WorkImage from "./Sections/WorkImage";

function DetailWorkPage(props) {
  const [Work, setWork] = useState([]);
  const workId = props.match.params.workId;

  useEffect(() => {
    axios
      .get(`/api/works/work_by_id?id=${workId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data", response.data);
          setWork(response.data.workDetailInfo[0]);
          alert("해당 작품에 대한 정보를 가져오는데 성공했습니다");
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
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <WorkImage detail={Work} />
        </Col>
        <Col lg={12} xs={24}>
          <WorkInfo detail={Work} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailWorkPage;
