import React from 'react'

const Dot = ({ id, active, dotClick }) => {
  const name = active ? 'active' : null
  return (
    <div data-id={id}
      className={'dot ' + name}
      onClick={ee => dotClick(parseInt(ee.target.getAttribute('data-id'), 10))}>
    </div>
  )
}

export default Dot
