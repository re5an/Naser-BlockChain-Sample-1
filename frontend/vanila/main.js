// const { ethers, Contract } = require ('ethers');
// const { web3 } = require ('web3');
// const { PaymentProcessor } = require ('../src/contracts/PaymentProcessor.json');
// const { BCT } = require ('../src/contracts/BCT.json');

// import PaymentProcessor from '../src/contracts/PaymentProcessor.json';
// import Dai from '../src/contracts/Dai.json';
// import BCT from '../src/contracts/BCT.json';

window.addEventListener('load', async () => {getBlockchain();});

const getBlockchain = () =>
    new Promise((resolve, reject) => {
            window.addEventListener('load', async () => {
                if(window.ethereum) {
                    await window.ethereum.enable();
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const signerAddress = await signer.getAddress();

                    // const paymentProcessor = new Contract(
                    //     PaymentProcessor.networks[window.ethereum.networkVersion].address,
                    //     PaymentProcessor.abi,
                    //     signer
                    // );

                    const BCT = new web3.eth.Contract(
                        '0xCB2ebb9cE533EA4c8c409a07C3d7829A65E4dbf7',
                        window.BCT.abi,
                        signer
                    );

                    resolve({provider, paymentProcessor, BCT});
                }
                resolve({provider: undefined, paymentProcessor: undefined, BCT: undefined});
            });
        } );


// const make = async item => {
//     const response1 = await axios.get(`http://localhost:4000/makeContract?id=11&payer=123&receiver=436&amount=5`);
//
//     const tx1 = await BCT.approve(paymentProcessor.address, item.price);
//     // await tx1.wait();
//
//     const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId);
//     // const receipt = await tx2.wait();
//     //
//     // await new Promise(resolve => setTimeout(resolve, 5000));
//     // const response2 = await axios.get(`http://localhost:4000/api/getItemUrl/${response1.data.paymentId}`);
//     console.log(response1);
// };

