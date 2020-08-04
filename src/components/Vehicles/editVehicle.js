import React from 'react';
import axios from 'axios'


export default class EditVehicle extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            plateNumber: this.props.plateNumber,
            description: this.props.description
        };
    }

    handleChange = (event)=>{
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        console.log(this.props.id)
        axios.post('http://localhost:5000/vehicles/update/' +this.props.id, this.state)
            .then(res =>{
                if(res.status === 200){
                    this.props.loadAllVehicles()
                    this.props.closeEditVehicleModal()
                }
                
            })
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-secondary" id="exampleModalLabel">Edit Vehicle</h5>
                        <button type="button" id="closeEditVehicleModal" className="close" id="closeEditVehicleModal" data-dismiss="modal" aria-label="Close"
                            onClick={this.props.closeEditVehicleModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="bg-white p-0">
                            <div className="form-group row">
                                <label htmlFor="number" className="col-md-3 pr-0 col-form-label col-form-label-sm">
                                    Plate Number <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control form-control-sm" id="plateNumber" onChange={this.handleChange} defaultValue={this.props.plateNumber}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-md-3 pr-0 col-form-label col-form-label-sm">
                                    Description
                                </label>
                                <div className="col-md-9">
                                    <textarea className="form-control" id="description" onChange={this.handleChange} defaultValue={this.props.description} >
                                    </textarea>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-sm btn-success float-right" data-dismiss="modal" onClick={this.handleSubmit} value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
} 