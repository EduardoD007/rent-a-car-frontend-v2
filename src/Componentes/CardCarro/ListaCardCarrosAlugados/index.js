import "./ListaCardCarrosAlugados.css";
import BotaoEncerrarLocacao from "../../Botoes/BotaoEncerrarLocacao";
import api from './../../../app/api.js'
import { useEffect, useState } from 'react'


const ListaCardCarrosAlugados = (props) => {

  let dataEntrega;
  let pedidoNum;
  let nomeCliente;
  let pedidoValor;
  let dataPedido;
  const[clientes, setClientes] = useState([])

  const aoEnviarForm = async (event) => {
    window.scroll(0, 0)
    //const data = pegaPedido(event.target.id)
    //const pedidoId = data.id
    //await api.exlcuirPedido( pedidoId, event.target.id)
    await api.atualizarCarro({status:"Disponível"},event.target.id)
  }

  const pegaClientes = async (params) => {
    const response = await api.buscaTodosClientes(params)
    const data = await response.json()
    setClientes(data)
  }

  const pegaPedido = (carroId) => {
    for(const pedido of props.pedidos) {
      if(carroId == pedido.carro_id) {
        return pedido
      }
    }
  }

  useEffect(() => {
    return () => {
      pegaClientes(" ")
    };
  }, [])

  return (
    <div>
      <div className="card-list-titulo">
        <label>{props.titulo}</label>
      </div>
      <ul className='card-list-container'>
        {props.carros.map(carro => {
          for (const pedido of props.pedidos) {
            if (carro.id === pedido.carro_id){
              dataEntrega = new Date(pedido.data_final).toLocaleDateString('pt-br', { year: "numeric", month: "long", day: "numeric" });
              pedidoNum = pedido.id
              pedidoValor = pedido.valor
              dataPedido = new Date(pedido.data_inicial).toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric'})
            }
            for (const cliente of clientes) {
              if(cliente.id === pedido.cliente_id) {
                nomeCliente = cliente.nome
              }
            }
          }
          return <li className='card-form-alugados' key={carro.id} >
            <form onSubmit={aoEnviarForm} className='card-campos' id={carro.id} >
            <div className='titulo-pedido'>
                <label>PEDIDO</label>
              </div>
              <div className='card-list-container-horizontal'>
                <div className='pedido'>
                  <label id={pedidoNum}>Nº: {pedidoNum}</label>
                </div>
                <div className='pedido'>
                  <label>Início : {dataPedido}</label>
                </div>
              </div>
              <div className='pedido'>
                <label>Cliente : {nomeCliente}</label>
              </div>
              <div className='pedido'>
                <label>Valor : {pedidoValor}</label>
              </div>
              <div className='meio-container'>
              <div className='titulo-carro'>
                <label>{carro.modelo}</label>
              </div>
              <section >
                <div className='meio'>
                  <img src={carro.imagem} alt='Foto carro'></img>
                </div>
                <div className='meio-textos'>
                  <div className='meio-textos--container'>
                    <label>Marca:</label>
                    <label>{carro.marca}</label>
                  </div>
                  <div className='meio-textos--container'>
                    <label>Tranmissão:</label>
                    <label>{carro.transmissao}</label>
                  </div>
                  <div className='meio-textos--container'>
                    <label>Portas:</label>
                    <label>{carro.portas}</label>
                  </div>
                  <div className='meio-textos--container'>
                    <label>Cor:</label>
                    <label>{carro.cor}</label>
                  </div>
                  <div className='meio-textos--container'>
                    <label>Placa:</label>
                    <label>{carro.placa}</label>
                  </div>
                </div>
              </section>
              </div>
              <div className="final">
                <div className="final-alugado">
                  <label >ALUGADO</label>
                </div>
                <div className="final-previsao">
                  Previsão de retorno:
                </div>
                <div className="final-data">
                  <label>{dataEntrega}</label>
                </div>
                <BotaoEncerrarLocacao
                  texto='DEVOLUÇÃO'
                />
              </div>
            </form>
          </li>
        })}
      </ul>

    </div>

  )
}

export default ListaCardCarrosAlugados;