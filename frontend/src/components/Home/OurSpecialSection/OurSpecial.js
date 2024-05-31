import React ,{useEffect,useState} from 'react';
import axios from "axios"
import CSS from './OurSpecial.module.css';
import OurSpecialCard from './OurSpecialCard/OurSpecialCard';

const OurSpecial = ({fetchedData}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1783/api/getproduct")
      .then((res) => {
        const sortedProducts = res.data.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        setProducts(sortedProducts.slice(0, 2));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className={CSS['special-div']}>
        <p className={CSS['special-title']}>Our Specialties</p>
      </div>
      {products.map((item) => (
        <OurSpecialCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OurSpecial;
