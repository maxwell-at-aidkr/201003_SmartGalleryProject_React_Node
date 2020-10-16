import React, { useState, useEffect } from "react";
import { Typography, Button, Form, Input } from "antd";
import Icon from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

function WorkUploadPage() {
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };
  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };
  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios.post("/api/work/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        alert("success to save the work in server");
      } else {
        alert("failed to save the work in server");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Work </Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={handleChangeDecsription} value={Description} />
        <br />
        <br />

        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default WorkUploadPage;
