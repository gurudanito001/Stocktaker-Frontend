import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';


export default class UsageRequest extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            edit: false,
            itemName: this.props.itemName,
            quantity: this.props.quantity,
            vehicleFor: this.props.vehicleFor,
            authorizedBy: this.props.authorizedBy,
            date: this.props.date,
            purpose: this.props.purpose,
            authorized: true
        };
    }
    handleChange = (event)=>{
        this.setState({ [event.target.id]: event.target.value });
        //document.getElementById(event.target.id).classList.remove('border-danger')
    }



     handleSubmit = (event)=>{
        event.preventDefault();
        if (this.requiredFieldsAreFilled()){
            let itemDetails = this.props.sparePartDetailsByItemname(this.state.itemName);
            let newItemDetails = { ...itemDetails, quantity: parseInt(itemDetails.quantity) - (parseInt(this.state.quantity))}
            let usageObj = {
                itemName: this.state.itemName,
                quantity: this.state.quantity,
                vehicleFor: this.state.vehicleFor,
                authorizedBy: this.state.authorizedBy,
                date: this.state.date,
                purpose: this.state.purpose,
                authorized: true
            }
            axios.post(`${API_URL}/api/spareparts/update/${newItemDetails._id}`, newItemDetails)
            //axios.post('http://localhost:5000/spareParts/update/' +newItemDetails._id, newItemDetails)
                .then( res =>{
                    console.log(res.data);
                    if(res.status === 200){
                        this.props.loadAllSpareParts()
                    }
                })
            axios.post(`${API_URL}/api/usagehistory/update/${this.props.id}`, usageObj)
            //axios.post('http://localhost:5000/usageHistory/update/' +this.props.id , usageObj)
                .then(res => {
                    console.log(res.data)
                    if(res.status === 200){
                        this.props.loadUnAuthorizedUsage()
                    }
                })
        }else{
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
        }
    }

    itemNamesOptions(){
        let allItemNames = this.props.allItemNames;
        return(
            <>
                <option value="" key="placeholder">Select a Spare Part</option>
                {allItemNames.map((category)=>{
                    return(
                        <option key={category} value={category}> {category}</option>
                    )
                })
                }
            </>
        )
    }

    vehiclesOptions() {
        let allVehicles = this.props.allVehicles;
        return (
            <>
                <option value="" key="placeholder">Select a Vehicle</option>
                {allVehicles.map((vehicle) => {
                    return (
                        <option key={vehicle} value={vehicle}> {vehicle}</option>
                    )
                })
                }
            </>
        )
    }

    discardRequest = ()=>{
        axios.delete(`${API_URL}/api/usagehistory/delete/${this.props.id}`)
        //axios.delete('http://localhost:5000/usageHistory/' + this.props.id)
            .then(res =>{
                if(res.status === 200){
                    console.log(res.data)
                    this.props.loadUnAuthorizedUsage()
                }
            })
    }

    requiredFieldsAreFilled = ()=>{
        let result = false;
        if(this.unfilledRequiredInputs().length === 0){
            result = true
        }
        return result;
    }
    unfilledRequiredInputs = ()=>{
        let unfilledRequiredInputs = [];
        if(this.state.itemName === ''){
            unfilledRequiredInputs.push('itemName')
        }if(this.state.quantity === ''){
            unfilledRequiredInputs.push('quantity')
        }if(this.state.vehicleFor === ''){
            unfilledRequiredInputs.push('vehicleFor')
        }if(this.state.date === ''){
            unfilledRequiredInputs.push('date')
        }
        return unfilledRequiredInputs
    }

    itemName = ()=>{
        return this.state.edit ? 
        <select className="form-control form-control-sm bg-white" required style={this.border()}  id="itemName" onChange={this.handleChange}
            value={this.state.itemName}>
            {this.itemNamesOptions()}
        </select>
         :
         <input type="text" className="form-control form-control-sm bg-white" style={this.border()} required readOnly id="itemName" onChange={this.handleChange} value={this.state.itemName}/>
    }

    vehicleFor = ()=>{
        return this.state.edit ? 
        <select className="form-control form-control-sm bg-white" required style={this.border()}  id="vehicleFor" onChange={this.handleChange}
            value={this.state.vehicleFor}>
            {this.vehiclesOptions()}
        </select>
         :
         <input type="text" className="form-control form-control-sm bg-white" style={this.border()} required readOnly id="vehicleFor" onChange={this.handleChange} value={this.state.vehicleFor}/>
    }

    editFields = ()=>{
        this.setState({edit: !this.state.edit})
    }
    border = ()=>{
       return this.state.edit ? {border: "1px solid black"} : {border: "none"}
    }
    approveUsage = ()=>{
        if(this.props.userDetails.authorizeUsage){
            return <button className="btn btn-success btn-sm mb-2" onClick={this.handleSubmit}>Approve</button>
        }
    }

    render(){
        return(
            <>
            <div className="row border rounded mb-3">
                <form className="col-md-10 bg-white p-3">
                    <div className="row">
                        <label htmlFor="itemName" className="col-md-3 col-form-label col-form-label-sm">
                            Item Name <span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                        {this.itemName()}
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="quantity" className="col-md-3 col-form-label col-form-label-sm">
                            Quantity <span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                            <input type="number" className="form-control form-control-sm bg-white" style={this.border()} required readOnly={!this.state.edit} id="quantity" onChange={this.handleChange} 
                            value={this.state.quantity}/>
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="vehicleFor" className="col-md-3 col-form-label col-form-label-sm">
                            Vehicle For<span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                            {this.vehicleFor()}
                            {/* <input type="text" className="form-control form-control-sm bg-white" style={this.border()} required readOnly={!this.state.edit} id="vehicleFor" onChange={this.handleChange} 
                            value={this.state.vehicleFor}/> */}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label htmlFor="authorizedBy" className="col-md-3 col-form-label col-form-label-sm">
                            Authorized By
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white" style={this.border()} readOnly={!this.state.edit} id="authorizedBy" onChange={this.handleChange} 
                            value={this.state.authorizedBy}/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="date" className="col-md-3 col-form-label col-form-label-sm">
                            Date <span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white border-0" id="date" required readOnly onChange={this.handleChange} 
                            value={this.state.date.substring(0, 10)}/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="purpose" className="col-md-3 col-form-label col-form-label-sm">
                            Purpose
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white" style={this.border()} readOnly={!this.state.edit} id="purpose" onChange={this.handleChange} 
                            value={this.state.purpose}/>
                        </div>
                    </div>
                </form>
                <div className="col-md-2 text-right py-3">
                    <button className="btn btn-outline-secondary btn-sm mb-2" onClick={this.editFields}>Edit</button><br/>
                    {this.approveUsage()} <br/>
                    <button className="btn btn-danger btn-sm" onClick={this.discardRequest}>Discard</button><br/>
                </div>
            </div>

            
            </>
        )
    }
}