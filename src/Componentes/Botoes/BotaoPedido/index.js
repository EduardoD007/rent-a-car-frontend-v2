import './BotaoPedido.css'

const BotaoPedido = (props) => {
  return (
    <div className='botao-pedido'>
      <button>{props.texto}</button>
    </div>
  )
}

export default BotaoPedido