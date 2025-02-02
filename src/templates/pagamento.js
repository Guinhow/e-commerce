import React, { useEffect, useState } from "react";
import './pagamento.css'
import { useNavigate } from "react-router-dom";

const Pagamento = () => {
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const navigate = useNavigate();

  const carregarCarrinho = () => {
    const itensSalvos = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinhoItens(itensSalvos);
  };

  useEffect(() => {
    carregarCarrinho();
    window.addEventListener("storage", carregarCarrinho); 

    return () => {
      window.removeEventListener("storage", carregarCarrinho);
    };
  }, []);

  const calcularTotal = () => {
    return carrinhoItens.length > 0
      ? carrinhoItens.reduce((total, item) => total + (item.preço || 0) * item.quantidade, 0).toFixed(2)
      : "0.00";
  };

  const handlePagamento = (e) => {
    e.preventDefault();
    alert("Pagamento realizado com sucesso!");
    localStorage.removeItem("carrinho");
    setCarrinhoItens([]);
    navigate("/")

  };

  return (
    <div className="checkout-container">
      <div className="carrinho-detalhes">
        <h2>Seu Carrinho</h2>
        {carrinhoItens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {carrinhoItens.map((item) => (
              <li key={item.id}>
                {item.nome} - {item.quantidade} x R$ {item.preço?.toFixed(2) || "0.00"}
              </li>
            ))}
          </ul>
        )}
        <p><strong>Total:</strong> R$ {calcularTotal()}</p>
      </div>

      <div className="formulario-pagamento">
        <h2>Pagamento</h2>
        <form onSubmit={handlePagamento}>
          <label>
            Nome no Cartão:
            <input type="text" required />
          </label>
          <label>
            Número do Cartão:
            <input type="text" required placeholder="**** **** **** ****" />
          </label>
          <label>
            Data de Expiração:
            <input type="text" required placeholder="MM/AA" />
          </label>
          <label>
            CVV:
            <input type="text" required placeholder="***" />
          </label>
          <button type="submit">Finalizar Pagamento</button>
        </form>
      </div>
    </div>
  );
};

export default Pagamento;
