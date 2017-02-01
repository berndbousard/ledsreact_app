import React from 'react';
import {Path as PathSVGElement}  from 'react-native-svg';

const Path = ({d, fill = `none`, stroke = `black`, strokeWidth = `3`}) => {
  return (
    <PathSVGElement d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
  );
};

Path.propTypes = {
  d: React.PropTypes.string,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
  strokeWidth: React.PropTypes.number,
};

export default Path;