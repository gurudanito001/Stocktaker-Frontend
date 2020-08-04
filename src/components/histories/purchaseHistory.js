import React from 'react';

export default class PurchaseHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            windowWidth: window.innerWidth,
        }
    }

    renderPurchaseHistory = ()=>{
        return(
            this.props.purchaseHistory.map((history)=>{
                return(
                    <tr key={this.props.purchaseHistory.indexOf(history)}>
                        <th scope="row">{history.datePurchased}</th>
                        <td>{history.quantity}</td>
                        <td>{history.cost}</td>
                        <td>{history.supplier}</td>
                        <td>{history.invoiceNumber}</td>
                  </tr>
                )
            })
        )
    }

    render(){
        console.log(this.props.purchaseHistory)
        return(
            <table className="table">
            <thead>
              <tr>
                <th scope="col">Date (YYYY-MM-DD)</th>
                <th scope="col">Quantity</th>
                <th scope="col">Cost (1 unit)</th>
                <th scope="col">Supplier</th>
                <th scope="col">Invoice Number</th>
              </tr>
            </thead>
            <tbody>
                {this.renderPurchaseHistory()}
            </tbody>
          </table> 
        )
    }
    
}