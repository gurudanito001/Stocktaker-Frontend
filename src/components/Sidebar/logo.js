import React from 'react';
import menu from '../../images/menu-white.svg'

export default function Logo (props){
    const styles = {
        borderBottom: '1px solid white',
        color: 'white',
        boxShadow: '1px 7px 14px -7px rgba(0,0,0,0.7)'
        
    }

    return(
        <nav style={styles} className="navbar">
            <li className="d-flex align-items-center navbar-brand">
                <img src={menu} alt="menu button" width="30" className="p-2 d-xl-none mr-3" onClick={props.toggleSidebar}/>
                Company Name
            </li>
        </nav>
    )
}