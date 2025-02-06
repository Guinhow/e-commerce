import React, { createContext, useState, useContext } from "react";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const addToCart = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
    console.log('add ao carrinho')
  };

  const removeFromCart = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCarrinho([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, addToCart, removeFromCart, clearCart }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
