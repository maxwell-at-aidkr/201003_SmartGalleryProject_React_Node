import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import Paypal from "../../utils/Paypal";
function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    let cartItems = [];
    // 1. 로그인한 유저의 카트 필드에 한개 이상의 데이터가 있다면
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        // 2. cartItems 배열에 각 카트 필드 내 work id 정보 삽입
        props.user.userData.cart.forEach((cartItem) => {
          cartItems.push(cartItem.id);
        });
      }

      // cart 내 qunatity 정보를 전달하기 위해 ~~.cart도 함께 전달
      dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
        (response) => {
          // State에 변화가 발생한 후의 값을 가지고 추가적인 작업을 할 때, 다음과 같이
          // promise를 사용하여 비동기적으로 처리한다
          calculateTotal(response.payload);
        }
      );
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let totalPrice = 0;

    cartDetail.forEach((cart, index) => {
      totalPrice += cart.price * cart.quantity;
      console.log("totalPrice", totalPrice);
    });
    setTotal(totalPrice);
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock works={props.user.cartDetail} />
        <h2>Total Amount: ${Total}</h2>
        <Paypal total={Total} />
      </div>
    </div>
  );
}

export default CartPage;
