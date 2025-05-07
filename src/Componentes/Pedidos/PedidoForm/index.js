
import BotaoBuscar from '../../Botoes/BotaoBuscar';
import BotaoPedido from '../../Botoes/BotaoPedido';
import BotaoPedidoCancelar from '../../Botoes/BotaoPedidoCancelar';
import PedidoCampoSelecionar from '../PedidoCampoSelecionar';
import PedidoCampoTexto from '../PedidoCampoTexto';
import PedidoLabel from '../PedidoLabel';
import PedidoLabelCliente from '../PedidoLabelCliente';
import './PedidoForm.css';
import api from '../../../app/api.js'
import { useEffect, useState } from 'react';
import calcularAluguel from '../../../app/utils/calcularAluguel.js';
import PedidoLabelAluguel from '../PedidoLabelAluguel/index.js';

const PedidoForm = (props) => {
  let valorTela = false
  let nomeCliente
  const [carro, setCarro] = useState({})
  const [clienteLabel, setClienteLabel] = useState({
    id: " ",
    nome: " ",
    cpf: " ",
    endereco: " ",
    bairro: " ",
    numero: " ",
    complemento: " "
  }
)
  const [clientes, setClientes] = useState([])
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [aluguelTotal, setAluguelTotal] = useState([])
  const [renderAluguel, setRenderAluguel] = useState('')

  const pegarCarroPorId = async (id) => {
    const response = await api.buscaCarroPorId(id)
    const data = await response.json()
    console.log(data)
    const dataObjeto = data.find(e => e,[0,data] )
    setCarro(dataObjeto)
  }

  const pegarClientes = async () => {
    const response = await api.buscaTodosClientes('')
    const data = await response.json()
    setClientes(data)
  }

  const pegarCliente = async (id) => {
    if( id === 'Selecione um cliente') {
      setClienteLabel({
        id:" ",
        nome: " ",
        cpf: " ",
        endereco: " ",
        bairro: " ",
        numero: " ",
        complemento: " "
      })
    }else{
      const response = await api.buscaClientePorId(id)
      const data = await response.json()
      const dataObjeto = data.find(e => e,[0,data] )
      console.log(dataObjeto)
      setClienteLabel(dataObjeto)
    }
  }

  const aoCalcularValor = (event) => {
    event.preventDefault();
    const data = calcularAluguel(dataInicial, dataFinal, carro.valor_aluguel);
    setAluguelTotal(data)
    setRenderAluguel(imprimirAluguel(data.moeda, data.dias))
    valorTela = true
    desceTela(valorTela)
  }

  const cadastrarPedido = async (event) => {
    event.preventDefault();
    if(clienteLabel.id === ' ') {
      alert("Escolha de cliente necessária")
    }else{
      const produtoNovo = {
        cliente_id: clienteLabel.id,
        carro_id: carro.id,
        data_inicial: dataInicial,
        data_final: dataFinal,
        valor: aluguelTotal.moeda,
        status: 'Aberto'
      }
      await api.criarPedido(produtoNovo, clienteLabel.id, carro.id)
      props.aoReceberConteudo('listaCards')
    }
  }

  const desceTela = (valor) => {
    const x = () => {
      if (valor) {
        window.scroll({
          top: 1000,
          left: 0,
          behavior: 'smooth'
        })
        valorTela = false
      }
    }
    setTimeout(x, 0)
  }

  const imprimirAluguel = (total, dias) => {
    return (
      <div className='pedido-form-valor-aluguel'>
        <PedidoLabelAluguel
          label='VALOR DO ALUGUEL'
        />
        <div className='pedido-form-texto-aluguel'>
          {total}
        </div>
        <PedidoLabelAluguel
          label='DURAÇÃO DA LOCAÇÃO'
        />
        <div className='pedido-form-texto-aluguel'>
          {dias} dias
        </div>
      </div>
    )
  }

  useEffect(() => {
    pegarCarroPorId(props.valorCarroId)
    pegarClientes()
  }, [props.valorCarroId])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [document.onload])

  return (
    <div>
      <div className='pedido-container-titulo'>
        CADASTRO DE PEDIDO
      </div>
      <form id='form1' onSubmit={cadastrarPedido}>
      <div className='pedido-form-container'>
        <div className='pedido-form-titulos'>
          VEÍCULO
        </div>
        <div className='pedido-form-divisao'>
          <div className='pedido-form-carro img'>
            <img src={carro.imagem} alt='Foto carro'></img>
          </div>

          <div className='pedido-form-carro-texto'>
            <PedidoLabel label={`Modelo: ${carro.modelo}`} />
            <PedidoLabel label={`Marca: ${carro.marca}`} />
            <PedidoLabel label={`Transmissão: ${carro.transmissao}`} />
          </div >
          <div className='pedido-form-carro-texto'>
            <PedidoLabel label={`Portas: ${carro.portas}`} />
            <PedidoLabel label={`Cor: ${carro.cor}`} />
            <PedidoLabel label={`Placa: ${carro.placa}`} />
          </div>
        </div>
        <div className='pedido-form-titulos'>
          CLIENTE
        </div>
        <div className='pedido-form-divisao--cliente'>
          <PedidoCampoSelecionar
            label='Cliente: '
            valorInicial='Selecione um cliente'
            valor= {nomeCliente}
            clientes = {clientes}
            gravarClienteLabel = {id => pegarCliente(id)}
          />
          <div className='pedido-form-divisao--cliente-label'>
            <PedidoLabelCliente label= {`Nome: ${clienteLabel.nome}`} />
            <PedidoLabelCliente label= {`Cpf: ${clienteLabel.cpf}`} />
            <PedidoLabelCliente label= {`Endereço: ${clienteLabel.endereco}`} />
            <PedidoLabelCliente label= {`Numero: ${clienteLabel.numero}`} />
            <PedidoLabelCliente label= {`Bairro: ${clienteLabel.bairro}`} />
            <PedidoLabelCliente label= {`Complemento: ${clienteLabel.complemento}`} />
          </div>
        </div>
        <div className='pedido-form-titulos'>
          ALUGUEL
        </div>
        <div >
          <div className='pedido-form-divisao--aluguel'>
            <PedidoCampoTexto
              label='Data inicial: '
              placeholder='dd/mm/aaaa'
              valor={dataInicial}
              aoAlterar={dataInicio => setDataInicial(dataInicio)}
            />
            <PedidoCampoTexto
              label='Data final: '
              placeholder='dd/mm/aaaa'
              valor={dataFinal}
              aoAlterar={dataFinal => setDataFinal(dataFinal)}
            />
            <PedidoLabelCliente
              label={`Valor Diária: R$ ${carro.valor_aluguel},00`}
            />
            <BotaoBuscar
              texto='Calcular aluguel'
              aoClicar = {aoCalcularValor}
            />
            {renderAluguel}
          </div>
        </div>
        <div className='pedido-form-divisao--finalizar'>
          <BotaoPedido
            texto='Finalizar pedido'
          />
          <BotaoPedidoCancelar
            texto='Cancelar'
            reload = {() => document.location.reload()}
          />
        </div>
      </div>
      </form>
    </div>
  )
}

export default PedidoForm