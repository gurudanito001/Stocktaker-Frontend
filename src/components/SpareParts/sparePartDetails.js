import React from 'react';
import EditSparePart from './editSparePart';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SparePartDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modalOpen: false,
            thisMonthPurchaseHistory: [],
            thisMonthUsageHistory: []

        }
    }

    componentDidMount = ()=>{
        const href = window.location.href;
        const id = href.substr(href.length-24, href.length).toString();
        axios.get('http://localhost:5000/purchaseHistory/findMonth/' + this.props.sparePartDetails(id).itemName)
            .then((res) =>{
                if(res.status === 200){
                    this.setState({thisMonthPurchaseHistory: res.data})
                }
            })
        axios.get('http://localhost:5000/usageHistory/findMonth/' + this.props.sparePartDetails(id).itemName)
            .then((res) =>{
                if(res.status === 200){
                    this.setState({thisMonthUsageHistory: res.data})
                }
            })
    }

    returnValue = (value)=>{
        if(value === ''){
            return 'Not Specified'
        }else {
            return value
        } 
    }

    openModal = ()=>{
        this.setState({modalOpen: true})
        this.props.setActiveModal('cancelEditItemForm')
    }

    closeModal = ()=>{
        this.setState({modalOpen: false})
        this.props.resetActiveModal()
    }
    modal = ()=>{
        const href = window.location.href;
        const id = href.substr(href.length-24, href.length).toString();
        if(this.state.modalOpen){
            return(
                <EditSparePart 
                    _id={this.props.sparePartDetails(id)._id}
                    itemName={this.props.sparePartDetails(id).itemName}
                    category={this.props.sparePartDetails(id).category}
                    manufacturer={this.props.sparePartDetails(id).manufacturer}
                    partNumber={this.props.sparePartDetails(id).partNumber}
                    model={this.props.sparePartDetails(id).model}
                    serialNumber={this.props.sparePartDetails(id).serialNumber}
                    reorderlevel={this.props.sparePartDetails(id).reorderlevel}
                    description={this.props.sparePartDetails(id).description}
                    quantity={this.props.sparePartDetails(id).quantity}
                    averageUnitCost={this.props.sparePartDetails(id).averageUnitCost}
                    
                    doesSparePartExist={this.props.doesSparePartExist}
                    loadAllSpareParts={this.props.loadAllSpareParts}
                    closeModal={this.closeModal}
                    onSubmit={this.props.updateSparePartDetails}
                    allCategories={this.props.allCategories}
                    setMessage={this.props.setMessage}
                    clearMessage={this.props.clearMessage}
                />
            
            )
        }
    }

    numberPurchased = ()=>{
        let result = 0
        this.state.thisMonthPurchaseHistory.map((history) =>{
            result += history.quantity
        })
        return result;
    }

    numberUsed = ()=>{
        let result = 0
        this.state.thisMonthUsageHistory.map((history) =>{
            result += history.quantity
        })
        return result;
    }


    render(){
        const href = window.location.href;
        const id = href.substr(href.length-24, href.length).toString();
        let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

        return(

            <div className="col px-4">
                <section className="card">
                    <header className="card-header bg-white clearfix">
                        <h5 className="d-inline-block text-secondary mb-0">Details For <span className="text-info">{this.props.sparePartDetails(id).itemName}</span></h5>
                    </header>
                    <div className="card-body clearfix">
                        <div className="row mb-0">
                            <span className="col-sm-2 text-secondary">Spare Part Name</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).itemName)}</span>
                            <span className="col-sm-4">
                                <button className="btn btn-sm btn-outline-secondary float-right" data-toggle="modal" data-target="#editSparePart" 
                                onClick={this.openModal}>
                                    Edit
                                </button>
                            </span>
                            
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Part Number</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).partNumber)}</span>
                        </div>


                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Manufacturer</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).manufacturer)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Model</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).model)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Serial Number</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).serialNumber)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Category</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).category)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">On Hand</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).quantity)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Reorder Level</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).reorderlevel)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Average Unit Cost</span>
                            <span className="col-sm-6">₦ {this.returnValue(this.props.sparePartDetails(id).averageUnitCost)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Created On</span>
                            <span className="col-sm-6">{this.props.sparePartDetails(id).createdAt.toString().substr(0,10)}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="col-sm-2 text-secondary">Description</span>
                            <span className="col-sm-6">{this.returnValue(this.props.sparePartDetails(id).description)}</span>
                        </div>
                    </div>



                    <div className="card-footer">
                    <header className="clearfix">
                        <h6 className="text-secondary d-inline-block">Statistics For {month[new Date().getMonth()]} {new Date().getFullYear()} </h6>
                        <button className="btn btn-link float-right py-0 text-secondary">
                            <Link to={"/itemHistory/" + this.props.sparePartDetails(id).itemName}>View History </Link> 
                        </button>
                    </header>

                    <div className="dropdown-divider"></div>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                            <td className="text-center lead text-info">{this.numberPurchased()}</td>
                            <td className="text-center lead text-info">{this.numberUsed()}</td>
                            <td className="text-center lead text-info">{this.props.sparePartDetails(id).quantity}</td>
                            <td className="text-center lead text-info">₦ {Math.ceil(this.numberPurchased() * this.props.sparePartDetails(id).averageUnitCost / 100) * 100}</td>
                            <td className="text-center lead text-info">₦ {Math.ceil(this.numberUsed() * this.props.sparePartDetails(id).averageUnitCost / 100) * 100}</td>
                            <td className="text-center lead text-info">₦ {Math.ceil(this.props.sparePartDetails(id).quantity * this.props.sparePartDetails(id).averageUnitCost / 100) * 100}</td>
                            </tr>
                            <tr>
                            <th className="text-center py-0 border-right" scope="col">Number Purchased</th>
                            <th className="text-center py-0 border-right" scope="col">Number Used</th>
                            <th className="text-center py-0 border-right" scope="col">Number On Hand</th>
                            <th className="text-center py-0 border-right" scope="col">Value Purchases</th>
                            <th className="text-center py-0 border-right" scope="col">Value Used</th>
                            <th className="text-center py-0 " scope="col">Value On Hand</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    











                    <div className="modal" id="editSparePart" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false">
                        {this.modal()}
                    </div> 
                </section>
            </div>
        )
    }
}