import React, { Component } from "react"

class Airdrop extends Component {

    constructor() {
        super()
        this.state = {
            time: {},
            seconds: 300
        }
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    countDown = async () => {
        let seconds = this.state.seconds - 1
        localStorage.setItem("remainingTime", seconds)

        this.setState({
            time: this.secondsToTime(seconds), 
            seconds: seconds
        })

        // stop counting when hitting zero
        if (seconds === 0) {
            clearInterval(this.timer)
        }
        console.log(this.state.seconds)
    }

    secondsToTime(secs) {
        let hours, minutes, seconds
        hours = Math.floor(secs / (60*60))

        let divisor_for_minutes = secs % (60*60)
        minutes = Math.floor(divisor_for_minutes / 60)

        let divisor_for_seconds = divisor_for_minutes % 60
        seconds = Math.ceil(divisor_for_seconds)

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        }
        return obj
    }

    canReleaseTokens() {
        let stakingB = this.props.stakingBalance
        if (stakingB >= "50000000000000000000") {
            this.startTimer()
        }
    }

    componentDidMount() {
        const remainingTime = localStorage.getItem("remainingTime")
        if (remainingTime > 0) {
            this.setState({ seconds: remainingTime })
            this.startTimer()
        }
    }

    issueTokens = async () => {
        await this.props.issueTokens
        this.state.seconds = 10
        this.startTimer()
    }

    render() {
        this.canReleaseTokens()
        return (
            <div style={{color: "black"}}>
                {this.state.time.h} : {this.state.time.m} : {this.state.time.s}
                {(this.state.seconds === 0) &&
                    <div> &nbsp;
                        <button className="btn btn-warning btn-block" style={{backgroundColor:"#F7DC6F"}} onClick={this.props.issueTokens}><b> CLAIM {this.props.stakingBalance / 10e18} REWARD TOKENS </b></button>
                    </div>
                }
            </div>
        )
    }
}

export default Airdrop;