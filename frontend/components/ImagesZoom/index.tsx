import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from '@emotion/styled';

interface ImagesZoomProps {
  images: {src: string}[];
  onClose: () => void;
}

const SlickWrapper = styled.div`
  height: calc(100%  - 44px);
  background-color: #898989;
  
`;
const Overlay = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  header {
    font-size: 44px;
    background-color: white;
    position: relative;
    padding: 0;
    text-align: center; 
    
    h1 {
      margin: 0;
      font-size: 17px;
      color: #333;
      line-height: 44px;
    }
    Button {
      position: absolute;
      right: 0;
      top: 0;
      padding: 7px;
      line-height: 14px;
      cursor: pointer;
    }
  }
  .slick-prev {
    left: 5px;
  }
  .slick-next {
    right: 5px;
  }
`;

const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  img {
    margin: 0 auto;
    max-height: 350px;
    max-width: 100%;
  }
`;

const Indicator = styled.div`
  text-align: center;
  
  > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: #313131;
    display: inline-block;
    text-align: center;
    color: #fff;
    font-size: 15px;
  }
`;

export default function ImagesZoom({ images, onClose }: ImagesZoomProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slickSettings = useMemo(() => ({
    initialSlide: 0,
    dots: true,
    afterChange: (slide: React.SetStateAction<number>) => setCurrentSlide(slide),
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }), []);
  return (
    <Overlay>
      <header>
        <h1>상세이미지</h1>
        <Button onClick={onClose}>&times;</Button>
      </header>
      <div>
        <SlickWrapper>
          <Slick {...slickSettings}
          >
            { images.map((v) => (
              <ImageWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slick>
        </SlickWrapper>
      </div>
    </Overlay>
  );
}
