import React, { useState, useEffect } from "react";
import { Typography } from "antd";
const { Title } = Typography;

function HistoryPage(props) {
  const [ShowHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (props.user.userData && props.user.userData.history.length > 0) {
      setShowHistory(true);
    }
  }, [props.user.userData]);

  return (
    <div style={{ width: "80%", margin: "3rem auto", textAlign: "center" }}>
      <Title level={2}> 구매내역 </Title>
      {ShowHistory ? (
        <table>
          <thead>
            <tr>
              <th>구매일자</th>
              <th>작품이름</th>
              <th>주문수량</th>
              <th>금액</th>
              <th>주문번호</th>
            </tr>
          </thead>

          <tbody>
            {props.user.userData &&
              props.user.userData.history &&
              props.user.userData.history.map((item, index) => (
                <tr key={index}>
                  <td>{item.dateOfPurchase}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}개</td>
                  <td>{item.price}만원</td>
                  <td>{item.paymentID}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>구매내역이 없습니다</h2>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
