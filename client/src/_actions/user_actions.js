import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
} from "./types";
import { USER_SERVER, WORK_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    workId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${WORK_SERVER}/works_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      // Work Collection에서 CartItem 정보를 가져와서
      // response.data.workDetailInfo 내 Quantity 필드를 추가해서 삽입
      userCart.forEach((cartItem) => {
        response.data.workDetailInfo.forEach((workDetail, index) => {
          if (cartItem.id === workDetail._id) {
            response.data.workDetailInfo[index].quantity = cartItem.quantity;
          }
        });
      });
      return response.data.workDetailInfo;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}
