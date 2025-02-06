import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleLogin = () => {
    if (username === 'usuario' && password === 'senha') {
      onLogin();
      onClose();
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  function logout() {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    alert('Logout efetuado com sucesso!');
    navigate("/")
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
        <button className='botao-login' onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const Header = ({ searchTerm, handleSearch, handleSearchEnter, onCarrinhoClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const handleLoginSuccess = () => {
    alert('Login efetuado com sucesso!');
  };

  return (
    <div className="header">
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <p>copatto</p>
      </div>
      <nav className={`navbar ${menuAberto ? 'ativo' : ''}`}>
        <ul className="lista">
          {subMenu.map((x) => (<li className='itens' key={x.name}>
            <Link to={x.path} className='menu-link' onClick={fecharMenu}>{x.name}</Link>
          </li>))}
        </ul>
      </nav>
      <div className="usuario">
        <img src={perfil} className="itens" alt="login" onClick={() => setIsModalOpen(true)} />
        <img src={sacola} className="itens" alt="sacola" onClick={onCarrinhoClick} />
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