import React, { Component } from "react"
import Airdrop from "./Airdrop.js"
import tether from "../tether.png"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 0
        }
    }

    handleInputChange = (event) => {
        let input = document.forms['form'].elements.input.value
        this.setState({inputValue: input})
    }
      
    handleSubmit = async (event) => {
        event.preventDefault() // prevent browser from refreshing
        const inputValue = this.state.inputValue

        if (inputValue === "") {
            alert("Please enter the amount you want to deposit.")
            return;
        } else if (inputValue <= 0) {
            alert("Please enter a amount that is greater than 0.");
            return;
        } else {
            this.props.stakeTokens(inputValue)
        }
    }
      
    render() {
        return (
           <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                    <thead>
                        <tr style={{color: "black"}}>
                            <th scope="col"> Staking Balance </th>
                            <th scope="col"> Reward Balance </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: "black"}}>
                            <td> {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")} USDT </td>
                            <td> {window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD </td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-2" style={{opacity: "0.8"}}>
                    <form className="mb-3" name="form">
                        <div style={{borderSpacing: "0.1em"}}>
                            <label className="float-left" style={{marginLeft: "15px"}}>
                                <b> Stake Tokens </b>
                            </label>
                            <span className="float-right" style={{marginRight: "8px"}}><b>Balance: </b>{window.web3.utils.fromWei(this.props.tetherBalance, "Ether")} </span>
                            <div className="input-group mb-4">
                                <input type="number" placeholder="0" name="input" required onChange={this.handleInputChange}/>
                                <div className="input-group-open">
                                    <div>
                                        &nbsp;&nbsp;<img src={tether} alt="tether" height="32" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{backgroundColor:"#3498DB"}} onClick={this.handleSubmit}> DEPOSIT </button>
                        </div>
                    </form>
                    <button className="btn btn-lg btn-primary btn-block" style={{backgroundColor:"#3498DB"}} onClick={this.props.unstakeTokens}> WITHDRAW </button>
                    <div className="card-body text-center" style={{color: "blue"}}>
                        AIRDROP <Airdrop stakingBalance={this.props.stakingBalance} issueTokens={this.props.issueTokens}/>
                    </div>
                </div>
           </div>
        )
    }
}

export default Main;