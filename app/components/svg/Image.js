import React from 'react';
import {Image as ImageSVGElement}  from 'react-native-svg';

const Image = ({x = 0, y = 0}) => {
  return (
    <ImageSVGElement x={x} y={y} href={require(`../../assets/png/soccerBackground.png`)} />
  );
};

Image.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

export default Image;
