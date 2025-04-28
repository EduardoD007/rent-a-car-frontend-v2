import './BotaoPedidoCancelar.css'

const BotaoPedidoCancelar = (props) => {

  return (
    <div className='botao-pedido-cancelar'>
      <button >{props.texto}</button>
    </div>
  )
}
export default BotaoPedidoCancelar