import React, { useState } from 'react';
import './ModalProduto.css';

const ModalProduto = ({ produto, isOpen, onClose, addToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen) return null;

    const images = [produto.src, ...(produto.extra || [])];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <div className="modal-body">
                    <div className="modal-image-wrapper">
                        <button className="image-control prev" onClick={prevImage}>
                            &lt;
                        </button>
                        <img
                            src={images[currentImageIndex]}
                            alt={produto.nome}
                            className="modal-image"
                        />
                        <button className="image-control next" onClick={nextImage}>
                            &gt;
                        </button>
                    </div>
                    <div className="modal-details">
                        <h2>{produto.nome}</h2>
                        <p>Preço: {produto.valor}</p>
                        <p>Descrição: {produto.descricao || 'Sem descrição disponível.'}</p>
                        <button
                            onClick={() => addToCart(produto)}
                            className="add-to-cart-button"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto;