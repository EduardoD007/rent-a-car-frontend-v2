
import api from "../../../app/api.js";
import ListaCardCarros from "../ListaCardCarros/";
import "./CardCarroForm.css";
import { useState, useEffect } from 'react'
import "../../BuscaSelecionar/BuscaSelecionarForm/index.js"
import ListaCardCarrosAlugados from "../ListaCardCarrosAlugados/index.js";


const CardCarrosForm = (props) => {


  const [listaDeCarrosDisponiveis, setListaDeCarrosDisponiveis] = useState([])
  const [listaDeCarrosAlugados, setListaDeCarrosAlugados] = useState([])


  const passarConteudo = (conteudoRecebido) => {
    props.aoReceberConteudo(conteudoRecebido)
  }

  const recebeCarroId = (carroId) => {
    props.aoReceberId(carroId)
  }


  const criaListaPorDisponibilidade = async (lista) => {
    var dataDisponiveis = []
    var dataAlugados = []
    for (const carro of lista) {
      if (carro.status === 'Disponível') {
        dataDisponiveis.push(carro)
      }
      else {
        dataAlugados.push(carro)
      }
    }
    setListaDeCarrosDisponiveis(dataDisponiveis)
    setListaDeCarrosAlugados(dataAlugados)
  }

  useEffect(() => {
    const pegaCarros = async () => {
      if (props.listaBusca === '') {
        const response = await api.buscaTodosCarros("")
        const data = await response.json()
        await criaListaPorDisponibilidade(data)
      } else {
        const response = await api.buscaTodosCarros(props.listaBusca)
        const data = await response.json()
        await criaListaPorDisponibilidade(data)
      }
    }
    pegaCarros();
  }, [props.listaBusca])

  return (
    <section >
      <ListaCardCarros
        titulo='VEÍCULOS DISPONÍVEIS'
        carros={listaDeCarrosDisponiveis}
        aoSubmeterForm={tipoConteudo => passarConteudo(tipoConteudo)}
        receberCarroId={carroId => recebeCarroId(carroId)}
      />
      <ListaCardCarrosAlugados
        titulo='VEÍCULOS ALUGADOS'
        carros={listaDeCarrosAlugados}
        receberCarroId={carroId => recebeCarroId(carroId)}
        pedidos={props.listaDePedidos}
      />
    </section>
  )
}

export default CardCarrosForm;