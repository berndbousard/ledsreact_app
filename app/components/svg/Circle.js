import React from 'react';
import {Circle as CircleSVGElement}  from 'react-native-svg';

const Circle = ({cx, cy, r, fill = `rgb(0, 0, 0)`}) => {
  return (
    <CircleSVGElement cx={cx} cy={cy} r={r} fill={fill} />
  );
};

Circle.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  r: React.PropTypes.number,
  fill: React.PropTypes.string,
};

export default Circle;
