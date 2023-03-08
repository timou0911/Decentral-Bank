pragma solidity ^0.5.0;

import "./Tether.sol";
import "./RWD.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Tether _tether, RWD _rwd) public {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    // staking 
    function depositTokens(uint _amount) public {
        require(_amount > 0, "amount cannot be 0");
        
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstaking
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be <= 0");
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
        tether.transfer(msg.sender, balance);
    }

    // issue rewards
    function issueTokens() public {
        /*
        require(msg.sender == owner, "caller must be owner");
        for(uint i = 0 ; i < stakers.length ; ++i) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9; // reward token amount = mUSDT staked / 9
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
        */
        uint balance = stakingBalance[msg.sender] / 10;
        if (balance > 0) {
            rwd.transfer(msg.sender, balance);
        }
    }
}