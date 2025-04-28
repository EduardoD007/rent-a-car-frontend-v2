
const url = 'rent-a-car-backend-json.vercel.app/';

const api =  {

  async buscaTodosCarros(params) {

    try {
      const response = await fetch (`${url}carros${params}`);
      return response;
    } catch (error) {
      alert(`${error.message} - Erro ao buscar registros`);
    }
  },

  async buscaCarroPorId(id) {
    try {
      const response = await fetch(`${url}carros/${id}`)
      return response
    } catch (error) {
      alert(`${error.message} - Erro ao buscar registro por id`)
    }
  },

  async buscaTodosClientes(params) {
    try {
      const response = await fetch (`${url}clientes${params}`)
      return response;
    } catch (error) {
      alert(`${error.message} - Erro ao buscar clientes`)
    }
  },

  async buscaClientePorId(id) {
    try {
      const response = await fetch(`${url}clientes/${id}`)
      return response
    } catch (error) {
      alert(`${error.message} - Erro ao buscar registro por id`)
    }
  },

  async buscaTodosPedidos(params) {
    try {
      const response = await fetch(`${url}pedidos${params}`)
      return response;
    } catch (error) {
      alert(`${error.message} - Erro ao buscar pedidos`)
    }
  },

  async criarPedido(pedido,clienteId,carroId) {
    try {
      const response = await fetch(`${url}clientes/${clienteId}/pedidos/${carroId}`,
        {
          method: 'POST',
          body: JSON.stringify(pedido),
          headers: {
            "Content-type": "application/json"
          }
        }
      )
      alert("Pedido criado com sucesso")
      return response
    } catch (error) {
      alert(`${error.message} - Erro ao cadastrar novo pedido`)
    }
  },

  async atualizarCarro(atualizacao,carroId) {
    try {
      await fetch(`${url}carros/${carroId}`,
        {
        method: 'PATCH',
        body: JSON.stringify(atualizacao),
        headers: {
          "Content-type": "application/json"
        }
      })
      alert(`Status do carro com a id: ${carroId} foi atualizado com sucesso`)
    } catch (error) {
      alert(`${error.message} - Falha ao atualizar carro`)
    }
  },

  async exlcuirPedido(pedidoId, carroId) {
    try {
      await fetch (`${url}pedidos/${pedidoId}/${carroId}`, 
        {
          method: 'DELETE',
        }
      )
      alert(`Pedido nº ${pedidoId} encerrado com sucesso - Carro disponível para locação`)
    } catch (error) {
      alert(`${error.message} - Falha ao excluir o pedido nº: ${pedidoId}`)
    }
  }
}

export default api;