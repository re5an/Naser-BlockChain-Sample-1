// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
  address public admin;
  IERC20 public token;

  //----------- Events -----------//

//  event ContractRegistered (address indexed _from, address indexed _to, uint _amount, uint _waybillID, uint indexed _date);
  event TokenSold (address indexed _from, uint _amount, uint indexed _date);
  event TokenBought (address indexed _to, uint _amount, uint indexed _date);
  event PaidReceiver(string indexed _waybillID, address indexed _from, uint _amount, address _to, uint indexed _date);
  event AmountFrozen(string indexed _waybillID, address indexed _from, uint _amount, address _to, uint indexed _date);

  //----------- Admin -----------//


  modifier onlyAdmin() {
    require(msg.sender == admin, "Caller is not admin");
    _;
  }

//  constructor(address adminAddress, address tokenAddress) public {
  constructor( address tokenAddress) public {
    admin = msg.sender;
//    admin = adminAddress;
    token = IERC20(tokenAddress);
  }


  //----------- Tokenomics -----------//

  function userToContract(string memory _paymentID, uint _amount) public {
    require(_amount > 0, "You need to put at least some tokens");
    uint256 _allowance = token.allowance(msg.sender, address(this));
    require(_allowance >= amount, "Check the token Allowance");
    token.transferFrom(msg.sender, address(this), _amount);
    emit AmountFrozen(_paymentID, msg.sender, _amount, address(this), block.timestamp);
  }


  function transferFromContractToReceiver(address payable _to, uint _amount, string memory _paymentID, address _from) external {
    require(_amount > 0, "You need to Buy More than Zero");
    uint256 dexBalance = token.balanceOf(address(this));
    require(_amount <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(_to, _amount);
    emit PaidReceiver(_paymentID, _from, _amount, _to, block.timestamp);
  }

  function buyToken(uint _amount) external {
    require(_amount > 0, "You need to Buy More than Zero");
    uint256 dexBalance = token.balanceOf(address(this));
    require(_amount <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, _amount);
    emit TokenBought(msg.sender, _amount, block.timestamp);
  }

  function sellToken(uint _amount) public {
    require(_amount > 0, "You need to sell at least some tokens");
    uint256 _allowance = token.allowance(msg.sender, address(this));
    require(_allowance >= amount, "Check the token Allowance");
    token.transferFrom(msg.sender, address(this), _amount);
    emit TokenSold(msg.sender, _amount, block.timestamp);
  }


  /** -----=== Peg with Ether ===----- **/
//--- Handled Better
  function buy() payable public {
    uint256 amountTobuy = msg.value; //-- UnComment it if want to make it a Peg coin with 1:1 of Eth
    require(amountTobuy > 0, "You need to send some ether");
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit TokenBought(msg.sender, _amount, block.timestamp);
  }

  function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    msg.sender.transfer(amount); //-- This is to transfer equal amount of Eth (like Peg ?)
    emit TokenSold(msg.sender, _amount, block.timestamp);
  }

  //----------- Other  -----------//

  function resetToken(address _tokenAddress) external onlyAdmin{
    token = IERC20(_tokenAddress);
  }

  function balanceOfContractToken() onlyAdmin external view returns(uint) {
    return token.balanceOf(address(this));
  }
}
