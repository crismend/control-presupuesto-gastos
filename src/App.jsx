import { useEffect, useState } from "react"
import Header from "./components/Header"
import iconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal"
import { generarId } from "./helpers"
import ListadoGastos from "./components/ListadoGastos"
import FiltrosGastos from "./components/FiltrosGastos"


function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
    )
    const [gastos, setGastos] = useState(
      localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
      )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if(Object.keys(gastoEditar).length >0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 300)
    }
  }, [gastoEditar])

  // almacenando el presupuesto en LS
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // almacenando los gastos en LS 
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  

  useEffect(() => {
    if (filtro) {
      //filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  


  
  useEffect(() => {
    //si no lo encuentra su valor es de 0
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id
        ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
    } else {
      // nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const eliminarGasto =(id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {/* si es un presupuesto valido mostramos el boton de agregar gasto */}
      {isValidPresupuesto && (
        <>
          <main>
            <FiltrosGastos
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}


      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

    </div>
  )
}

export default App
