import React, { useState } from 'react';

const Filtros = ({ applyFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters({
            category: selectedCategory,
            color: selectedColor,
            minPrice: minPrice,
            maxPrice: maxPrice
        });
    };

    return (
        <div className='lista-filtros'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Categoria:</label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="Celulares">Celulares</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Sapatos">Sapatos</option>
                        <option value="Acessórios">Acessórios</option>
                    </select>
                </div>
                <div>
                    <label>Cor:</label>
                    <select onChange={(e) => setSelectedColor(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="Preto">Preto</option>
                        <option value="Branco">Branco</option>
                        <option value="Lilas">Lilás</option>
                    </select>
                </div>
                <div>
                    <label>Preço Mínimo:</label>
                    <input type="number" onChange={(e) => setMinPrice(e.target.value)} />
                </div>
                <div>
                    <label>Preço Máximo:</label>
                    <input type="number" onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <button type="submit">Aplicar Filtros</button>
            </form>
        </div>
    );
};

export default Filtros;
