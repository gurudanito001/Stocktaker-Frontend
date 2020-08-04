import React, { Fragment } from 'react';
import NewVehicle from './newVehicle';
import EditVehicle from './editVehicle';
import VehicleInfo from './vehicleInfo';


export default class AllVehicles extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showNewVehicleModal: false,
            showEditVehicleModal: false,
            currentlyEditedVehicle: {
                id: "",
                plateNumber: "",
                description: ""
            }
        }
    }

    setCurrentlyEditedVehicle = (vehicleData)=>{
        this.setState({currentlyEditedVehicle: vehicleData})
    }

    renderAllVehicles = ()=>{
        return(
            <>
                {this.props.allVehicles.map((vehicle) => {
                return(
                    <Fragment key={vehicle._id}>
                        <VehicleInfo
                        id={vehicle._id}
                        userDetails={this.props.userDetails}
                        plateNumber={vehicle.plateNumber}
                        description={vehicle.description}
                        setCurrentlyEditedVehicle={this.setCurrentlyEditedVehicle}
                        openEditVehicleModal={this.openEditVehicleModal}
                        />
                    </Fragment>
                )
                })}
            </>
        )
    }

    newVehicleModal = ()=>{
        if(this.state.showNewVehicleModal){
            return(
                <NewVehicle
                closeNewVehicleModal={this.closeNewVehicleModal}
                loadAllVehicles={this.props.loadAllVehicles}/>
            )
        }
    }

    newVehicleBtn = ()=>{
        if(this.props.userDetails.addNewVehicle){
            return (
                <button className="btn btn-sm btn-outline-success float-right mr-2"  data-toggle="modal" data-target="#NewVehicleModal"
                    onClick={this.openNewVehicleModal}>
                    Add New vehicle
                </button>
            )
        }
    }
    editVehicleModal = ()=>{
        if(this.state.showEditVehicleModal){
            return(
                <EditVehicle
                id={this.state.currentlyEditedVehicle.id}
                plateNumber={this.state.currentlyEditedVehicle.plateNumber}
                description={this.state.currentlyEditedVehicle.description}
                closeEditVehicleModal={this.closeEditVehicleModal}
                loadAllVehicles={this.props.loadAllVehicles}/>
            )
        }
    }
    openNewVehicleModal = ()=>{
        this.setState({showNewVehicleModal: true})
        this.props.setActiveModal('closeNewVehicleModal')
    }
    closeNewVehicleModal = ()=>{
        this.setState({showNewVehicleModal: false})
        this.props.resetActiveModal()
    }

    openEditVehicleModal = ()=>{
        this.setState({showEditVehicleModal: true})
        this.props.setActiveModal('closeEditVehicleModal')
    }
    closeEditVehicleModal = ()=>{
        this.setState({showEditVehicleModal: false})
        this.props.resetActiveModal()
    }

    render(){
        if(this.props.userDetails.viewAllVehicles){
            return(
                <div className="col px-4">
                    <section className="card border-0">
                    <header className="clearfix card-header bg-transparent py-0">
                        <h4 className="float-left text-secondary pl-1">All Vehicles</h4>
                        {this.newVehicleBtn()}
                    </header> 
                    <div className="card-body p-1 p-lg-3 clearfix">
                        {this.renderAllVehicles()}
                    </div>
    
    
                    <div className="modal" id="NewVehicleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  data-backdrop="static" data-keyboard="false">
                        {this.newVehicleModal()}
                    </div>
    
                    <div className="modal" id="EditVehicleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  data-backdrop="static" data-keyboard="false">
                        {this.editVehicleModal()}
                    </div>
    
                    </section>
                </div>
            )
        }else{
            return (
                <div className="col px-4">
                    <h5 className="text-danger"> You need permission to view this page</h5>
                </div>
            )
        }
        
    }
}

