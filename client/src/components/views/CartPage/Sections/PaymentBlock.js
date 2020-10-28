import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { onSuccessBuy } from "../../../../_actions/user_actions";
import { withRouter } from "react-router-dom";

function PaymentBlock(props) {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    console.log("clickhandler", props.cartDetail);
    const paymentID = `${
      parseInt(Date.now()) * parseInt(props.cartDetail.length)
    }_${props.cartDetail[0]._id}`;
    dispatch(
      onSuccessBuy({
        cartDetail: props.cartDetail,
        paymentID: paymentID,
      })
    ).then((response) => {
      console.log("response", response);
      if (response.payload.success) {
        alert("성공적으로 결제되었습니다");
        props.history.push("/login");
      }
    });
  };

  return (
    <div>
      <Button type="primary" onClick={onClickHandler}>
        결제하기
      </Button>
    </div>
  );
}

export default withRouter(PaymentBlock);
