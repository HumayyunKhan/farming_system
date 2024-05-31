import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CSS from './AboutUs.module.css'
import img from '../../images/about.png'
import Loader from '../Loader/Loader'

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <Header />
            <div className={`${CSS['container-fluid']} container-fluid`}>
              <div className='container'>
                <h1 className={CSS['aboutus-title']}>About Us</h1>
                <div className={CSS['aboutus-container']}>
                  <div className={CSS['aboutus-img']}>
                    <img className={CSS['img']} src={img} alt='img' />
                  </div>
                  <div className={CSS['aboutus-details']}>
                    <p>
                      Welcome to RR-Farming – your premier destination for high-quality rabbit, rabbit meat, organic chicken meat, and farm-fresh chicken eggs. We take pride in providing you with exceptional products sourced directly from our ethical and sustainable farming practices.
                    </p>
                    <p>
                      At RR-Farming, we are dedicated to excellence, ensuring every purchase supports humane farming practices and the highest standards of quality. Our commitment to ethical and sustainable agriculture guarantees that you receive the freshest and healthiest rabbit meat, organic chicken meat, and chicken eggs delivered right to your doorstep.
                    </p>
                    <p>
                      Explore our thoughtfully curated selection of rabbit cuts, rabbit meat, organic chicken meat, and farm-fresh chicken eggs online. Join us in transforming your culinary experience with RR-Farming – where premium quality meets exceptional flavor.
                    </p>

                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutUs