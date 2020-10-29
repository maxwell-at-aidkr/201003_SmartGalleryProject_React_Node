import React from "react";
import "./UserCardBlock.css";

function UserCardBlock(props) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return image;
    }
  };

  const renderItems = () =>
    props.works &&
    props.works.map((work, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="work"
            src={renderCartImage(work.WorkImages)}
          />
        </td>
        <td>{work.quantity}개</td>
        <td>{work.price}만원</td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>작품 이미지</th>
            <th>구매 수량</th>
            <th>가격</th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
