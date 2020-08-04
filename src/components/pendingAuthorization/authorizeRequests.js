import React, { Fragment } from 'react';
import axios from 'axios';
import PurchaseRequest from './purchaseRequest'
import UsageRequest from './usageRequests'


export default class AuthorizeRequests extends React.Component{

    purchaseRequests = ()=>{
        return this.props.purchaseRequests.map((req) =>{
            return(
                <Fragment key={req._id}>
                    <PurchaseRequest 
                    id={req._id}
                    itemName={req.itemName}
                    quantity={req.quantity}
                    cost={req.cost}
                    supplier={req.supplier}
                    date={req.date}
                    invoiceNumber={req.invoiceNumber}
                    authorized={req.authorized}
                    allItemNames={this.props.allItemNames}
                    userDetails={this.props.userDetails}
                    
                    sparePartDetailsByItemname={this.props.sparePartDetailsByItemname}
                    loadUnAuthorizedPurchases={this.props.loadUnAuthorizedPurchases}
                    loadAllSpareParts={this.props.loadAllSpareParts}
                    />
                </Fragment>
            )
        })
    }

    usageRequests = ()=>{
            return this.props.usageRequests.map((req) =>{
                return(
                    <Fragment key={req._id}>
                        <UsageRequest 
                        id={req._id}
                        itemName={req.itemName}
                        quantity={req.quantity}
                        vehicleFor={req.vehicleFor}
                        authorizedBy={req.authorizedBy}
                        date={req.date}
                        purpose={req.purpose}
                        authorized={req.authorized}
                        userDetails={this.props.userDetails}

                        allItemNames={this.props.allItemNames}
                        allVehicles={this.props.allVehicles}
                        sparePartDetailsByItemname={this.props.sparePartDetailsByItemname}
                        loadUnAuthorizedUsage={this.props.loadUnAuthorizedUsage}
                        loadAllSpareParts={this.props.loadAllSpareParts}
                        />
                    </Fragment>
                )
            })
    }
    
    render(){
        return(
            <div className="col px-4">
                <section className="card border-0">
                    <div className="card-header p-0 bg-transparent border-0">
                        <h5>Purchase Records</h5>
                    </div>
                    <div className="card-body px-3">
                        {this.purchaseRequests()}
                    </div>

                    <div className="border border-secondary dropdown-divider pt-0 mt-0 mb-4"></div>

                    <div className="card-header p-0 bg-transparent border-0">
                        <h5>Usage Requests</h5>
                    </div>
                    <div className="card-body px-3">
                        {this.usageRequests()}
                    </div>
                    
                </section>
            </div>
        )
    }
}