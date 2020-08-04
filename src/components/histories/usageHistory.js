import React from 'react';

export default class UsageHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            windowWidth: window.innerWidth,
        }
    }

    renderUsageHistory = ()=>{
        return(
            this.props.usageHistory.map((history)=>{
                return(
                    <tr key={this.props.usageHistory.indexOf(history)}>
                        <th scope="row">{history.dateUsed}</th>
                        <td>{history.quantity}</td>
                        <td>{history.vehicleFor}</td>
                        <td>{history.authorizedBy}</td>
                        <td>{history.purpose}</td>
                  </tr>
                )
            })
        )
    }

    render(){
        console.log(this.props.usageHistory)
        return(
            <table className="table">
            <thead>
              <tr>
                <th scope="col">Date (YYYY-MM-DD)</th>
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
        )
    }
    
}