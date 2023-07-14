import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {

    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado

    //calcular porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    

    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)

  }, [gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('Deseas reiniciar toda la aplicacion')
    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    } else {
      
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#16a83f',
            trailColor: '#e9e7e7',
            textColor: porcentaje > 100 ? '#DC2626' : '#16a83f',
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className='contenido-presupuesto'>
        <button 
        className='reset-app'
        onClick={handleResetApp}
        >
          Reset App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>

    </div>
  )
}
