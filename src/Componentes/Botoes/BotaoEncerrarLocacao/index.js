import './BotaoEncerrarLocacao.css'
const BotaoEncerrarLocacao = (props) => {
  return (
    <div className='botao-encerrar-fundo'>
      <div className='botao-encerrar'>
        <button >{props.texto}</button>
      </div>
    </div>
  )
}

export default BotaoEncerrarLocacao