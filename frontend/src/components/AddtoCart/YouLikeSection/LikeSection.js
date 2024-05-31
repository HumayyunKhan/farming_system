import React,{useState,useEffect} from 'react'
import CSS from './LikeSection.module.css'
import LikeCard from './LikeCard/LikeCard'
import axios from 'axios'

const LikeSection = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:1783/api/getproduct")
            .then((res) => {
                const sortedProducts = res.data.sort((a, b) =>
                    a.productName.localeCompare(b.productName)
                );
                setProducts(sortedProducts.slice(0, 4));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={`${CSS['container-fluid']} container-fluid`}>
            <div className='container'>
                <h1 className={CSS['like-title']}>You might also like</h1>
                {products.map((item) => (
                    <LikeCard key={item._id} item={item}/>
                ))}
            </div>
        </div>
    )
}

export default LikeSection