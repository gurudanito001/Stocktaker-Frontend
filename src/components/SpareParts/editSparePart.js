import React from 'react';
import axios from 'axios';


export default class EditSparePart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            _id: this.props._id,
            itemName: this.props.itemName,
            category: this.props.category,
            manufacturer: this.props.manufacturer,
            partNumber: this.props.partNumber,
            model: this.props.model,
            serialNumber:this.props.serialNumber,
            reorderlevel: this.props.reorderlevel,
            description: this.props.description,
            quantity: this.props.quantity,
            averageUnitCost: this.props.averageUnitCost
        }
    }


    handleChange = (event)=>{
        if(event.target.id ==='category' || event.target.id ==='newCategory'){
            if(document.getElementById('newCategory').value === ''){
                this.setState({category: document.getElementById('category').value})
            }else{
                this.setState({category: document.getElementById('newCategory').value})
            }
        }else{
            this.setState({ [event.target.id]: event.target.value });
            document.getElementById(event.target.id).classList.remove('border-danger')
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        if(this.requiredFieldsAreFilled()){
            if(this.props.doesSparePartExist(this.state.itemName) === false || this.state.itemName.toLowerCase().trim() === this.props.itemName.toLowerCase().trim()){
                document.getElementById('itemnameErrorMessage').textContent = ""
                axios.post('http://localhost:5000/spareParts/update/' +this.state._id, this.state)
                    .then((res) => {
                        if(res.status === 200){
                            this.props.loadAllSpareParts()
                            document.getElementById('cancelEditItemForm').click()
                            this.props.setMessage('success', 'Spare Part Updated')
                            setTimeout(this.props.clearMessage, 5000)
                        }
                        
                    })
            }else{
                document.getElementById('itemnameErrorMessage').textContent = "Spare Part Already Exists"
                document.getElementById('itemName').classList.add('border-danger')
            }
        }else{
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
            //this.props.setWarningMessage('Fill out the highlighted fields')
        }
        
    }


    requiredFieldsAreFilled = ()=>{
        let result = true;
        if(document.getElementById('itemName').value === ''){
            result = false
        }else if(document.getElementById('reorderlevel').value === ''){
            result = false
        }
        return result;
    }
    unfilledRequiredInputs = ()=>{
        let unfilledRequiredInputs = [];
        if(document.getElementById('itemName').value === ''){
            unfilledRequiredInputs.push('itemName')
        }if(document.getElementById('reorderlevel').value === ''){
            unfilledRequiredInputs.push('reorderlevel')
        }
        return unfilledRequiredInputs
    }






    categoryOptions = () => {
        let allCategories = this.props.allCategories;
        return(
            <>
                <option value={null}>Select a category</option>
                {allCategories.map((category)=>{
                    return(
                        <option key={category} value={category}> {category}</option>
                    )
                })
                }
            </>
        )
    } 

    render() {
        return(
            
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-secondary" id="exampleModalLabel">Edit {this.props.itemName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form className="bg-white">
                        <div className="form-group row">
                            <label htmlFor="itemName" className="col-sm-4 col-form-label col-form-label-sm">
                                Item Name
                            </label>
                            <div className="col-sm-8">
                                <small className="d-block text-danger" id="itemnameErrorMessage"></small>
                                <input type="text" className="form-control form-control-sm" id="itemName" defaultValue={this.state.itemName} onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label col-form-label-sm">Category</label>
                            <div className="col-sm-4 pr-0">
                                <select className="form-control form-control-sm" id="category" defaultValue={this.props.category} onChange={this.handleChange}>
                                    {this.categoryOptions()}
                                </select>
                            </div>
                            <div className="col-sm-4 pl-0">
                                <input type="text" className="form-control form-control-sm" id="newCategory" placeholder="New Category"  onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="manufacturer" className="col-sm-4 col-form-label col-form-label-sm">Manufacturer</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm" id="manufacturer" defaultValue={this.state.manufacturer} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="partNumber" className="col-sm-4 col-form-label col-form-label-sm">Part Number</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm" id="partNumber" defaultValue={this.state.partNumber} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="model" className="col-sm-4 col-form-label col-form-label-sm">Model</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm" id="model" defaultValue={this.state.model} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="serialNumber" className="col-sm-4 col-form-label col-form-label-sm">Serial Number</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm" id="serialNumber" defaultValue={this.state.serialNumber}  onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="reorderlevel" className="col-sm-4 col-form-label col-form-label-sm">
                                Reorder Level
                            </label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control form-control-sm" id="reorderlevel" defaultValue={this.state.reorderlevel}  onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Description</label>
                            <div className="col-sm-8">
                                <textarea rows="3" className="w-100 rounded"  defaultValue={this.props.description} id="description"  onChange={this.handleChange}>

                                </textarea>
                            </div>
                        </div>
                        <input type="submit" className="btn btn-sm btn-success float-right" onClick={this.handleSubmit} value="Save" />
                        <a className="btn btn-sm btn-secondary text-white float-right mr-2" id="cancelEditItemForm" data-dismiss="modal" onClick={this.props.closeModal}>Discard</a>
                    </form>
                    </div>
                </div>
            </div>
        ) 
    }

}