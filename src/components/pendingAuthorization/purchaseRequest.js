import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config'


export default class PurchaseRequest extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            edit: false,
            itemName: this.props.itemName,
            quantity: this.props.quantity,
            cost: this.props.cost,
            supplier: this.props.supplier,
            date: this.props.date,
            invoiceNumber: this.props.invoiceNumber,
            authorized: true
        };
    }
    handleChange = (event)=>{
        this.setState({ [event.target.id]: event.target.value });
        document.getElementById(event.target.id).classList.remove('border-danger')
    }

    calcAverageUnitCost = (prevData, newData)=>{
        let lastCost, lastQty, newCost, newQty;
        lastCost = parseInt(prevData.averageUnitCost) ;
        lastQty = parseInt(prevData.quantity) ;
        newCost = parseInt(newData.cost) ;
        newQty = parseInt(newData.quantity) ;

        console.log(lastCost);
        console.log(newCost);

        let averageUnitCost = ((lastCost * lastQty)+(newCost * newQty)) / (lastQty + newQty);
        return Math.ceil(averageUnitCost/100)*100;
    }



    handleSubmit = (event)=>{
        event.preventDefault();
        let sparePartDetails = this.props.sparePartDetailsByItemname(this.state.itemName)
        let purchaseHistory = {
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            cost: this.state.cost,
            supplier: this.state.supplier,
            date: this.state.date,
            invoiceNumber: this.state.invoiceNumber,
            authorized: true
        };
        
        let averageUnitCost = this.calcAverageUnitCost(sparePartDetails, this.state)
        console.log(this.state)
        let currentValue = {...sparePartDetails, quantity: parseInt(sparePartDetails.quantity) + parseInt(this.state.quantity), averageUnitCost: averageUnitCost}
        
        if (this.requiredFieldsAreFilled()){
            axios.get(`${API_URL}/api/purchasehistory/update/${this.props.id}`, purchaseHistory)
            //axios.post('http://localhost:5000/purchaseHistory/update/' +this.props.id, purchaseHistory) this will change to an update
            .then(res => {
                console.log(res.data)
                this.props.loadUnAuthorizedPurchases()
            })
            axios.get(`${API_URL}/api/sparepart/update/${sparePartDetails._id}`, currentValue)
            //axios.post('http://localhost:5000/spareParts/update/' +sparePartDetails._id, currentValue)
            .then(res => {
                console.log(res.data)
                if(res.status === 200){
                    this.props.loadAllSpareParts()
                }
                
            }) 
        }else{
            alert('Fill the required inputs')
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
        }
    }

    discardRequest = ()=>{
        axios.delete(`${API_URL}/api/purchasehistory/delete/${this.props.id}`)
        //axios.delete('http://localhost:5000/purchaseHistory/' + this.props.id)
            .then(res =>{
                if(res.status === 200){
                    console.log(res.data)
                    this.props.loadUnAuthorizedPurchases()
                }
            })
    }

    requiredFieldsAreFilled = ()=>{
        let result = true;
        if(this.state.itemName === ''){
            result = false
        }else if(this.state.quantity === ''){
            result = false
        }else if(this.state.cost === ''){
            result = false
        }else if(this.state.date === ''){
            result = false
        }
        return result;
    }
    unfilledRequiredInputs = ()=>{
        let unfilledRequiredInputs = [];
        if(this.state.itemName === ''){
            unfilledRequiredInputs.push('itemName')
        }if(this.state.quantity === '' ){
            unfilledRequiredInputs.push('quantity')
        }if(this.state.cost === ''){
            unfilledRequiredInputs.push('cost')
        }if(this.state.date === ''){
            unfilledRequiredInputs.push('date')
        }
        return unfilledRequiredInputs
    }

    itemNamesOptions(){
        let allItemNames = this.props.allItemNames;
        return(
            <>
                <option value="">Select a Spare Part</option>
                {allItemNames.map((category)=>{
                    return(
                        <option key={category} value={category}> {category}</option>
                    )
                })
                }
            </>
        )
    }

    itemName = ()=>{
        return this.state.edit ? 
        <select className="form-control form-control-sm bg-white" required readOnly style={this.border()}  id="itemName" onChange={this.handleChange}
            value={this.state.itemName}>
            {this.itemNamesOptions()}
        </select>
         :
         <input type="text" className="form-control form-control-sm bg-white" style={this.border()} required readOnly={!this.state.edit} id="itemName" onChange={this.handleChange} value={this.state.itemName}/>
    }

    editFields = ()=>{
        this.setState({edit: !this.state.edit})
    }
    border = ()=>{
       return this.state.edit ? {border: "1px solid black"} : {border: "none"}
    }
    approvePurchase = ()=>{
        if(this.props.userDetails.authorizePurchase){
            return <button className="btn btn-success btn-sm mb-2" onClick={this.handleSubmit}>Approve</button>
        }
    }
    editPurchase = ()=>{
        if(this.props.userDetails.recordPurchase){
            return <button className="btn btn-outline-secondary btn-sm mb-2" onClick={this.editFields}>Edit</button>
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
                        <label htmlFor="cost" className="col-md-3 col-form-label col-form-label-sm">
                            Cost (1 unit) <span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                            <input type="number" className="form-control form-control-sm bg-white" style={this.border()} required readOnly={!this.state.edit} id="cost" onChange={this.handleChange} 
                            value={this.state.cost}/>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label htmlFor="supplier" className="col-md-3 col-form-label col-form-label-sm">
                            Supplier
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white" style={this.border()} readOnly={!this.state.edit} id="supplier" onChange={this.handleChange} 
                            value={this.state.supplier}/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="datePurchased" className="col-md-3 col-form-label col-form-label-sm">
                            Date <span className="text-warning h5"> *</span>
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white border-0" id="date" required readOnly onChange={this.handleChange} 
                            value={this.state.date.substring(0, 10)}/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="invoiceNumber" className="col-md-3 col-form-label col-form-label-sm">
                            Invoice Number
                        </label>
                        <div className="col-md-5">
                            <input type="text" className="form-control form-control-sm bg-white" style={this.border()} readOnly={!this.state.edit} id="invoiceNumber" onChange={this.handleChange} 
                            value={this.state.invoiceNumber}/>
                        </div>
                    </div>
                </form>
                <div className="col-md-2 text-right py-3">
                    {this.editPurchase()} <br/>
                    {this.approvePurchase()} <br/>
                    <button className="btn btn-danger btn-sm" onClick={this.discardRequest}>Discard</button><br/>
                </div>
            </div>

            
            </>
        )
    }
}