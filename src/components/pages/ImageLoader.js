import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
const ImageLoader = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <div
      style={{
        width: "100%",
        height: "10rem",
        objectFit: "cover",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
      }}
    >
      {loading ? (
        <>
          <Skeleton
            variant="rectangular"
            className="skelet  "
            style={{
                      width: "100%",
                      height: "10rem",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
          />
        </>
      ) : (
        <img
          src={imageUrl}
          alt={""}
          loading="lazy"
          style={{
            width: "100%",
            height: "10rem",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
      )}
    </div>
  );
};

export default ImageLoader;
