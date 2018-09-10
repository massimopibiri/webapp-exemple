import React from 'react'

const Slide = ({ listItem }) => {
  const styles = {
    backgroundImage: `url(${listItem})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  }
  return <div className={'slide slideWidth'} style={styles}></div>
}

export default Slide
