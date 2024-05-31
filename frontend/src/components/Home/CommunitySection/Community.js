import React from 'react'
import CSS from './Community.module.css'
import CommunityCard from './CommunityCard/CommunityCard'
import img1 from '../TrendProductSection/images/rabbitmeat2.jpg'
import img2 from '../TrendProductSection/images/rabbitmeat1.jpg'
import img3 from '../TrendProductSection/images/rabbitmeat3.jpg'
import abubakar from '../TrendProductSection/images/abubakar.jpg'
import umar from '../TrendProductSection/images/umar.JPG'
import ali from '../TrendProductSection/images/ali.JPG'


const Community = () => {
  const CommunityMember = [{
    title: "Rabbit Tales Unleashed!",
    subtitle: "Join the Community, Share Stories, and Savor the Taste of Fresh Rabbit.",
    memberName: "Abu Bakar Siddique",
    memberImg: abubakar,
    communityImg: img1
  }, {
    title: "Rabbit Tales Unleashed!",
    subtitle: "Join Our Community for Tasty Adventures with Fresh Organic Rabbit Meat.",
    memberName: "Umar Farooq",
    memberImg: umar,
    communityImg: img2
  }, {
    title: "Rabbit Delights Await!",
    subtitle: "Join the Thriving Community – Where Flavorful Rabbit Meat Takes Center Stage.",
    memberName: "Ali Ahmad",
    memberImg: ali,
    communityImg: img3
  }]
  return (
    <div className={`${CSS['community-container']} container-fluid`}>
      <div className='container'>
        <h1 className={CSS['community-title']}>Join our Community</h1>
        {CommunityMember.map((memberdata, index) => (
          <CommunityCard
            key={index}
            title={memberdata.title}
            subtitle={memberdata.subtitle}
            memberName={memberdata.memberName}
            memberImg={memberdata.memberImg}
            communityImg={memberdata.communityImg} />
        ))}
      </div>
    </div>
  )
}

export default Community