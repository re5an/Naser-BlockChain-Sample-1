/*
const Dai = artifacts.require('Dai.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addresses) {
  const [admin, payer, _] = addresses;

  if(network == 'develop') {
    await deployer.deploy(Dai); // sends the Transaction
    const dai = await Dai.deployed();  // waits for the Transaction to get mined
    await dai.faucet(payer, web3.utils.toWei('10000'));

    await deployer.deploy(PaymentProcessor, admin, dai.address);
  } else {
    const ADMIN_ADDRESS = '';
    const DAI_ADDRESS = '';
    await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, DAI_ADDRESS);
  }
};
*/


/*
const BCT = artifacts.require('BCT.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addresses) {
  const [admin, payer, _] = addresses;

  if(network == 'develop') {
    await deployer.deploy(BCT);    // sends the Transaction
    const BCT = await BCT.deployed();   // waits for the Transaction to get mined
    await BCT.faucet(payer, web3.utils.toWei('10'));
    await BCT.faucet('0x4402B4C2A48F6FfE58E3b3d69Af4aD7Fd6BC1d8E', web3.utils.toWei('22'));

    await deployer.deploy(PaymentProcessor, admin, BCT.address);
  } else {
    const ADMIN_ADDRESS = '';
    const BCT_ADDRESS = '';
    await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, BCT_ADDRESS);
  }
};
*/


const BCT = artifacts.require('BCT.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');
// const SimpleToken = artifacts.require('SimpleToken');
// const TokenReceiver = artifacts.require('TokenReceiver');

module.exports = async function (deployer) {
  await deployer.deploy(BCT);
  const token = await BCT.deployed();

  await deployer.deploy(PaymentProcessor, token.address);
  const receiver = await PaymentProcessor.deployed();

  await token.transfer(receiver.address, "100000000");
};
