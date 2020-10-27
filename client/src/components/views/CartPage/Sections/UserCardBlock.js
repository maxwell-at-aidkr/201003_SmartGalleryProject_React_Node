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
        <td>{work.quantity} EA</td>
        <td>$ {work.price}</td>
        <td>
          <button>Remove</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Work Image</th>
            <th>Work Quantity</th>
            <th>Work Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
