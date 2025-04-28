import './Footer.css'

const Footer = (props) => {
  return (
    <div className='footer'>
      <h1>{props.texto1}</h1>
      <h2>{props.texto2}</h2>
    </div>
  )
}

export default Footer