import NavbarForm from './Componentes/Navbar/NavbarForm'
import Header from './Componentes/Header/'
import Conteudo from './Componentes/Conteudo/';
import { useState } from 'react';
import Footer from './Componentes/Footer/index.js';
function App() {
  const [listaBusca,setListaBusca] = useState('')

  return (
    <div className="App">
      <header className="header">
        <NavbarForm/>
        <Header/>
      </header>
      <main>
        <Conteudo
          lista = {listaBusca}
          aoReceberStringBusca = {stringBusca => setListaBusca(stringBusca)}
          />
      </main>
      <footer>
        <Footer 
          texto1 = 'Rent A Car'
          texto2 = '2025 - Todos direitos reservados'
        />
      </footer>
    </div>
  );
}

export default App
