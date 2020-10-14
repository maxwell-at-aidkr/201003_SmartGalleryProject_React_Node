import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// Redux 활용 step 3: reducer에서 action.type에 따라 특정 로직 처리 후 next state로 반환(login page 경로가 담긴 request)
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // Redux 활용 step 4: action.payload에 할당된 request문이 실행됨에 따라 loginSuccess에 server response({loginSuccess, user._id})가 저장됨
      // 그리고 return 값이 store에 저장됨
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
