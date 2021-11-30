import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const  imageUrl = product ?`${API}product/photo/${product._id}` : `https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&h=750&w=1260`
  return (
    <img
      src={imageUrl}
      alt="photo"
      style={{ maxHeight: "100%", maxWidth: "100%", 
      width:!process.env.REACT_APP_IS_LOCAL_INSTANCE == "true" ?"154.77px":"195.83px", height:!process.env.REACT_APP_IS_LOCAL_INSTANCE == "true" ?"110.14px":"281.41px" 
    }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
