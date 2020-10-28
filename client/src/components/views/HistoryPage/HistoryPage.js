import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>구매내역</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>구매일자</th>
            <th>작품이름</th>
            <th>주문수량</th>
            <th>구매액</th>
            <th>주문번호</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <td>{item.dateOfPurchase}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.paymentID}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
