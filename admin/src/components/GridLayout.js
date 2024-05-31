import React from 'react'
import CSS from './GridLayout.module.css'
import SideBar from '../pages/DashBoard/SideBar/SideBar'

const GridLayout = (props) => {
  return (
    <div className={CSS['grid']}>
    <h1 className={CSS['Dashboard-title']}>DashBoard</h1>
    <div className={`${CSS['grid-container']} container-fluid`}>
        <div className={CSS['category-filter']}>
            <SideBar/>
        </div>
        <div className={CSS['product']}>
            {props.children}
        </div>
    </div>
</div>
  )
}

export default GridLayout