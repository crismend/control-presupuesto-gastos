import React from 'react'

export const Mensaje = ({children, tipo}) => {
  return (
    // alerta clase de css
    <div className={`alerta ${tipo}`}>{children} </div>
  )
}
