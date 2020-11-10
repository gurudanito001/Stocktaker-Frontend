import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

export default class ItemHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            purchaseHistory: [],
            usageHistory: []
        }
    }

    componentDidMount = ()=>{
        let name = this.props.match.params.itemName
        axios.get(`${API_URL}/api/purchasehistory/getitempurchasehistory/${name}`)
        //axios.get('http://localhost:5000/purchaseHistory/find/' + name)
            .then(res => {
            console.log(res.data)
            if(res.status === 200){
                this.setState({purchaseHistory: res.data})
            }
            })
        axios.get(`${API_URL}/api/usagehistory/getitemusagehistory/${name}`)
        //axios.get('http://localhost:5000/usageHistory/find/' + name)
            .then(res => {
              if(res.status === 200){
                this.setState({usageHistory: res.data})
              }
            })
    }




    renderUsageHistory = ()=>{
        return(
            this.state.usageHistory.map((history)=>{
                return(
                    <tr key={this.state.usageHistory.indexOf(history)}>
                        <th scope="row">{history.date.substring(0,10)}</th>
                        <td>{history.itemName}</td>
                        <td>{history.quantity}</td>
                        <td>{history.vehicleFor}</td>
                        <td>{history.authorizedBy}</td>
                        <td>{history.purpose}</td>
                  </tr>
                )
            })
        )
    }

    renderPurchaseHistory = ()=>{
        return(
            this.state.purchaseHistory.map((history)=>{
                return(
                    <tr key={this.state.purchaseHistory.indexOf(history)}>
                        <th scope="row">{history.date.substring(0,10)}</th>
                        <td>{history.itemName}</td>
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

        return(
            <section className="card">
                <header className="card-header bg-white clearfix">
                <h5 className="d-inline-block text-secondary mb-0">History of <span className="text-info">{this.props.match.params.itemName}</span></h5>
                </header>

                <div className="card-body clearfix">

                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active"
                            id="purchase-tab" data-toggle="pill" href="#purchase" role="tab" aria-controls="purchase" aria-selected="true">Purchase</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" 
                            id="usage-tab" data-toggle="pill" href="#usage" role="tab" aria-controls="usage" aria-selected="false">Usage</a>
                        </li>

                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="purchase" role="tabpanel" aria-labelledby="purchase-tab">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Date (YYYY-MM-DD)</th>
                                    <th scope="col">Item Name</th>
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
                        </div>

                        <div className="tab-pane fade" id="usage" role="tabpanel" aria-labelledby="usage-tab">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Date (YYYY-MM-DD)</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Qty. Used</th>
                                    <th scope="col">Vehicle For</th>
                                    <th scope="col">Authorized By</th>
                                    <th scope="col">Purpose</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderUsageHistory()}
                                </tbody>
                            </table> 
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}