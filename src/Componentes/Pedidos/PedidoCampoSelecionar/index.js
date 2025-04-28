import './PedidoCampoSelecionar.css'

const PedidoCampoSelecionar = (props) => {
  const aoSelecionar = (event) => {
    event.preventDefault()
      props.gravarClienteLabel(event.target.value)
  }

  return (
    <div className='campo-selecionar'>
      <label >{props.label}</label>
      <select  onChange={aoSelecionar} value={props.valor} placeholder={props.placeholder}>
        <option key={props.label}>{props.valorInicial}</option>
        {props.clientes.map( cliente => {
          return <option className='campo-selecionar-option' key={cliente.id} value={cliente.id} >{cliente.nome}</option>})}
      </select>
    </div>
  )
}

export default PedidoCampoSelecionar