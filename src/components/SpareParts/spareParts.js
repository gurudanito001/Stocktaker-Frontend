import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PurchaseItem from './purchaseItem';
import UseItems from './useItems';

function TableRow (props){
    return(
        <>
            <th scope="row">{props.SN}</th>
            <td>
                <Link to={"sparepartdetails/" +props.id} className="text-dark">
                {props.itemName}
                </Link>
            </td>
            
            <td>{props.category}</td>

            <td>{props.quantity}</td>

            <td>{props.averageUnitCost}</td>
        </>
    )
}

export default class SpareParts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPurchaseModal: false,
            showUsageModal: false
        }
    } 

    sortTableItems = ()=>{
        let allItems = [];
        this.props.allSpareParts.map((item) => {
            allItems.push(item.itemName);
        })
        let sortedItems = allItems.sort();
        let sortedTableItems = [];
        sortedItems.map((sortedItem) => {
            this.props.allSpareParts.map((tableItem) => {
                if (sortedItem === tableItem.itemName) {
                    sortedTableItems.push(tableItem);
                }
            })
        })
        return sortedTableItems
    }

    allTableRows = ()=>{
        if(this.props.userDetails.viewInventoryRecords){
            return(
                this.sortTableItems().map((sparepart) =>{
                    return(
                        <tr key={sparepart._id}>
                            <TableRow 
                            id={sparepart._id}
                            SN={this.sortTableItems().indexOf(sparepart) + 1}
                            itemName={sparepart.itemName}
                            category={sparepart.category}
                            quantity={parseInt(sparepart.quantity)}
                            averageUnitCost={sparepart.averageUnitCost}/>
                        </tr>
                    )
                })
            )
        }else{
            return <tr><td></td><td className="text-danger h6"> You need permission to view this data</td></tr>
        }
        
        
    }

    purchaseModal = ()=>{
        if(this.state.showPurchaseModal){
            return(
                <PurchaseItem 
                    userDetails={this.props.userDetails}
                    allItemNames={this.props.allItemNames()}
                    closePurchaseModal={this.closePurchaseModal}
                    sparePartDetailsByItemname={this.props.sparePartDetailsByItemname}
                    loadAllSpareParts={this.props.loadAllSpareParts}
                    loadUnAuthorizedPurchases={this.props.loadUnAuthorizedPurchases}
                    setMessage={this.props.setMessage}
                    clearMessage={this.props.clearMessage}
                /> 
            )
        }
    }
    openPurchaseModal = ()=>{
        this.setState({showPurchaseModal: true})
        this.props.setActiveModal('cancelPurchaseModal')
    }
    closePurchaseModal = ()=>{
        this.setState({showPurchaseModal: false})
        this.props.resetActiveModal()
    }
    


    usageModal = ()=>{
        if(this.state.showUsageModal){
            return(
                <UseItems
                    userDetails={this.props.userDetails}
                    allItemNames={this.props.allItemNames()}
                    closeUsageModal={this.closeUsageModal}
                    allVehicles={this.props.allVehicles()}
                    sparePartDetailsByItemname={this.props.sparePartDetailsByItemname}
                    loadAllSpareParts={this.props.loadAllSpareParts}
                    updateSparePartDetails={this.props.updateSparePartDetails}
                    loadUnAuthorizedUsage={this.props.loadUnAuthorizedUsage}
                    setMessage={this.props.setMessage}
                    clearMessage={this.props.clearMessage}
                />
            )
        }
    }
    openUsageModal = ()=>{
        this.setState({showUsageModal: true})
        this.props.setActiveModal('cancelUseItemsModal')
    }
    closeUsageModal = ()=>{
        this.setState({showUsageModal: false})
        this.props.resetActiveModal()
    }

    newSparePartBtn = ()=>{
        if(this.props.userDetails.addNewSparePart){
            return <Link to="/newSparePart" className="btn btn-sm btn-outline-secondary mr-2">New Spare Part</Link>
        }
    }

    purchaseModalBtn = ()=>{
        if(this.props.userDetails.recordPurchase){
            return (
                <button className="btn btn-sm btn-outline-success mr-2" data-toggle="modal" data-target="#purchaseModal" onClick={this.openPurchaseModal}>
                    Purchase
                </button>
            )
        }
    }

    usageModalBtn = ()=>{
        if(this.props.userDetails.requestUsage){
            return (
                <button className="btn btn-sm btn-outline-danger mr-2" data-toggle="modal" data-target="#UsageModal"  onClick={this.openUsageModal}>
                    Usage
                </button>
            )
        }
    }

    
    render(){
        return (
            <div className="col px-4">
                <header className="clearfix">
                    <h4 className="float-left text-secondary pl-1">Spare Part Inventory</h4>
                    <span className="d-none d-md-inline float-right">
                        {this.newSparePartBtn()}
                        {this.purchaseModalBtn()}
                        {this.usageModalBtn()}
                    </span>

                    

                    <span className="d-block d-md-none float-right mr-1">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button">Reorder Item</button>
                                <button className="dropdown-item" type="button">Add New Item</button>
                                <button className="dropdown-item" type="button">Give Out Item</button>
                            </div>
                        </div>
                    </span>
                </header>


                <table className="table rounded bg-white">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{minWidth:'250px'}}>Item Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">On Hand</th>
                            <th scope="col">Av. Unit Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.allTableRows()}
                    </tbody>
                </table>

                <div className="modal" id="purchaseModal" tabIndex="-1" role="dialog" aria-labelledby="purchaseModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    {this.purchaseModal()}
                </div>

                <div className="modal" id="UsageModal" tabIndex="-1" role="dialog" aria-labelledby="UsageModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    {this.usageModal()}
                </div>
            </div>
            
        )
    }
}
