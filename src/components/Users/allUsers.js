import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import user from '../../images/user.svg';

function User (props) {

    let returnPosition = (position)=>{
        if (position !== ''){
            return position
        } else{
            return "Not Specified"
        }
    }

    const grantPrivileges = () =>{
        if(props.grantPrivileges){
            return <Link to={"/editUsers/" + props.id} className="btn btn-link text-success float-left p-0"> User Access </Link>
        }
    }
    return(
        <div className="card mb-3 mx-auto mx-md-0" style={{maxWidth: "540px"}}>
            <div className="row no-gutters">
                <div className="col-sm-4">
                    <div className="card-header h-100 bg-light text-center d-flex align-items-center justify-content-center py-4 border-0">
                        <img src={user} className="card-img" alt="avatar" style={{width:"100px"}} />
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card-body clearfix">
                        <div className="row mb-1">
                            <span className="col-sm-4 text-secondary">Full Name</span>
                            <span className="col-sm-8">{props.fullname}</span>
                        </div>
                        <div className="row mb-1">
                            <span className="col-sm-4 text-secondary">Gender</span>
                            <span className="col-sm-8">{props.gender}</span>
                        </div>
                        <div className="row mb-1">
                            <span className="col-sm-4 text-secondary">Email</span>
                            <span className="col-sm-8">{props.email}</span>
                        </div>
                        <div className="row mb-1">
                            <span className="col-sm-4 text-secondary">Position</span>
                            <span className="col-sm-8">
                                {returnPosition(props.position)}
                            </span>
                        </div>
                        {grantPrivileges()}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default class AllUsers extends React.Component{
 
    renderAllUsers = ()=>{
        if(this.props.userDetails.viewUsers){
            return(
                this.props.allUsers.map((user)=>{
                    return(
                        <Fragment key={user._id}>
                            <User
                            grantPrivileges={this.props.userDetails.grantUserPrivileges}
                            id={user._id}
                            fullname={user.fullname}
                            gender={user.gender}
                            email={user.email}
                            position={user.position}
                            />
                        </Fragment>
                    )
                })
            )
        }else{
            return <h5 className="text-danger"> You need permission to view this page</h5>
        }
    }

    render(){
            return (
                <div className="col px-4 pb-4">
                    {this.renderAllUsers()}
                </div>
                
            )
        
    }
}
