import React, { Fragment } from 'react';
import menu from '../images/menu.svg';
import bell from '../images/notifications-orange.svg';
import { Link } from 'react-router-dom';

const styles = {
    navbar: {
        boxShadow: '1px 5px 14px -7px rgba(0,0,0,0.7)',
        borderBottom: '1px solid white',
    },
    bellBadge:{
        color: "#B82601"
    },
    dropdownMenu: {
        minWidth: "240px",
        maxHeight: "500px",
        overflowY: "scroll"
    }
    
}
export default class TopNavbar extends React.Component{
    

    listOfUnAuthorizedPurchases = () => {
        if(this.props.userDetails.recordPurchase){
            return(
                this.props.unAuthorizedPurchases.map((data) =>{
                    return(
                        <Fragment key={data._id}>
                        <li  className="dropdown-item text-left p-0">
                            <Link to="/authorization" className="d-block text-decoration-none px-2 text-dark py-1">{data.itemName} 
                            <span className="badge badge-light ml-2" style={styles.bellBadge}>{data.quantity}</span> <br/>
                            <small className="text-muted">{data.date.substring(0, 10)}</small>
                            </Link>
                            <div className="dropdown-divider m-0"></div>
                        </li>
                        </Fragment>
                    )
                })
            )
        }else{
            return ('------------------')
        }
        
    }

    listOfUnAuthorizedUsage = () => {
        if(this.props.userDetails.requestUsage){
            return(
            this.props.unAuthorizedUsage.map((data) =>{
                return(
                    <Fragment key={data._id}>
                    <li  className="dropdown-item text-left p-0">
                        <Link to="/authorization" className="d-block text-decoration-none px-2 text-dark py-1">{data.itemName} 
                        <span className="badge badge-light ml-2" style={styles.bellBadge}>{data.quantity}</span> <br/>
                        <small className="text-muted">{data.date.substring(0, 10)}</small>
                        </Link>
                    </li>
                    </Fragment>
                )
            })
            )
        }else {
            return ('------------------')
        }
    }

    notificationNumber = () =>{
        if(this.props.userDetails.recordPurchase && this.props.userDetails.requestUsage){
            return (this.props.unAuthorizedPurchases.length + this.props.unAuthorizedUsage.length)
        }else if(this.props.userDetails.recordPurchase){
            return (this.props.unAuthorizedPurchases.length)
        }else if(this.props.userDetails.requestUsage){
            return (this.props.unAuthorizedUsage.length)
        }else{
            return 0
        }
    }
    render(){
        
        return(
            <nav style={styles.navbar} className="navbar navbar-light sticky-top bg-white mb-4">
                <li className="d-flex align-items-center navbar-brand">
                    <img src={menu} alt="menu button" width="30" className="p-2 mr-3" onClick={this.props.toggleSidebar} />
                    Inventory Application
                </li>
                <div className="dropdown ml-auto p-0">
                    <button className="btn bg-transparent dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="dropdownMenuButton">
                        <button className="btn btn-sm btn-danger" onClick={this.props.logout}>
                            Logout
                        </button>
                    </div>
                </div>
    
                <div className="dropdown">
                    <button className="btn bg-transparent" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={bell} alt="notification bell" width="21"/>
                        <span className="badge badge-light" style={styles.bellBadge}>
                            {this.notificationNumber()}
                            </span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right py-2 list-unstyled" aria-labelledby="dropdownMenuButton" style={styles.dropdownMenu}>
                        <h6 className="pl-2">Purchases</h6>
                        {this.listOfUnAuthorizedPurchases()}

                        <h6 className="pl-2 mt-2">Usage</h6>
                        {this.listOfUnAuthorizedUsage()}
                    </ul>
                </div>
            </nav>
        )
    }
}