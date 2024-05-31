import React, { useState } from 'react'
import CSS from './TitleSection.module.css'
import img from '../../../images/rabbit.jpg'
import {useNavigate  } from 'react-router-dom'


const TitleSection = ({fetchedData}) => {
    const [searchValue,setSearchvalue] = useState('');
    const navigate  = useNavigate ();
    const handleInputdata = (event) => {
      setSearchvalue(event.target.value);
    }
    const handleSearch = (event) =>{
      event.preventDefault();
      const foundItems = fetchedData.filter(item => item.productName.toLowerCase().includes(searchValue.toLowerCase()));
      sessionStorage.setItem('searchResults', JSON.stringify({ foundItems, searchValue }));
      navigate('/search-results');
    }
    return (
      <div >
        <div className={`${CSS.main} container`}>
          <div className={CSS['main-data']}>
            <h2 className={CSS['main-title']}>The Best place to buy fresh and organic Rabbit and its Meat</h2>
            <h6 className={CSS['main-subtitle']}>Shop by category, brand or products on sale!</h6>
            <form onSubmit={handleSearch}>
              <input name='search-input' type='text' className={CSS['input-field']} onChange={handleInputdata} value={searchValue} placeholder='What are you looking for?' spellCheck='true' />
              <i className={`${CSS['serach-icon']} fa-solid fa-magnifying-glass`}></i>
              <button type='submit' className={CSS['search-btn']}>Search</button>
            </form>
          </div>
          <div className={CSS['div-rabbit-img']}>
            <img src={img} alt='Rabbit Pic' className={CSS['main-rabbit-img']}/>
          </div>
        </div>
      </div>
  )
}

export default TitleSection