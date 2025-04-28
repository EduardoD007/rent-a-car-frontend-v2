import './BotaoAlugar.css'

const BotaoAlugar = (props) => {
  return (
    <div className='botao-alugar-fundo'>
      <div className='botao-alugar'>
        <button >{props.texto}</button>
      </div>
    </div>
  )
}

export default BotaoAlugar