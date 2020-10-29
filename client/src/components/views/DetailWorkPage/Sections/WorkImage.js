import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function WorkImage(props) {
  const [GalleryWorkImages, setGalleryWorkImages] = useState([]);

  console.log("props.detail", props.detail);
  useEffect(() => {
    let images = [];
    if (props.detail.WorkImages && props.detail.WorkImages.length > 0) {
      props.detail.WorkImages.forEach((image) => {
        images.push({
          original: image,
          thumbnail: image,
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
