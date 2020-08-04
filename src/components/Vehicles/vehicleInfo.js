import React from 'react';

export default class VehicleInfo extends React.Component{


    editVehicle = ()=>{
        if(this.props.userDetails.editVehicle){
            return (
                <button className="btn btn-sm btn-outline-secondary p-1" onClick={()=>{
                    this.props.openEditVehicleModal()
                    this.props.setCurrentlyEditedVehicle(
                        {
                            id: this.props.id,
                            plateNumber: this.props.plateNumber,
                            description: this.props.description
                        }
                    )
                }}
                data-toggle="modal" data-target="#EditVehicleModal">Edit</button>
            )
        }
    }

    render() {
        return (
            <>
            <section className="card p-3 my-2 clearfix">
                <div className="row mb-0">
                    <div className="col-10 mb-0">
                        <div className="row">
                            <span className="col-sm-3 text-secondary">Plate Number</span>
                            <span className="col-sm text-dark">{this.props.plateNumber}</span>
                        </div>
                    </div>
                    <div className="col-2 px-0 px-sm-3 mb-0 text-center text-sm-right">
                        {this.editVehicle()}
                    </div>
                    <div className="col-12 col-sm-10 mt-2 mt-sm-0 mb-0">
                        <div className="row">
                            <span className="col-sm-3 text-secondary">Description</span>
                            <span className="col-sm">{this.props.description}</span>
                        </div>
                    </div>
                </div>
            </section>
            
            </>
        )
    }
}