import { useState } from "react";
import { Image, Row, Col } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReactBnbGallery from "react-bnb-gallery";
import "react-bnb-gallery/dist/style.css";
import { LoadingOutlined } from "@ant-design/icons";

// Breakpoint widths taken from https://ant.design/components/layout/
const columnsCountBreakPoints = {
  576: 2, // sm
  992: 3, // lg
  1600: 4, // xxl
};

export const transformData = (p, number) => {
  const thumbnail = `https://drive.google.com/thumbnail?id=${p.thumbnail}`;
  // const photo = `https://lh3.googleusercontent.com/d/${p.thumbnail}=s1980`;
  const photo = `https://drive.google.com/uc?export=view&id=${p.thumbnail}`;
  // FIXME: Add sold status?
  const caption = `${p.title} by ${p.artist}`;
  const description = p.description || "Excellent work of art";
  const subcaption = `${description} (Price: ₹ ${p.price})`;
  return {
    ...p,
    photo,
    thumbnail,
    number,
    caption,
    subcaption,
  };
};

export default function PhotoList({ photos, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const openGalleryPhoto = (idx) => {
    setActivePhotoIndex(idx);
    setIsOpen(true);
  };

  return loading ? (
    <LoadingOutlined />
  ) : (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry gutter={4}>
          {photos.map((photo, idx) => (
            <Image
              onClick={() => openGalleryPhoto(idx)}
              alt={photo.caption}
              preview={false}
              src={photo.thumbnail}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <ReactBnbGallery
        activePhotoIndex={activePhotoIndex}
        show={isOpen}
        photos={photos}
        onClose={() => setIsOpen(false)}
        wrap={false}
        opacity="0.95"
        backgroundColor="#000000"
      />
    </>
  );
}
