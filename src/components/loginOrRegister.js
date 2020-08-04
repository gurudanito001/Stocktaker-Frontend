import React from 'react';
import axios from 'axios';
import correct from '../images/correct.svg'



class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            status: "",
            email: '',
            password: ''
        }
    }

    handleChange = (event)=> {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit= (event)=>{
        event.preventDefault()
        if(this.props.doesPasswordMatch(this.state.password)){
            document.getElementById('emailErrorMessage').textContent = ""
            this.props.setLoggedIn()
        }else{
            document.getElementById('emailErrorMessage').textContent = "Incorrect Password"
        }
    }

    validateEmail = (event)=> {
        event.preventDefault()
        if(this.state.email !== "" && navigator.onLine){
            document.getElementById('next').disabled = true
            axios.post('http://localhost:5000/users/find/' + this.state.email )
            .then((res) => {
                if(res.data === null && navigator.onLine){
                    document.getElementById('emailErrorMessage').textContent = "Invalid Email"
                    document.getElementById('next').disabled = false
                }
                if(res.status === 200 && res.data !== null){
                    this.setState({status: "OK"})
                    this.props.setUserDetails(res.data);
                    localStorage.setItem("userId", res.data._id);
                    document.getElementById('emailErrorMessage').textContent = ""
                }
            })
        }else{
            if(this.state.email === ""){
                document.getElementById('emailErrorMessage').textContent = "Fill Email Address"
            }else if(navigator.onLine === false){
                document.getElementById('emailErrorMessage').textContent = "You are Offline"
            }
        }
        
        localStorage.clear()
        
    }
    passwordField = ()=>{
        if(this.state.status === "OK"){
            return(
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" required onChange={this.handleChange}/>
                </div>
            )
        }
    }
    greenTick = ()=>{
        if(this.state.status === "OK"){
            return(
                <img src={correct} alt="green tick" height="15" className="ml-2"/>
            )
        }
    }
    nextButton = ()=>{
        if(this.state.status === ""){
            return(
                <button className="btn btn-info" id="next" onClick={this.validateEmail}>Next</button>
            )
        }
    }
    submitButton = ()=>{
        if(this.state.status === "OK"){
            return(
                <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
            )
        }
    }

    render(){
        return(
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address  {this.greenTick()}</label>
                    <input type="email" required className="form-control" id="email" onChange={this.handleChange} value={this.state.email}/>
                </div>
                {this.passwordField()}
                <label className="text-danger d-block" id="emailErrorMessage"></label>
                {this.submitButton()}
                {this.nextButton()}
            </form>
            

        )
    }
}



class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            fullname: '',
            gender: '',
            email: '',
            password: '',
            position: '',
            viewUsers: false,
            grantUserPrivileges: false,
            viewInventoryRecords: false,
            addNewSparePart: false,
            recordPurchase: false,
            requestUsage: false,
            authorizePurchase: false,
            authorizeUsage: false,
            viewItemHistory: false,
            viewAllVehicles: false,
            addNewVehicle: false,
            editVehicle: false,
            viewHistory: false,
            disableSubmitBtn: false

        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({disableSubmitBtn: true})
        let userInfo = this.state
        axios.post('http://localhost:5000/users/add', userInfo)
            .then((res) => {
                console.log(res.data)
                if(res.status === 200){
                    document.getElementById('registerGreenTick').classList.remove('d-none')
                    document.getElementById('registerErrorMessage').textContent = ""
                    this.props.loadAllUsers()
                    this.clearState()
                    this.setState({disableSubmitBtn: false})
                }
            })
            .catch(error =>{
                document.getElementById('registerErrorMessage').textContent = "Email Already Exists"
                this.setState({disableSubmitBtn: false})
            })
    }
    clearState = ()=>{
        this.setState({fullname: ''})
        this.setState({gender: ''})
        this.setState({email: ''})
        this.setState({password: ''})
    }


    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" required className="form-control" id="fullname"  placeholder="Firstname Lastname" 
                    onChange={this.handleChange} value={this.state.fullname} minLength="5"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select className="form-control" id="gender" onChange={this.handleChange} value={this.state.gender}>
                        <option value="">Select Gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" required className="form-control" id="email" onChange={this.handleChange} value={this.state.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" required className="form-control" id="password" minLength="5" onChange={this.handleChange} value={this.state.password}/>
                </div>
                <label className="text-danger d-block" id="registerErrorMessage"></label>
                <button type="submit" className="btn btn-primary" id="registerSubmitBtn" disabled={this.state.disableSubmitBtn}>Submit</button> 
                <img src={correct} alt="green tick" height="15" id="registerGreenTick" className="ml-2 d-none"/>


            </form>
        )
    }
}


export default class LoginOrRegister extends React.Component{
    

    render(){
        const styles = {
            body:{
                backgroundColor: '#3a3f51',
                height: '100vh',
            },
            card: {
                width: '380px'
            },
            navTabs: {
                boxShadow: 'none'
            }
        }
        return(
            <section className="d-flex align-items-center justify-content-center" style={styles.body}>
                
                <div style={styles.card}>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item w-50">
                            <a className="nav-link btn text-white active" style={styles.navTabs} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login</a>
                        </li>
                        <li className="nav-item w-50">
                            <a className="nav-link btn text-white" style={styles.navTabs} id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Register</a>
                        </li>
                    </ul>
                    <div className="tab-content card" id="pills-tabContent">
                        <div className="tab-pane fade show active p-3" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <Login 
                            doesPasswordMatch={this.props.doesPasswordMatch}
                            setUserDetails={this.props.setUserDetails}
                            setLoggedIn={this.props.setLoggedIn}
                            onSubmit={this.props.onSubmit}/>
                        </div>

                        <div className="tab-pane fade p-3" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <Register 
                            loadAllUsers={this.props.loadAllUsers}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}