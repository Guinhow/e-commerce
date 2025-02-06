import React, { useEffect, useState } from "react";
import './pagamento.css'
import { useNavigate } from "react-router-dom";
import qrcode from "../products/qr-code.jpeg";

const Pagamento = () => {
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("cartao");
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
          <table className="carrinho-tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qnt.</th>
                <th>Valor Unitário</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrinhoItens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.quantidade} Un</td>
                  <td>R$ {item.preço?.toFixed(2) || "0.00"}</td>
                  <td>R$ {(item.preço * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p><strong>Total:</strong> R$ {calcularTotal()}</p>
      </div>
      <div className="formulario-pagamento">
        <div className="abas-pagamento">
          <button
            className={abaAtiva === "cartao" ? "aba ativa" : "aba"}
            onClick={() => setAbaAtiva("cartao")}
          >
            Cartão de Crédito
          </button>
          <button
            className={abaAtiva === "pix" ? "aba ativa" : "aba"}
            onClick={() => setAbaAtiva("pix")}
          >
            Pix
          </button>
        </div>
        <div className="conteudo-aba">
          {abaAtiva === "cartao" ? (
            <form onSubmit={handlePagamento}>
              <label>Nome no Cartão:
                <input type="text" required />
              </label>
              <label>Número do Cartão:
                <input type="text" required placeholder="**** **** **** ****" />
              </label>
              <label>Data de Expiração:
                <input type="text" required placeholder="MM/AA" />
              </label>
              <label>CVV:
                <input type="text" required placeholder="***" />
              </label>
              <button type="submit">Finalizar Pagamento</button>
            </form>
          ) : (
            <div className="pagamento-pix">
              <h3>Escaneie o QR Code ou copie a chave Pix:</h3>
              <img src={qrcode} alt="QR Code Pix" className="qr-code" />
              <button onClick={() => navigator.clipboard.writeText("chave-pix-123456")}>
                Copiar Chave Pix
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
