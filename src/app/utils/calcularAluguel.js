module.exports = (dataInicial, dataFinal, valorDiaria) => {
  const data1 = new Date(dataInicial.split('/').reverse().join('-'))
  const data2 = new Date(dataFinal.split('/').reverse().join('-'))

  const time = Math.abs(data2.getTime() - data1.getTime())
  const dias = Math.ceil(time / (1000 * 3600 * 24));
  
  const valorAluguel = valorDiaria * dias
  const moeda = valorAluguel.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  
  return {moeda, dias}
}