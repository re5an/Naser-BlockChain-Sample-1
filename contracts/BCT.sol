// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract BCT is ERC20, Ownable {
  constructor() ERC20('Barpin Contract Token', 'BCT') public {
    _mint(msg.sender, 1000 * 10 ** decimals());
  }

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
  function faucetAdmin(address to, uint amount) external onlyOwner {
    _mint(to, amount);
  }

}
