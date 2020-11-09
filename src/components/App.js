import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import LoginOrRegister from './loginOrRegister';
import axios from 'axios';
import Sidebar from "./Sidebar/sidebar";
import AllUsers from './Users/allUsers';
import TopNavbar from './topNavbar';
import UserAccess from './Users/userAccess';
import SpareParts from './SpareParts/spareParts';
import NewSparePart from './SpareParts/newSparePart';
import SparePartDetails from './SpareParts/sparePartDetails';
import AllVehicles from './Vehicles/allVehicles'; 
import AuthorizeRequests from './pendingAuthorization/authorizeRequests';
import GeneralHistory from './histories/generalHistory';
import ItemHistory from './histories/itemHistory';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: {
        type: '',
        text: ''
      },
      loggedIn: false,
      openModal: '',
      userDetails: {},
      users: [],
      spareParts: [],
      vehicles: [],
      unAuthorizedPurchases: [],
      unAuthorizedUsage: []
    }
  }

  setActiveModal = (id)=>{
    this.setState({openModal: id})
  }
  resetActiveModal = ()=>{
    this.setState({openModal: ''})
  }

  
  setMessage = (type, text)=>{
    let message = this.state.message;
    message.type = type;
    message.text = text
    this.setState({message: message})
  }
  clearMessage = ()=>{
    let message = this.state.message;
    message.type = '';
    message.text = '';
    this.setState({message: message})
  }

  warningMessage = ()=>{
    if(this.state.message.type === 'warning'){
      return(
        <div className="d-inline-block alert alert-warning alert-dismissible fade show mx-4 sticky-top" role="alert">
            {this.state.message.text}
            <button type="button" className="close h-100" data-dismiss="alert" aria-label="Close" onClick={this.clearMessage}>
                <span aria-hidden="true" style={{position: 'relative', bottom: '3px'}}>&times;</span>
            </button>
        </div>
      )
    }
  }

  successMessage = ()=>{
    if(this.state.message.type === 'success'){
      return(
        <div className="d-inline-block alert alert-success alert-dismissible fade show mx-4 sticky-top" role="alert">
            {this.state.message.text}
            <button type="button" className="close h-100" data-dismiss="alert" aria-label="Close" onClick={this.clearMessage}>
                <span aria-hidden="true" style={{position: 'relative', bottom: '3px'}}>&times;</span>
            </button>
        </div>
      )
    }
  }

  dangerMessage = ()=>{
    if(this.state.message.type === 'danger'){
      return(
        <div className="d-inline-block alert alert-danger alert-dismissible fade show mx-4 sticky-top" role="alert">
            {this.state.message.text}
            <button type="button" className="close h-100" data-dismiss="alert" aria-label="Close" onClick={this.clearMessage}>
                <span aria-hidden="true" style={{position: 'relative', bottom: '3px'}}>&times;</span>
            </button>
        </div>
      )
    }
  }


  componentDidMount = ()=>{
    if(navigator.onLine){
      this.loadAllResources()
    }else{
      this.setMessage('warning', 'Please Check Your internet connection')
    }
  }

  setloggedInFromLocalStorage = ()=>{
    if(localStorage.getItem("loggedIn") === "true"){
      this.setLoggedIn()
      console.log('weeeeeeeeee')
    }else{
      this.setState({loggedIn: false})
    }
  }
  setUserDetails = (userdata)=>{
    let id = localStorage.getItem("userId")
    if(id){
      axios.get('http://localhost:5000/api/user/getUser' +id)
      .then((res) => {
          if(res.data !== null){
            this.setState({userDetails: res.data})
          }
      })
    }else if(userdata !== undefined){
      this.setState({userDetails: userdata})
    }else{
      this.setState({loggedIn: false})
    }
  }

  checkUserId = ()=>{
    if(this.state.userDetails._id !== localStorage.getItem("userId")){
      this.setState({loggedIn:false})
    }
  }
  setLoggedIn = ()=>{
    if(this.state.users.length === 0){
      this.loadAllResources()
    }
    this.setState({loggedIn : true})
    localStorage.setItem("loggedIn", true);
  }
  logout = ()=>{
    this.setState({loggedIn : false})
    localStorage.clear();
  }

  loadAllResources = ()=>{
    this.loadAllUsers();
    this.loadAllSpareParts();
    this.loadAllVehicles();
    this.loadUnAuthorizedPurchases();
    this.loadUnAuthorizedUsage();
    
  }

  loadAllUsers = ()=>{
    axios.get('http://localhost:5000/api/user/list')
      .then((res) => {
          if(res.data !== null){
              console.log(res.data)
              this.setState({users: res.data});
          }
      })
  }
  loadAllSpareParts = ()=>{
    axios.get('http://localhost:5000/api/sparepart/list')
      .then((res) => {
          if(res.data !== null){
              console.log(res.data)
              this.setState({spareParts: res.data});
          }
      })
  }
  loadAllVehicles = ()=>{
    axios.get('http://localhost:5000/api/vehicle/list')
      .then((res) => {
          if(res.data !== null){
              console.log(res.data)
              this.setState({vehicles: res.data});
          }
      })
  }
  loadUnAuthorizedPurchases = ()=>{
    axios.get('http://localhost:5000/api/purchasehistory/getunauthorizedpurchasehistory')
    .then(res => {
      if(res.status === 200){
        this.setState({unAuthorizedPurchases: res.data})
        console.log(res.data)
      }
    })
  }
  loadUnAuthorizedUsage = ()=>{
    axios.get('http://localhost:5000/api/usagehistory/getunauthorizedusagehistory')
    .then(res => {
      if(res.status === 200){
        this.setState({unAuthorizedUsage: res.data})
        console.log(res.data)
      }
    })
  }
  


 
  
  doesPasswordMatch = (password)=>{
    if(password === this.state.userDetails.password){
      return true
    }else{
      return false
    }
  }

  userAccessDetails = (id)=>{
    let userDetails = "" ;
      this.state.users.map((user)=>{
          if(user._id === id){
            userDetails = user
          }
      })
    return userDetails;
  }

  updateUserDetails = (data)=>{
    let allUsers = this.state.users
    allUsers.map((user)=>{
      if(user._id === data._id){
        user = data;
      }
    })
    this.setState({users: allUsers});
  }

  updateSparePartDetails = (data)=>{
    let allSpareParts = this.state.spareParts
    allSpareParts.map(sparepart =>{
      if(sparepart._id === data._id){
          sparepart = { ...sparepart, ...data}
          console.log(sparepart)
      }
    })
    this.setState({spareParts: allSpareParts})
      console.log()
  }



  toggleSidebar = ()=>{
    document.getElementById('sidebar').classList.toggle('d-none')
  }

  doesSparePartExist = (sparepart)=>{
    let result = false
    this.state.spareParts.map((item) =>{
      if(item.itemName.toLowerCase().trim() === sparepart.toLowerCase().trim()){
          result = true
      }
    })
    return result
  }


  sparePartDetails = (id)=>{
    let sparePartDetails = "" ;
      this.state.spareParts.map((sparepart)=>{
          if(sparepart._id === id){
            sparePartDetails = sparepart
          }
      })
    return sparePartDetails;
  }

  sparePartDetailsByItemname = (itemname)=>{
    let sparePartDetails = "" ;
      this.state.spareParts.map((sparepart)=>{
          if(sparepart.itemName === itemname){
            sparePartDetails = sparepart
          }
      })
    return sparePartDetails;
  }

  allCategories = ()=>{
    let arrOfCategories = [];
    this.state.spareParts.map((item)=>{
        arrOfCategories.push(item.category);
    })
    let uniqueArrOfCategories = [...new Set([...arrOfCategories])];
    return uniqueArrOfCategories;
  }

  allItemNames = ()=>{
    let allItemNames = []
    this.state.spareParts.map((sparepart)=>{
      allItemNames.push(sparepart.itemName)
    })
    return allItemNames.sort()
  }

  allVehicles = ()=>{
    let allVehicles = []
    this.state.vehicles.map((vehicle)=>{
      allVehicles.push(vehicle.plateNumber)
    })
    return allVehicles.sort()
  }

  render(){

    if(this.state.loggedIn === false){
      return(
        <LoginOrRegister 
        doesPasswordMatch={this.doesPasswordMatch}
        setUserDetails={this.setUserDetails}
        setLoggedIn={this.setLoggedIn}
        loadAllUsers={this.loadAllUsers}/>
      )
    }
    return(
      <Router>
        <section className="container-fluid">
          <div className="row">
            <Sidebar
            openModal={this.state.openModal}
            userDetails={this.state.userDetails}
            userName={this.state.userDetails.fullname}
            position={this.state.userDetails.position} 
            toggleSidebar={this.toggleSidebar}
            />
            <main className="col p-0">
              <TopNavbar 
              userDetails={this.state.userDetails}
              unAuthorizedPurchases={this.state.unAuthorizedPurchases}
              unAuthorizedUsage={this.state.unAuthorizedUsage}
              toggleSidebar={this.toggleSidebar}
              logout={this.logout}/>
              {this.warningMessage()}
              {this.successMessage()}
              {this.dangerMessage()}
              <Route exact path="/">
                <SpareParts 
                userDetails={this.state.userDetails}
                allSpareParts={this.state.spareParts}
                allItemNames={this.allItemNames}
                allVehicles={this.allVehicles}
                sparePartDetailsByItemname={this.sparePartDetailsByItemname}
                loadAllSpareParts={this.loadAllSpareParts}
                updateSparePartDetails={this.updateSparePartDetails}
                loadUnAuthorizedPurchases={this.loadUnAuthorizedPurchases}
                loadUnAuthorizedUsage={this.loadUnAuthorizedUsage}
                setActiveModal={this.setActiveModal}
                resetActiveModal={this.resetActiveModal}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}/>
              </Route>
              <Route exact path="/newSparePart">
                <NewSparePart 
                userDetails={this.state.userDetails}
                doesNewSparePartExist={this.doesSparePartExist}
                loadAllSpareParts={this.loadAllSpareParts}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}/>
              </Route>
              <Route exact path="/sparepartdetails/:id">
                <SparePartDetails 
                userDetails={this.state.userDetails}
                sparePartDetails={this.sparePartDetails}
                allCategories={this.allCategories()}
                loadAllSpareParts={this.loadAllSpareParts}
                updateSparePartDetails={this.updateSparePartDetails}
                doesSparePartExist={this.doesSparePartExist}
                setActiveModal={this.setActiveModal}
                resetActiveModal={this.resetActiveModal}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}/>
              </Route>
              <Route exact path="/users">
                <AllUsers 
                userDetails={this.state.userDetails}
                allUsers={this.state.users}/>
              </Route>
              <Route exact path="/editUsers/:id" > 
                <UserAccess 
                userDetails={this.state.userDetails}
                userAccessDetails={this.userAccessDetails}
                updateUserDetails={this.updateUserDetails}
                setMessage={this.setMessage}
                clearMessage={this.clearMessage}/>
              </Route>
              <Route exact path="/vehicles">
                <AllVehicles 
                userDetails={this.state.userDetails}
                allVehicles={this.state.vehicles}
                loadAllVehicles={this.loadAllVehicles}
                setActiveModal={this.setActiveModal}
                resetActiveModal={this.resetActiveModal}
                />
              </Route>
              <Route exact path="/authorization">
                <AuthorizeRequests 
                userDetails={this.state.userDetails}
                loadUnAuthorizedPurchases={this.loadUnAuthorizedPurchases}
                purchaseRequests={this.state.unAuthorizedPurchases}
                loadUnAuthorizedUsage={this.loadUnAuthorizedUsage}
                usageRequests={this.state.unAuthorizedUsage}
                allItemNames={this.allItemNames()}
                allVehicles ={this.allVehicles()}
                sparePartDetailsByItemname={this.sparePartDetailsByItemname}
                loadAllSpareParts={this.loadAllSpareParts}
                />
              </Route>
              <Route exact path="/history">
                <GeneralHistory 
                />
              </Route>
              <Route exact path="/itemHistory/:itemName" component={ItemHistory} />
            </main>
            
          </div>
        </section>
      </Router>
      
    )
    
  }
}
