import React from "react";
import "./carrinhoLateral.css";

const CarrinhoLateral = ({ isOpen, onClose, itens , removeFromCart , clearCart }) => {

  const calcularTotal = () => {
    return itens.reduce((acc, item) => {
      const quantidade = item.quantidade || 1; 
      return acc + item.preço * quantidade;
    }, 0);
  };

  return (
    <div className={`carrinho-lateral ${isOpen ? "open" : ""}`}>
      <div className="carrinho-header">
        <h2>Carrinho</h2>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
      <div className="carrinho-conteudo">
        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {itens.map((item) => (
              <li key={item.id} className="carrinho-item">
                <span>{item.nome}</span>
                <span>{item.quantidade} Un</span>
                <span>Valor R$ {(item.preço * item.quantidade).toFixed(2)}</span>
                <button className="trash-icon" 
                onClick={() => {
                  removeFromCart(item.id);
                }}>🗑️</button>
              </li>
            ))}
          </ul>
          
        )}
         <div className="carrinho-total">
            <strong>Total:</strong> R$ {calcularTotal().toFixed(2)}
          </div>
          <div className="botoes">
          {itens.length > 0 && (
            <button className="add-to-cart-button" onClick={clearCart}>Limpar carrinho</button> )}
            <button className="add-to-cart-button pagamento">Ir para pagamento</button>
         
          </div>
      </div>
    </div>
  );
};

export default CarrinhoLateral;
