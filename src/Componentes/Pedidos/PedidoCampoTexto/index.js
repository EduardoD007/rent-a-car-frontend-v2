import './PedidoCampoTexto.css'

const PedidoCampoTexto = (props) => {

  const aoDigitar = (event) => {
    props.aoAlterar(event.target.value)
  }

  return (
    <div className='campo-texto'>
      <label >{props.label}</label>
      <input value={props.valor} onChange={aoDigitar} placeholder={props.placeholder} required></input>
    </div>
  )
}

export default PedidoCampoTexto