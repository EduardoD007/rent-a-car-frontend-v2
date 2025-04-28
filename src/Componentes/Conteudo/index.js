import { useEffect, useState } from 'react'
import './Conteudo.css'
import CardCarrosForm from '../CardCarro/CardCarroForm'
import PedidoForm from '../Pedidos/PedidoForm'
import BuscaSelecionarForm from '../BuscaSelecionar/BuscaSelecionarForm'
import api from '../../app/api'

const Conteudo = (props) => {

  const [pedidos, setPedidos] = useState([])
  const [tipoConteudo,setTipoConteudo] = useState('listaCards')
  const [stringBusca,setStringBusca] = useState('')
  const [carroId,setCarroId] = useState('')

  props.aoReceberStringBusca(stringBusca)

  const buscarPedidos = async () => {
    const response = await api.buscaTodosPedidos('')
    const data = await response.json()
    setPedidos(data)
  }

  useEffect( () => {
    buscarPedidos()
  },[tipoConteudo])

  if(tipoConteudo === 'pedidos') {
    return (
      <PedidoForm
        valorCarroId = {carroId}
        aoReceberConteudo = {conteudo => setTipoConteudo(conteudo)}
      />
    )
  }
  else if(tipoConteudo === 'listaCards') {
    return(
      <div>
        <BuscaSelecionarForm
          string = {stringBusca => setStringBusca(stringBusca)}
        />
        <CardCarrosForm
          listaBusca = {props.lista}
          aoReceberConteudo = {conteudo => setTipoConteudo(conteudo)}
          aoReceberId = {id => setCarroId(id)}
          listaDePedidos = {pedidos}
      />
      </div>  
      
    )
  }
}

export default Conteudo