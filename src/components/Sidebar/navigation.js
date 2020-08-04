import React from 'react';
import { Link } from 'react-router-dom';
import spareparts from '../../images/spareparts.svg';
import truck from '../../images/truck.svg';
import history from '../../images/history.svg';
import user from '../../images/user.svg'




export default function Navigation (props){
    const closeOpenModal = ()=>{
        if(props.openModal !== ''){
            document.getElementById(props.openModal).click()
        }
    }
    return(
        <>
            
        <ul className="list-unstyled p-0 m-0">
            <li>
                <Link to="/users" style={{boxShadow:'none'}}
                className="btn btn-outline-secondary btn-block d-flex align-items-center text-white p-3 border-0 m-0" onClick={()=>{
                    closeOpenModal()
                }}>
                    <img src={user} alt="user icon" height="22" className="mr-2"/>Users
                </Link>
            </li>

            <li>
                <Link to="/" style={{boxShadow:'none'}}
                className="btn btn-outline-secondary btn-block d-flex align-items-center text-white p-3 border-0 m-0" onClick={()=>{
                    closeOpenModal()
                }}>
                    <img src={spareparts} alt="spareparts icon" height="22" className="mr-2"/>Spare Parts
                </Link>
            </li>

            <li>
                <Link to="/vehicles" style={{boxShadow:'none'}}
                className="btn btn-outline-secondary btn-block d-flex align-items-center text-white p-3 border-0 m-0" onClick={()=>{
                    closeOpenModal()
                }}>
                    <img src={truck} alt="Truck icon" height="22" className="mr-2"/>Vehicles
                </Link>
            </li>

            <li>
                <Link to="/history" style={{boxShadow:'none'}}
                className="btn btn-outline-secondary btn-block d-flex align-items-center text-white p-3 border-0 m-0" onClick={()=>{
                    closeOpenModal()
                }}>
                    <img src={history} alt="History icon" height="22" className="mr-2"/>History
                </Link>
            </li>
            
        </ul>


        </>
    )
}
