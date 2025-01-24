import React, { useState } from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from './logo.svg'
import perfil from '../products/perfil.svg'
import sacola from '../products/sacola.svg'



const subMenu = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/Categories' },
  { name: 'Products', path: '/Products' },
  { name: 'About Us', path: '/Contact' },
  { name: 'Contact', path: '/ContactForm' }
];

const LoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {

      if (username === 'usuario' && password === 'senha') { 
        onLogin();
        onClose();
        localStorage.setItem("isAuthenticated", "true");
      } else {
        alert('Usuário ou senha incorretos');
      }
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <input className='input'
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className='input'
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='botao-login' onClick={handleLogin}>Entrar</button>
        <button className='botao-login' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

const Header = ({ searchTerm, handleSearch ,handleSearchEnter  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    alert('Login efetuado com sucesso!');
    navigate('/');
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

function logout() {

    setIsAuthenticated(false); 
    localStorage.setItem("isAuthenticated", "false"); 
    alert('Logout efetuado com sucesso!');
    navigate('/');
  
};
  

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <p>copatto</p>
      </div>
      <nav className="navbar">
        <input type="text" className="search-bar" placeholder="Pesquisar..." value={searchTerm} onChange={handleSearch} onKeyDown={handleSearchEnter} />
        <ul className="lista">
          {subMenu.map((x) => (<li className='itens' key={x.name}>
            <Link to={x.path} className='menu-link'>{x.name}</Link>
          </li>))}
        </ul>
      </nav>
      <div className="usuario">
        <img src={perfil} className="itens" alt="perfil" onClick={() => setIsModalOpen(true)} />
        <img src={sacola} className="itens" alt="sacola" />
        <button onClick={logout} className="itens botao">Logout</button>
      </div>
      {isModalOpen && (
        <LoginModal
          onClose={() => setIsModalOpen(false)}
          onLogin={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Header;