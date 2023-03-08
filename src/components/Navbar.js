import React, { Component } from "react";
import bank from "../bank.png";

class Navbar extends Component {
    render() {
        return (
           <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor:"#2874A6", height:"50px"}}>
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" style={{color:"white"}} href="#" onClick={() => window.location.reload(false)}>
                    <img src={bank} width="40" height="30" className="d-inline-block align-top" alt="bank"/>
                    &nbsp; DAPP Yield Staking
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small style={{color:"white"}}> ACCOUNT: <i><b>{this.props.account}</b></i></small>
                    </li>
                </ul>
           </nav> 
        )
    }
}

export default Navbar;