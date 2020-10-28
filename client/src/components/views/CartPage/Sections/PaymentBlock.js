import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { onSuccessBuy } from "../../../../_actions/user_actions";

function PaymentBlock(props) {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    console.log("clickhandler", props.cartDetail);

    dispatch(
      onSuccessBuy({
        cartDetail: props.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        console.log("성공적으로 결제되었습니다");
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

export default PaymentBlock;
