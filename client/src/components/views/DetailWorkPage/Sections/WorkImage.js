import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function WorkImage(props) {
  const [GalleryWorkImages, setGalleryWorkImages] = useState([]);
  let images = [];
  console.log("props.detail", props.detail);
  useEffect(() => {
    if (props.detail.WorkImages && props.detail.WorkImages.length > 0) {
      props.detail.WorkImages.map((image) => {
        images.push({
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        });
      });
    }
    setGalleryWorkImages(images);
  }, [props.detail.WorkImages]);

  return (
    <div>
      <ImageGallery items={GalleryWorkImages} />
    </div>
  );
}

export default WorkImage;
