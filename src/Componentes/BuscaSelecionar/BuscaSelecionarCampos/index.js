import { useEffect, useState } from 'react'
import './BuscaSelecionarCampos.css'
import '../BuscaSelecionarForm/index.js'


const BuscaSelecionarCampos = (props) => {

  const aoSelecionado =  (event) => {
    if(event){
      if(event.target.id === 'Marca'){
          props.funcaoListaModelos(event.target.value)
      }
      props.funcaoGravarVariavel(event.target.value)   
    } 
  }

  return (
    <div className='busca-campos-selecionar'>
      <label >{props.label}</label>
      <select  value = {props.valor} onChange={aoSelecionado} id={props.label}>
        <option  key={props.label}>{props.valorInicial}</option>
        {props.itens.map(item => {
          return <option  key={item} value={item}>{item}</option>
        })}
      </select>
    </div>
  )
}
  

export default BuscaSelecionarCampos;