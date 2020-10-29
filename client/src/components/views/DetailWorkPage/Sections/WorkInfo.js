import React from "react";
import { useDispatch } from "react-redux";
import { Button, Descriptions } from "antd";
import { addToCart } from "../../../../_actions/user_actions";

function WorkInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addToCart(props.detail._id));
    alert("장바구니에 담겼습니다");
  };

  return (
    <div>
      <br />
      <br />
      <Descriptions title="작품정보" bordered>
        <Descriptions.Item label="가격">
          {props.detail.price}만원
        </Descriptions.Item>
        <Descriptions.Item label="판매수">
          {props.detail.sold}개
        </Descriptions.Item>
        <Descriptions.Item label="조회수">
          {props.detail.views}
        </Descriptions.Item>
        <Descriptions.Item label="작품설명">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={clickHandler}>장바구니 담기</Button>
      </div>
    </div>
  );
}

export default WorkInfo;
