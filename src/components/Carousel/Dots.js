import React from 'react'
import Dot from './Dot'

const Dots = ({index, quantity, dotClick}) => {
  const dots = [];
  for (let ii = 0; ii < quantity; ii++) {
    const isActive = ii === index ? true : false;
    dots.push(
      <Dot
        key={ii}
        id={ii}
        active={isActive}
        dotClick={dotClick}
      />
    );
  }
  return (
    <div className="dotsContainer">
      { dots }
    </div>
  )
}
export default Dots
