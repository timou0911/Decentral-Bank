// Main application to render all the components
/* The Component class is a base class for creating React components.
   By extending this class, you can create your own custom components in React */
import React, { Component} from "react"
import "./App.css"
import Navbar from "./Navbar.js"
import Main from "./Main.js"
import ParticleSettings from "./ParticleSettings.js"
import Web3 from "web3"
import Tether from "../truffle_abis/Tether.json"
import RWD from "../truffle_abis/RWD.json"
import DecentralBank from "../truffle_abis/DecentralBank.json"

// component: a reusable building block for creating UIs, it can have its own state
// state: an object that holds data that the component needs to render and operate correctly

// 'App' is a custom component that extends the 'Component' class
class App extends Component {

    async UNSAFE_componentWillMount() { // legacy lifecycle method, may be removed in the future
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) { // checks if the user has installed an Ethereum-compatible browser extension(such as Metamask)
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable() // request permission to access the user's Ethereum account
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("No ethereum browser detected! You can chack out Metamask!")
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3 // retrieves "web3" object from global "window" object
        const account = await web3.eth.getAccounts() // retrieve user's Ethereum account
        this.setState({account: account[0]}) // updates the component's state, and the component will automatically re-render and any parts of the UI that depend on the account value will be updated with the new value
        const networkId = await web3.eth.net.getId() // retrieves the current network ID 

        // Load Tether contract
        const tetherData = Tether.networks[networkId] // retrieve networks data from JSON file
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address) // creates a new instance using Tether contract's ABI and address
            this.setState({tether: tether})
            /* .methods -> use to call methods in smart contract to retrieve user balance
             * .call() -> is used to execute read-only methods, retrieve return values of the function immediately(sync)
             *            it won't modify the state of the contract, so it won't send a tx
             * .send() -> is used to execute state-changing methods, so it will send a tx,
             *            it is async and returns a promise that resolves when the txn is mined and included in a block
            */
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()}) // BigNumber -> string
        } else {
            window.alert("Error! Tether Token not deployed to the network!")
        }

        // Load RWD contract
        const rwdData = RWD.networks[networkId]
        if (rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance =await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
        } else {
            window.alert("Error! Reward Token not deployed to the network!")
        }

        // Load DecentralBank contract
        const decentralBankData = DecentralBank.networks[networkId]
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank: decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
        } else {
            window.alert("Error! Decentral Bank not deployed to the network!")
        }

        this.setState({loading: false})
    }

    stakeTokens = async (amount) => {
        amount = window.web3.utils.toWei(amount, "Ether")
        this.setState({loading: true})

        try {
            await this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on("transectionHash", (hash) => {
            })

            try {
                await this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on("transectionHash", (hash) => {
                    this.setState({loading: false})
                })
            } catch (error) {
                alert("Tx denied.")
            }
        } catch(error) {
            alert("Tx denied.")
        } finally {
            window.location.reload()
        }
    }

    unstakeTokens = async () => {
        this.setState({loading: true})
        try {
            await this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on("transectionHash", (hash) => {
                this.setState({loading: false})
            })
        } catch(error) {
            alert("Tx denied.")
        } finally {
            window.location.reload()
        }
    }

    issueTokens = async () => {
        this.setState({loading: true})
        try {
            await this.state.decentralBank.methods.issueTokens().send({from: this.state.account}).on("transectionHash", (hash) => {
                this.setState({loading: false})
            })
        } catch(error) {
            alert("Tx denied.")
        } finally {
            window.location.reload()
        }
    }

    // initializes the state of the component
    constructor(props) {
        super(props)
        this.state = { // an object that holds the component's data
            account: "0x0",
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: "0",
            rwdBalance: "0",
            stakingBalance: "0",
            loading: true,
        }
    }

    render() {
        let content
        this.state.loading // be sure that SCs are loaded before users can interact with them
            ? content = <p id="loader" className="text-center" style={{color: "white", margin: "30px"}}> ... LOADING ... </p>
            : content = <Main
                            tetherBalance = {this.state.tetherBalance}
                            rwdBalance = {this.state.rwdBalance}
                            stakingBalance = {this.state.stakingBalance}
                            stakeTokens = {this.stakeTokens}
                            unstakeTokens = {this.unstakeTokens}
                            issueTokens = {this.issueTokens}
                        />
        return (
            <div className="App" style={{position: "relative"}}>
                <div style={{position: "absolute"}}>
                    <ParticleSettings />
                </div>
                <Navbar account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: "600px", minHeight: "100vm"}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;