import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input, Select } from "antd";
import FileUpload from "./../../utils/FileUpload";
import axios from "axios";
const { Title } = Typography;
const { TextArea } = Input;

function UploadWorkPage(props) {
  const [WorkTitle, setWorkTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Genre, setGenre] = useState(1);
  const [Images, setImages] = useState([]);

  const Genres = [
    { key: 1, value: "Photo" },
    { key: 2, value: "Painting" },
    { key: 3, value: "Contemporary Art" },
  ];

  const handleChangeWorkTitle = (event) => {
    setWorkTitle(event.currentTarget.value);
  };
  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.currentTarget.value);
  };
  const handleChangeGenre = (event) => {
    setGenre(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!WorkTitle || !Description || !Price || !Genre || !Images) {
      return alert("모든 값을 입력하세요");
    }

    const body = {
      writer: props.user.userData._id,
      title: WorkTitle,
      description: Description,
      price: Price,
      images: Images,
      genre: Genre,
    };

    axios.post("/api/works/uploadWork", body).then((response) => {
      console.log(response);
      if (response.data.success) {
        alert("작품 업로드에 성공했습니다");
        props.history.push("/");
      } else {
        alert("작품 업로드에 실패했습니다");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 작품 업로드 </Title>
      </div>
      <Form>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={handleChangeWorkTitle} value={WorkTitle} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={handleChangeDecsription} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={handleChangePrice} value={Price} />
        <br />
        <br />
        <select onChange={handleChangeGenre} value={Genre}>
          {Genres.map((genre) => (
            // Genre State 값이 숫자이므로 value에 genre.key 삽입
            <option key={genre.key} value={genre.key}>
              {genre.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>확인</Button>
      </Form>
    </div>
  );
}

export default UploadWorkPage;
