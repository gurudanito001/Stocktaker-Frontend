import React from 'react';
import axios from 'axios';
//import correct from '../../images/correct.svg';

export default class NewVehicle extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            plateNumber: '',
            description: '',
        }
    }



    handleChange = (event)=>{
        this.setState({ [event.target.id]: event.target.value });
        document.getElementById(event.target.id).classList.remove('border-danger')
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        if (this.requiredFieldsAreFilled()){
            axios.post('http://localhost:5000/vehicles/add', this.state)
                .then( res => {
                    if(res.status === 200){
                        this.props.loadAllVehicles()
                        this.props.closeNewVehicleModal()
                    }
                    
                })
        }else{
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
            //this.props.setWarningMessage('Fill out the highlighted fields')
        }
    }

    requiredFieldsAreFilled = ()=>{
        let result = true;
        if(document.getElementById('plateNumber').value === ''){
            result = false
        }
        return result;
    }
    unfilledRequiredInputs = ()=>{
        let unfilledRequiredInputs = [];
        if(document.getElementById('plateNumber').value === ''){
            unfilledRequiredInputs.push('plateNumber')
        }
        return unfilledRequiredInputs
    }
    
    render(){

        return(
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-secondary" id="exampleModalLabel">Add New Vehicle</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeNewVehicleModal" onClick={this.props.closeNewVehicleModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="bg-white clearfix">
                            <div className="form-group row">
                                <label htmlFor="plateNumber" className="col-sm-4 col-form-label col-form-label-sm">
                                    Plate Number <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-sm-8">
                                    <input type="text" required className="form-control form-control-sm" id="plateNumber" onChange={this.handleChange} />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Description</label>
                                <div className="col-sm-8">
                                    <textarea rows="3" className="form-control w-100 rounded" id="description" onChange={this.handleChange}>
                                    </textarea>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-sm btn-success mr-2 float-right" data-dismiss="modal" value="Save" onClick={this.handleSubmit} />
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}