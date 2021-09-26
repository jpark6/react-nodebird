import React, { useCallback, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface PostImagesProps {
  images: {src: string}[];
}
export default function PostCard({ images } : PostImagesProps): JSX.Element {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const showMoreDivStyle = useMemo(() => ({
    display: 'inline-block',
    width: '50%',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
    cursor: 'pointer',
  }), []);
  const onZoom = useCallback (() => {
    setShowImageZoom(true);
  }, []);

  const drawImages = useCallback(() => {
    switch(images.length) {
      case 1:
        return (
            <img
              role="presentation"
              src={images[0].src}
              alt={images[0].src}
              onClick={onZoom}
              style={{ width: '100%' }}
            />
        );
      case 2:
        return (
          <>
            <img
              role="presentation"
              src={images[0].src}
              alt={images[0].src}
              onClick={onZoom}
              style={{ width: '50%' }}
            />
            <img
              role="presentation"
              src={images[1].src}
              alt={images[1].src}
              onClick={onZoom}
              style={{ width: '50%' }}
            />
          </>
        );
      default:
        return (
          <>
            <img
              role="presentation"
              src={images[0].src}
              alt={images[0].src}
              onClick={onZoom}
              width="50%"
            />
            <div
              role="presentation"
              style={showMoreDivStyle}
              onClick={onZoom}
            >
              <PlusOutlined />
              <br />
              {images.length -1 } 개의 사진 더 보기
            </div>
          </>
        );
    }
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {drawImages()}
    </div>
  );
}
