import React from 'react'

const SliderLeftArrow = ({ prevSlide }) => {
  return (
    <span className="sliderLeftArrow" onClick={prevSlide}>leftArrow</span>
  )
}

export default SliderLeftArrow
