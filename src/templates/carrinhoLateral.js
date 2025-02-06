import React from "react";
import "./carrinhoLateral.css";
import { useNavigate } from "react-router-dom";


const CarrinhoLateral = ({ isOpen, onClose, itens, removeFromCart, clearCart }) => {
  const navigate = useNavigate();

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

          <table className="carrinho-tabela">
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.quantidade} Un</td>
                  <td>R$ {(item.preço * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button className="trash-icon" onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="carrinho-total">
          <strong>Total:</strong> R$ {calcularTotal().toFixed(2)}
        </div>
        <div className="botoes">
          {itens.length > 0 && (
            <button className="add-to-cart-button" onClick={clearCart}>Limpar carrinho</button>)}
          <button className="add-to-cart-button pagamento" onClick={() => { onClose(); navigate("/pagamento") }}>Pagamento</button>
        </div>
      </div>
    </div>
  );
};

export default CarrinhoLateral;
