import { useEffect ,useState} from 'react';
import BotaoBuscar from '../../Botoes/BotaoBuscar';
import BuscaSelecionarCampos from '../BuscaSelecionarCampos';
import './BuscaSelecionarForm.css';
import api from "../../../app/api.js";


const BuscaSelecionarForm = (props) => {

  var modelosNomes = []
  const marcas = []
  const transmissoes = ['Automático','Manual']
  const cores = []

  var stringBusca = ""

  const [listaDeCarros,setListaDeCarros] = useState([])
  const [carrosPorModelo, setCarroPorModelo] = useState([])
  const [listaCores, setListaCores] = useState([])

  const [marca,setMarca] =  useState('vazio')
  const [modelo,setModelo] =  useState('vazio')
  const [transmissao,setTransmissao] =  useState('vazio')
  const [cor,setCor] =  useState('vazio')

  const pegaCarros = async () => {
    const response = await api.buscaTodosCarros("")
    const data = await response.json()
    setListaDeCarros(data)
}

  const listaDeModelos = async (marca) => {
    const stringMarca =`?marca=${marca}`
    const response = await api.buscaTodosCarros(stringMarca)
    const data = await response.json()
    setCarroPorModelo(data)
  }

  const buscarPorSelect = (event) => {
    event.preventDefault();
    stringBusca = `?marca=${marca}&modelo=${modelo}&transmissao=${transmissao}&cor=${cor}`
    props.string(stringBusca)
    setMarca('vazio')
    setModelo('vazio')
    setTransmissao('vazio')
    setCor('vazio')
    setCarroPorModelo([])
  }

  useEffect( () => {
    pegaCarros()
  },[setListaDeCarros])

  for(const carro of listaDeCarros) {
    if(!marcas.includes(carro.marca)) {
      marcas.push(carro.marca);
    }
  } 

  for(const carro of listaDeCarros) {
    if(!cores.includes(carro.cor)) {
      cores.push(carro.cor);
    }
  } 

  for(const carro of carrosPorModelo){
    modelosNomes.push(carro.modelo)
  }
      
  return (
    <form onSubmit={buscarPorSelect} className='busca-form-selecionar'>
      <BuscaSelecionarCampos  
        funcaoListaModelos = {listaDeModelos} 
        funcaoGravarVariavel = {valor => setMarca(valor)}
        label='Marca' 
        valorInicial='Selecione uma marca' 
        valor = {marca}
        itens={marcas}
      />
      <BuscaSelecionarCampos  
      funcaoGravarVariavel = {valor => setModelo(valor)}
        label='Modelo' 
        valorInicial='Selecione uma modelo' 
        valor = {modelo}
        itens={modelosNomes}
        />
      <BuscaSelecionarCampos  
      funcaoGravarVariavel = {valor => setTransmissao(valor)}
        label='Trasmissão' 
        valorInicial='Manual / automático' 
        valor = {transmissao}
        itens={transmissoes}
        />
      <BuscaSelecionarCampos  
      funcaoGravarVariavel = {valor => setCor(valor)}
        label='Cor' 
        valorInicial='Selecione uma cor' 
        valor = {cor}
        itens={cores}
        />
      <BotaoBuscar 
        texto = 'Buscar' 
      />
    </form>
  )
}

export default BuscaSelecionarForm;