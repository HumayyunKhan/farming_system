import React from 'react'
import CSS from './CommunityCard.module.css'
import { Link } from 'react-router-dom'

function CommunityCard(props) {
  return (
    <div className={CSS['wrapper-grid']}>
      <div className={CSS['card-container']}>
        <div className={CSS['card-img']}>
          <img className={CSS['img']} src={props.communityImg} alt='Rabbit' />
          <Link to={''} className={`${CSS['button-container']}`}>
            <button className={CSS['button']}>
              Join Community
            </button>
          </Link>
        </div>
        <div className={CSS['card-data-container']}>
          <h2 className={CSS['card-title']}>{props.title}</h2>
          <p className={CSS['card-subtitle']}>{props.subtitle}</p>
          <div className={CSS['card-user']}>
            <img className={CSS['card-user-img']} src={props.memberImg} alt='Community' />
            <p className={CSS['card-user-name']}>{props.memberName}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CommunityCard