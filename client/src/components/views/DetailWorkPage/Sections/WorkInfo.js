import React from "react";
import { Descriptions } from "antd";

function WorkInfo(props) {
  return (
    <div>
      <br />
      <br />
      <Descriptions title="작품정보" bordered>
        <Descriptions.Item label="가격($)">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="판매수">
          {props.detail.sold}
        </Descriptions.Item>
        <Descriptions.Item label="조회수">
          {props.detail.views}
        </Descriptions.Item>
        <Descriptions.Item label="작품설명">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default WorkInfo;
