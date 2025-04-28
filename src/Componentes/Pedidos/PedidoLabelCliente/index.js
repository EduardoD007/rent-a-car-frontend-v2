import './PedidoLabelCliente.css'

const PedidoLabelCliente = (props) => {
  return (
    <div className='pedido-label-cliente'>
      <label >{props.label}</label>
    </div>
  )
}

export default PedidoLabelCliente