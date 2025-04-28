import BotaoAlugar from "../../Botoes/BotaoAlugar/";
import "./ListaCardCarros.css";

const ListaCardCarros = (props) => {

  const aoEnviarForm = (event) => {
    event.preventDefault()
    window.scroll(0,0)
    props.receberCarroId(event.target.id)
    props.aoSubmeterForm('pedidos')
  }

  return (
    <div>
      <div className="card-list-titulo">
        <label>{props.titulo}</label>
      </div>
      <ul className='card-list-container'>
      {props.carros.map(carro => {
        return <li className='card-form' key={carro.id} >
          <form onSubmit={aoEnviarForm} className='card-campos' id={carro.id} >
            <div className='card-campos--titulo'>
              <label>{carro.modelo}</label>
            </div>
            <section>
              <div className='card-campos--meio'>
                <img src={carro.imagem} alt='Foto carro'></img>
              </div>
              <div className='card-campos--meio-textos'>
                <div className='card-campos--meio-textos--container'>
                  <label>Marca:</label>
                  <label>{carro.marca}</label>
                </div>
                <div className='card-campos--meio-textos--container'>
                  <label>Tranmissão:</label>
                  <label>{carro.transmissao}</label>
                </div>
                <div className='card-campos--meio-textos--container'>
                  <label>Portas:</label>
                  <label>{carro.portas}</label>
                </div>
                <div className='card-campos--meio-textos--container'>
                  <label>Cor:</label>
                  <label>{carro.cor}</label>
                </div>
              </div>
            </section>
            <div className="card-campos--final">
              <div className="card-campos--final-diaria">
                <label >Diária:</label>
                <label> R$ {carro.valor_aluguel},00</label>
              </div>
              <BotaoAlugar
                texto='ALUGAR'
              />
            </div>
          </form>
        </li>
      })}
    </ul>
  </div>
    
  )
}

export default ListaCardCarros;