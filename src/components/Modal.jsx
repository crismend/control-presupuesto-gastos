import { useEffect, useState } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import { Mensaje } from './Mensaje'


const Modal = ({ setModal, animarModal, setAnimarModal , guardarGasto, gastoEditar, setGastoEditar}) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')


  
  useEffect(() => {
    if(Object.keys(gastoEditar).length >0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
    
  }, [])

  const ocultarModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 400)
  }
  

   const handleSubmit = (e) => {
    e.preventDefault()
    if ([nombre, cantidad, categoria].includes('') ) {
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      },3000)
      return
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }


  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={cerrarBtn}
          alt="cerrar modal"
          onClick={ocultarModal}
        />
      </div>

      
      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar': 'cerrar'}`}>
        <legend>{gastoEditar.nombre ? 'Editando Gasto' : 'Nuevo Gasto'}</legend>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor="nombre">Nombre del Gasto</label>
          <input 
          type="text" 
          name="nombre" 
          id="nombre" 
          placeholder='Añade el Nombre del Gasto'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>
          <input 
          type="number" 
          name="cantidad" 
          id="cantidad" 
          placeholder='Añade la cantidad del gasto: eje. 300'
          value={cantidad}
          onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className='campo'>
          <label htmlFor="categoria">Categoria</label>

          <select 
          name="categoria" 
          id="categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- seleccione --</option>
            <option value="ahorro">-- Ahorro --</option>
            <option value="comida">-- comida --</option>
            <option value="casa">-- casa --</option>
            <option value="gastos">-- gastos Varios --</option>
            <option value="ocio">-- ocio --</option>
            <option value="salud">-- salud --</option>
            <option value="suscripciones">-- suscripciones --</option>
          </select>
        </div>
        <input 
        type="submit" 
        value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>

    </div> 
  )
}

export default Modal