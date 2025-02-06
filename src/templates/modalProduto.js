import React, { useState, useEffect } from 'react';
import { CheckCircle } from "lucide-react";
import './ModalProduto.css';

const ModalProduto = ({ produto, isOpen, onClose, addToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animacao, setAnimacao] = useState(false);

    const handleAddToCart = () => {
        addToCart(produto);
        setAnimacao(true);

        setTimeout(() => {
            setAnimacao(false);
        }, 1500);
    };
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

    if (!isOpen) return null;

    const images = [produto.src, ...(produto.extra || [])];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                            onClick={handleAddToCart}
                            className="add-to-cart-button"
                        >
                            Adicionar ao Carrinho
                        </button>
                        {animacao && (
                            <div className="animacao-check">
                                <CheckCircle size={24} color="white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto;