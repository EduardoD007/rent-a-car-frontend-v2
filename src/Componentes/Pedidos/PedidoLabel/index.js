import './PedidoLabel.css'

const PedidoLabel = (props) => {
  return (
    <div className='pedido-label'>
      <label>{props.label}</label>
    </div>
  )
}

export default PedidoLabel