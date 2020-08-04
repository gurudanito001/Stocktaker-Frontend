import React from 'react';
import axios from 'axios';

export default class UserAccess extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            disableSubmitBtn: false,
            userDetails: {}
        }
    }

    componentDidMount = ()=>{
        this.setUserDetails()
    } 

    setUserDetails = ()=>{
        let href = window.location.href;
        let id = href.substr(href.length-24, href.length).toString();
        let userDetails = this.props.userAccessDetails(id);
        this.setState({userDetails: userDetails});
    }

    //componentWillReceiveProps has been labelled unsafe in recent versions of React 
    componentWillReceiveProps = ()=>{
        this.setUserDetails()
    }

    handleChange = (event)=>{
        let userDetails = this.state.userDetails;
        userDetails.position = event.target.value;
        this.setState({userDetails: userDetails});
    }

    setUserPrivilege = (id)=>{
        let userDetails = this.state.userDetails;
        userDetails[id] = !userDetails[id];
        this.setState({userDetails:userDetails});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({disableSubmitBtn: true})
        let userDetails = this.state.userDetails;

        axios.post('http://localhost:5000/users/update/' + this.state.userDetails._id, userDetails)
            .then((res) => {
                if (res.status === 200) {
                    this.props.updateUserDetails(userDetails)
                    this.props.setMessage('success', 'User Details Updated')
                    setTimeout(this.props.clearMessage, 5000)
                    this.setState({disableSubmitBtn: false})
                }
            })
    }

    render(){
        if(this.props.userDetails.grantUserPrivileges){
            return (
                <div className="col px-4 pb-5">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row mb-1">
                            <span className="col-sm-2 text-secondary">Full Name</span>
                            <span className="col-sm-8">{this.state.userDetails.fullname}</span>
                        </div>
                        <div className="row mb-1">
                            <span className="col-sm-2 text-secondary">Gender</span>
                            <span className="col-sm-8">{this.state.userDetails.gender}</span>
                        </div>
                        <div className="row mb-1">
                            <span className="col-sm-2 text-secondary">Email</span>
                            <span className="col-sm-8">{this.state.userDetails.email}</span>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="position" className="col-sm-2 col-form-label  text-secondary">Position</label>
                            <div className="col-sm-8">
                                <input type="text"  className="form-control form-control-sm" id="position" style={{maxWidth:"300px"}} defaultValue={this.state.userDetails.position} onChange={this.handleChange}/>
                            </div>
                        </div> 

    
                        <div className="dropdown-divider w-50"></div>
    
                        <h6 className="mt-3">Users</h6>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.viewUsers} className="custom-control-input" id="viewUsers" onChange={()=>{this.setUserPrivilege("viewUsers")}}/>
                            <label className="custom-control-label" htmlFor="viewUsers">View Users</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.grantUserPrivileges} value={this.state.userDetails.grantUserPrivileges}  className="custom-control-input" id="grantUserPrivileges" onChange={()=>{this.setUserPrivilege("grantUserPrivileges")}}/>
                            <label className="custom-control-label" htmlFor="grantUserPrivileges">Grant User Privileges</label>
                        </div>
    
                        <h6 className="mt-3">Spare Parts</h6>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.viewInventoryRecords} value={this.state.userDetails.viewInventoryRecords}  className="custom-control-input" id="viewInventoryRecords" onChange={()=>{this.setUserPrivilege("viewInventoryRecords")}}/>
                            <label className="custom-control-label" htmlFor="viewInventoryRecords">View Inventory Records</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.addNewSparePart} value={this.state.userDetails.addNewSparePart} className="custom-control-input" id="addNewSparePart"  onChange={()=>{this.setUserPrivilege("addNewSparePart")}}/>
                            <label className="custom-control-label" htmlFor="addNewSparePart">Add New Spare Part</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.recordPurchase} value={this.state.userDetails.recordPurchase} className="custom-control-input" id="recordPurchase"  onChange={()=>{this.setUserPrivilege("recordPurchase")}}/>
                            <label className="custom-control-label" htmlFor="recordPurchase">Record Purchase</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.requestUsage} value={this.state.userDetails.requestUsage} className="custom-control-input" id="requestUsage"  onChange={()=>{this.setUserPrivilege("requestUsage")}}/>
                            <label className="custom-control-label" htmlFor="requestUsage">Request Usage</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.authorizePurchase} value={this.state.userDetails.authorizePurchase} className="custom-control-input" id="authorizePurchase"  onChange={()=>{this.setUserPrivilege("authorizePurchase")}}/>
                            <label className="custom-control-label" htmlFor="authorizePurchase">Authorize Purchase</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.authorizeUsage} value={this.state.userDetails.authorizeUsage} className="custom-control-input" id="authorizeUsage"  onChange={()=>{this.setUserPrivilege("authorizeUsage")}}/>
                            <label className="custom-control-label" htmlFor="authorizeUsage">Authorize Usage</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.viewItemHistory} value={this.state.userDetails.viewItemHistory} className="custom-control-input" id="viewItemHistory"  onChange={()=>{this.setUserPrivilege("viewItemHistory")}}/>
                            <label className="custom-control-label" htmlFor="viewItemHistory">View Item History</label>
                        </div>
    
                        <h6 className="mt-3">Vehicles</h6>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.viewAllVehicles} value={this.state.userDetails.viewAllVehicles} className="custom-control-input" id="viewAllVehicles"  onChange={()=>{this.setUserPrivilege("viewAllVehicles")}}/>
                            <label className="custom-control-label" htmlFor="viewAllVehicles">View All Vehicles</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.addNewVehicle} value={this.state.userDetails.addNewVehicle} className="custom-control-input" id="addNewVehicle"  onChange={()=>{this.setUserPrivilege("addNewVehicle")}}/>
                            <label className="custom-control-label" htmlFor="addNewVehicle">Add New Vehicle</label>
                        </div>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.editVehicle} value={this.state.userDetails.editVehicle} className="custom-control-input" id="editVehicle"  onChange={()=>{this.setUserPrivilege("editVehicle")}}/>
                            <label className="custom-control-label" htmlFor="editVehicle">Edit Vehicle</label>
                        </div>
    
                        <h6 className="mt-3">History</h6>
                        <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" checked={this.state.userDetails.viewHistory} value={this.state.userDetails.viewHistory} className="custom-control-input" id="viewHistory"   onChange={()=>{this.setUserPrivilege("viewHistory")}}/>
                            <label className="custom-control-label" htmlFor="viewHistory">View History</label>
                        </div>
    
                        <button type="submit" disabled={this.state.disableSubmitBtn}  className="btn btn-primary mt-3" id="userAccessSubmitBtn">Save Changes
                        </button>
                    </form>
                </div>
                
            )
        }else{
            return <h5 className="text-danger"> You need Permission to view this Page</h5>
        }
        }
        
}
