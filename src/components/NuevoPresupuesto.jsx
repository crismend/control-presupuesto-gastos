import { useState } from "react"
import { Mensaje } from "./Mensaje"


const NuevoPresupuesto = ({presupuesto, setPresupuesto,  setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')


  const handlePresupuesto = (e) => {
    e.preventDefault();

    //si no hay presupuesto o si es menor a cero
    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto valido')

      return
    } 
      setMensaje('')
      setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'> 
          <label>Definir Prsupuesto</label>
          <input 
          type="number" 
          className='nuevo-presupuesto'
          placeholder='Añade tu Presupuesto'
          value={presupuesto}
          onChange={e => setPresupuesto(Number(e.target.value)) }
          />
        </div>
        <input type="submit" value='Añadir' />

        {/* mostrando mensaje error */}
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto