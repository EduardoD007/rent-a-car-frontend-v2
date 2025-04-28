import './BotaoBuscar.css'

const BotaoBuscar = (props) => {

  return (
    <div className='botao-buscar'>
      <button onClick={props.aoClicar} >{props.texto}</button>
    </div>
  )
}
export default BotaoBuscar