import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import PaymentBlock from "./Sections/PaymentBlock";
import { Typography } from "antd";
const { Title } = Typography;

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowCart, setShowCart] = useState(false);

  useEffect(() => {
    let cartItems = [];
    // 1. 로그인한 유저의 카트 필드에 한개 이상의 데이터가 있다면
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        setShowCart(true);
        // 2. cartItems 배열에 각 카트 필드 내 work id 정보 삽입
        props.user.userData.cart.forEach((cartItem) => {
          cartItems.push(cartItem.id);
        });

        // cart 내 qunatity 정보를 전달하기 위해 ~~.cart도 함께 전달
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            console.log("getCartItems / response.payload", response.payload);
            // State에 변화가 발생한 후의 값을 가지고 추가적인 작업을 할 때, 다음과 같이
            // promise를 사용하여 비동기적으로 처리한다
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let totalPrice = 0;

    cartDetail.forEach((cart, index) => {
      totalPrice += cart.price * cart.quantity;
    });
    setTotal(totalPrice);
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto", textAlign: "center" }}>
      <Title level={2}> 장바구니 </Title>
      {ShowCart ? (
        <div>
          <UserCardBlock works={props.user.cartDetail} />
          <h2>합계: {Total}만원</h2>
          <PaymentBlock cartDetail={props.user.cartDetail} />
        </div>
      ) : (
        <div>
          <h2>장바구니가 비어있습니다</h2>
        </div>
      )}
    </div>
  );
}

export default CartPage;
