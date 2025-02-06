import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './templates/Header';
import Home from './templates/Home.js';
import Products from './templates/Products.js';
import Contato from './templates/Contact.js';
import Categories from './templates/Categories.js';
import ContactForm from './templates/Contactform.js';
import CarrinhoLateral from './templates/carrinhoLateral';
import Pagamento from './templates/pagamento.js';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);
  const [carrinhoItens, setCarrinhoItens] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinhoItens((prevItens) => {

      const itemExistente = prevItens.find((item) => item.id === produto.id);
      let novoCarrinho;


      if (itemExistente) {
        novoCarrinho = prevItens.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevItens, { ...produto, quantidade: 1 }];

      }
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };


  const removeFromCart = (produtoId) => {
    setCarrinhoItens((prevItens) => {
      const novoCarrinho = prevItens
        .map((item) =>
          item.id === produtoId ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0);

      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };


  const clearCart = () => {

    setCarrinhoItens([]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchEnter = (event) => {
    if (event.keyCode === 13) {
      setSearchQuery(searchTerm);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    return <Navigate to="/" />

  };

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      alert("Você precisa estar logado para acessar esta página. Clique em OK para voltar.")
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Header searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSearchEnter={handleSearchEnter}
          isAuthenticated={isAuthenticated}
          logout={logout}
          onCarrinhoClick={() => setIsCarrinhoOpen(true)}
        />
        <CarrinhoLateral
          isOpen={isCarrinhoOpen}
          onClose={() => setIsCarrinhoOpen(false)}
          itens={carrinhoItens}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
        <main className="Main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Categories" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Categories /></ProtectedRoute>} />
            <Route path="/Products" element={<Products searchTerm={searchQuery} adicionarAoCarrinho={adicionarAoCarrinho} />} />
            <Route path="/Contact" element={<Contato />} />
            <Route path="/ContactForm" element={<ContactForm />} />
            <Route path="/pagamento" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Pagamento /></ProtectedRoute>} />
          </Routes>
          <div className="Content">
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
