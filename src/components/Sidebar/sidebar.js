import React from 'react';
import Logo from './logo'
import UserDetails from './userDetails'
import Navigation from './navigation'

export default class Sidebar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            windowWidth: window.innerWidth,
        }
    }

    reportWindowSize = ()=>{
        this.setState({windowWidth: window.innerWidth})
        //console.log(this.state.windowWidth);
    }

    changeSidebarStyle= ()=>{
        const stylesLg = {
            height: '100vh',
            width: '240px',
            backgroundColor: '#3a3f51',
            zIndex: '2000',
            position: 'sticky',
            top: '0px',
            left: '0px',
        }
        const stylesSm = {
            height: '100vh',
            width: '240px',
            backgroundColor: '#3a3f51',
            zIndex: '2000',
            position: 'fixed',
            top: '0px',
            left: '0px',
        }
        if(this.state.windowWidth > 1199 ){
            return(
                stylesLg
            )
        }else{
            return(
                stylesSm
            )
        }
    }
    
    render(){
        return(
           <aside style={this.changeSidebarStyle()} id="sidebar">
               <Logo toggleSidebar = {this.props.toggleSidebar}/>
               <UserDetails
               userName={this.props.userName}
               position={this.props.position}
               />
               <Navigation 
               openModal={this.props.openModal}
               currentScreen={this.props.currentScreen}
               setScreenDetails ={this.props.setScreenDetails} 
               toggleSidebar={this.props.toggleSidebar} 
               windowWidth={this.state.windowWidth}/>

               {window.addEventListener('resize', this.reportWindowSize)}
           </aside> 
        )
    }
    
}