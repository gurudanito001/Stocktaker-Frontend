import React from 'react';
import axios from 'axios';


export default class PurchaseItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemName: '',
            quantity: '',
            cost: '',
            supplier: '',
            date: '',
            invoiceNumber: '',
            authorized: this.props.userDetails.authorizePurchase
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
        let sparepartUpdated, purchaseHistoryAdded ;
        if(this.requiredFieldsAreFilled()){
            if(this.props.userDetails.recordPurchase && this.props.userDetails.authorizePurchase){
                let sparePartDetails = this.props.sparePartDetailsByItemname(this.state.itemName)
                let purchaseHistory = this.state;
                let averageUnitCost = this.calcAverageUnitCost(sparePartDetails, this.state)
                let currentValue = {...sparePartDetails, quantity: parseInt(sparePartDetails.quantity) + parseInt(this.state.quantity), averageUnitCost: averageUnitCost}
                axios.post('http://localhost:5000/purchaseHistory/add', purchaseHistory)
                    .then(res => {
                        if(res.status === 200){
                            axios.post('http://localhost:5000/spareParts/update/' +sparePartDetails._id, currentValue)
                            .then(res => {
                                console.log(res.data)
                                if(res.status === 200){
                                    this.props.loadAllSpareParts()
                                    document.getElementById('cancelPurchaseModal').click()
                                    this.props.setMessage('success', 'Spare Part Purchase Recorded')
                                    setTimeout(this.props.clearMessage, 5000)
                                }
                            })
                        }
                    })
                
            }else if(this.props.userDetails.recordPurchase){
                let purchaseHistory = this.state;
                axios.post('http://localhost:5000/purchaseHistory/add', purchaseHistory)
                    .then(res => {
                        if(res.status === 200){
                            console.log(res.data)
                            this.props.loadUnAuthorizedPurchases()
                            document.getElementById('cancelPurchaseModal').click()
                            this.props.setMessage('success', 'Spare Part Purchase Recorded')
                        }
                    })
            }
        }else{
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
        }
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
    
    render(){

        return(
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-secondary" id="exampleModalLabel">Spare Parts Purchases</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closePurchaseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="bg-white p-0">
                            <div className="form-group row">
                                <label htmlFor="itemName" className="col-md-4 col-form-label col-form-label-sm">
                                    Item Name <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-md-8">
                                    <select className="form-control form-control-sm" id="itemName" onChange={this.handleChange}
                                    value={this.state.itemName}>
                                        {this.itemNamesOptions()}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="quantity" className="col-md-4 col-form-label col-form-label-sm">
                                    Quantity <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-md-8">
                                    <input type="number" className="form-control form-control-sm" id="quantity" onChange={this.handleChange} 
                                    value={this.state.quantity}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="cost" className="col-md-4 col-form-label col-form-label-sm">
                                    Cost (1 unit) <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-md-4 pr-0">
                                    <input type="number" className="form-control form-control-sm" id="cost" onChange={this.handleChange} 
                                    value={this.state.cost}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="supplier" className="col-md-4 col-form-label col-form-label-sm">
                                    Supplier
                                </label>
                                <div className="col-md-8">
                                    <input type="text" className="form-control form-control-sm" id="supplier" onChange={this.handleChange} 
                                    value={this.state.supplier}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="datePurchased" className="col-md-4 col-form-label col-form-label-sm">
                                    Date <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-md-8">
                                    <input type="date" className="form-control form-control-sm" id="date" onChange={this.handleChange} 
                                    value={this.state.date}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="invoiceNumber" className="col-md-4 col-form-label col-form-label-sm">
                                    Invoice Number
                                </label>
                                <div className="col-md-8">
                                    <input type="text" className="form-control form-control-sm" id="invoiceNumber" onChange={this.handleChange} 
                                    value={this.state.invoiceNumber}/>
                                </div>
                            </div>
                            
                            <input type="submit" className="btn btn-sm btn-success float-right mr-2" onClick={this.handleSubmit} value="Save" />
                            <a className="btn btn-sm btn-secondary text-white float-right mr-2" id="cancelPurchaseModal" data-dismiss="modal" onClick={this.props.closePurchaseModal}>Cancel</a>
                            
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}