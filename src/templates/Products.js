import React, { useState } from 'react';
import { pesquisa } from './search.js';
import Filtros from './Filtros.js';
import ModalProduto from './modalProduto.js';
import '../App.css';

const Products = ({ adicionarAoCarrinho }) => {
    const [filteredProducts, setFilteredProducts] = useState(pesquisa);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const applyFilters = (filters) => {
        const { category, color, minPrice, maxPrice } = filters;

        const newFilteredProducts = pesquisa.filter((produto) => {
            const matchCategory = category ? produto.cat === category : true;
            const matchColor = color ? produto.cor === color : true;
            const matchMinPrice = minPrice ? produto.preço >= minPrice : true;
            const matchMaxPrice = maxPrice ? produto.preço <= maxPrice : true;

            return matchCategory && matchColor && matchMinPrice && matchMaxPrice;
        });

        setFilteredProducts(newFilteredProducts);
    };

    const nextImage = (id, imagesLength) => {
        setCurrentImageIndex((prevState) => ({
            ...prevState,
            [id]: (prevState[id] === undefined ? 1 : (prevState[id] + 1) % imagesLength),
        }));
    };

    const prevImage = (id, imagesLength) => {
        setCurrentImageIndex((prevState) => ({
            ...prevState,
            [id]: (prevState[id] === undefined ? imagesLength - 1 : (prevState[id] - 1 + imagesLength) % imagesLength),
        }));
    };

    return (
        <>
            <div className='container-products'>
                <Filtros applyFilters={applyFilters} />
                <div className="product-list">
                    {filteredProducts.map((produto) => {
                        const images = [produto.src, ...(produto.extra || [])];
                        const currentIdx = currentImageIndex[produto.id] || 0;

                        return (
                            <div
                                key={produto.id}
                                className="product-item"
                                onClick={() => {
                                    setProdutoSelecionado(produto);
                                    setModalOpen(true);
                                }}
                            >
                                <div className="product-image-wrapper">
                                    <img
                                        src={images[currentIdx]}
                                        alt={produto.nome}
                                        className="product-image"
                                    />
                                    <div className="image-controls">
                                        <button onClick={(e) => { e.stopPropagation(); prevImage(produto.id, images.length); }}>
                                            &lt;
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); nextImage(produto.id, images.length); }}>
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                                <h3>{produto.nome}</h3>
                                <h2>{produto.valor}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
            {produtoSelecionado && (
                <ModalProduto
                    produto={produtoSelecionado}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    addToCart={(produto) => {
                        adicionarAoCarrinho(produto);
                        // setModalOpen(false); 
                    }}
                />
            )}
        </>
    );
};

export default Products;