
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className='listado-gastos contenedor'>


      {
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'gastos' : 'no hay gastos '}</h2>
            {gastosFiltrados.map(gasto => (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'gastos' : 'no hay gastos '}</h2>
            {gastos.map(gasto => (
            <Gasto
              gasto={gasto}
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
          
        )
      }

    </div>
  )
}

export default ListadoGastos