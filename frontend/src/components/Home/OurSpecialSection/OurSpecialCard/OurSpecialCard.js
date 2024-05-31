import React from 'react';
import CSS from './OurSpecialCard.module.css';
import { Link } from 'react-router-dom';

const OurSpecialCard = ({ item }) => {

    const handleCardClick = () => {
        const itemDetails = {
            _id: item._id,
            title: item.productName,
            newPrice: item.newPrice,
            oldPrice: item.oldPrice,
            description: item.description,
            quantity: item.quantity,
            img: `http://localhost:1783/Images/${item.productImage}`,
        };
        sessionStorage.setItem("clickedItem", JSON.stringify(itemDetails));
    };

    return (
        <div className={CSS['special-container']} >
            <div className={CSS['card-img']}>
                <img className={CSS['img']} src={`http://localhost:1783/Images/${item.productImage}`} alt={item.productName} />
                <div className={`${CSS['button-container']} button-container`}>
                    <p className={CSS['title']}>{item.productName}</p>
                    <p className={CSS['para']}>{item.description}</p>
                    <Link to={'/addtocart'}>
                        <button onClick={handleCardClick} className={CSS['button']} >Shop now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OurSpecialCard;
