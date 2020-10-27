import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";

function CartPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItems = [];
    // 1. 로그인한 유저의 카트 필드에 한개 이상의 데이터가 있다면
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        // 1-1. cartItems 배열에 각 카트 필드 내 work id 정보 삽입
        props.user.userData.cart.forEach((cartItem) => {
          cartItems.push(cartItem.id);
        });
      }

      // cart 내 qunatity 정보를 전달하기 위해 ~~.cart도 함께 전달
      dispatch(getCartItems(cartItems, props.user.userData.cart));
    }
  }, [props.user.userData]);

  return <div>CartPage</div>;
}

export default CartPage;
