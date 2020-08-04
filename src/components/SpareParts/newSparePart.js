import React from 'react';
import axios from 'axios';
//import correct from '../../images/correct.svg';

export default class NewSparePart extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            newSparePart:{
                itemName: '',
                category: '',
                manufacturer: '',
                partNumber: '',
                model: '',
                serialNumber: '',
                quantity: 0,
                reorderlevel: 0,
                averageUnitCost: 0,
                description: '',
            },
            categoryOptions: []
            
        }
    }
    componentDidMount = ()=>{
        axios.get('http://localhost:5000/spareParts/categories')
            .then(res=>{this.setState({categoryOptions: res.data})})
    }
    handleChange = (event)=>{
        let newSparePart = this.state.newSparePart;
        if(event.target.id ==='category' || event.target.id ==='newCategory'){
            if(document.getElementById('newCategory').value === ''){
                newSparePart.category = document.getElementById('category').value;
                this.setState({newSparePart: newSparePart})
            }else{
                newSparePart.category = document.getElementById('newCategory').value
                this.setState({newSparePart: newSparePart})
            }
        }else{
            newSparePart[event.target.id] = event.target.value;
            this.setState({ newSparePart: newSparePart });
            document.getElementById(event.target.id).classList.remove('border-danger')
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        if (this.requiredFieldsAreFilled()){
            if(this.props.doesNewSparePartExist(this.state.newSparePart.itemName) === false){
                axios.post('http://localhost:5000/spareParts/add', this.state.newSparePart)
                .then(
                    (res)=>{
                        if(res.status === 200){
                            this.props.loadAllSpareParts()
                            this.props.setMessage('success', 'New Spare Part Added')
                            setTimeout(this.props.clearMessage, 5000)
                        }
                    }
                )
            }else{
                this.props.setMessage('danger','Sparepart Already Exists')
                setTimeout(this.props.clearMessage, 5000)
            }
            
                
        }else{
            this.unfilledRequiredInputs().map((inputId)=>{
                document.getElementById(inputId).classList.add('border-danger')
            })
        }
    }

    requiredFieldsAreFilled = ()=>{
        let result = true;
        if(document.getElementById('itemName').value === ''){
            result = false
        }else if(document.getElementById('quantity').value === ''){
            result = false
        }else if(document.getElementById('reorderlevel').value === ''){
            result = false
        }else if(document.getElementById('averageUnitCost').value === ''){
            result = false
        }
        return result;
    }
    unfilledRequiredInputs = ()=>{
        let unfilledRequiredInputs = [];
        if(document.getElementById('itemName').value === ''){
            unfilledRequiredInputs.push('itemName')
        }if(document.getElementById('quantity').value === ''){
            unfilledRequiredInputs.push('quantity')
        }if(document.getElementById('reorderlevel').value === ''){
            unfilledRequiredInputs.push('reorderlevel')
        }if(document.getElementById('averageUnitCost').value === ''){
            unfilledRequiredInputs.push('averageUnitCost')
        }
        return unfilledRequiredInputs
    }

    

    categoryOptions(){
        let allCategories = this.state.categoryOptions;
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
    
    render(){
        if(this.props.userDetails.addNewSparePart){
            return(
                <div className="col px-4">
                <header className="clearfix">
                    <h4 className="text-secondary d-inline-block float-left pl-1">Add New Spare Part</h4>
                </header>
                <section className="card">
                    <div className="card-body">
                        <form className="bg-white">
                            <div className="form-group row">
                                <label htmlFor="itemName" className="col-sm-2 col-form-label col-form-label-sm">
                                    Item Name <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-sm-6">
                                    <input type="text" required className="form-control form-control-sm" id="itemName" onChange={this.handleChange}/>
                                </div>
                            </div>
    
                            <div className="form-group row">
                                <label htmlFor="category" className="col-sm-2 col-form-label col-form-label-sm">Category</label>
                                <div className="col-sm-3">
                                    <select className="form-control form-control-sm" id="category" onChange={this.handleChange}>
                                        {this.categoryOptions()}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <input type="text" className="form-control form-control-sm" id="newCategory" onChange={this.handleChange} placeholder="New Category"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="manufacturer" className="col-sm-2 col-form-label col-form-label-sm">Manufacturer</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control form-control-sm" id="manufacturer" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="partNumber" className="col-sm-2 col-form-label col-form-label-sm">Part Number</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="partNumber"  onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="model" className="col-sm-2 col-form-label col-form-label-sm">Model</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control form-control-sm" id="model" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="serialNumber" className="col-sm-2 col-form-label col-form-label-sm">Serial Number</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control form-control-sm" id="serialNumber"  onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="quantity" className="col-sm-2 col-form-label col-form-label-sm">
                                    Quantity <span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-sm-4">
                                    <input type="number" required className="form-control form-control-sm" id="quantity"  onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="reorderlevel" className="col-sm-2 col-form-label col-form-label-sm">
                                    Reorder Level<span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-sm-4">
                                    <input type="number" required className="form-control form-control-sm" id="reorderlevel"  onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="initialCost" className="col-sm-2 col-form-label col-form-label-sm">
                                    Cost<span className="text-warning h5"> *</span>
                                </label>
                                <div className="col-sm-4">
                                    <input type="text" required className="form-control form-control-sm" id="averageUnitCost"   onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Description</label>
                                <div className="col-sm-6">
                                    <textarea rows="3" className="form-control w-100 rounded" id="description"  onChange={this.handleChange}>
    
                                    </textarea>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-sm btn-success mr-2" value="Save"  onClick={this.handleSubmit}/> 
                        </form>
                    </div>
                </section>
                </div>
            )
        }else{
            return <h5 className="text-danger"> You need Permission to view this Page</h5>
        }
        
    }
}