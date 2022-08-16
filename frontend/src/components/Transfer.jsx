
import React, {useEffect} from 'react';
import {useState} from "react";
import getBlockchain from "../ethereum";
import { utils} from 'ethers';


const Transfer = ({paymentProcessor, BCT, signerAddress}) => {
    const [Receiver, setReceiver] = useState('');
    const [Amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0');
    const [user, setUser] = useState();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {

        try {
            let blnc = await BCT.balanceOf(signerAddress);
            blnc = utils.formatEther(blnc);
            setBalance(blnc);
            dd('TRY: success');
            dd(blnc.toString() , 'blnc: ');

            setBalance(blnc.toString());
            setUser(signerAddress);
            // setReceiver(paymentProcessor.address);
        } catch (err){
            const { paymentProcessor, BCT, signerAddress} = await getBlockchain();
            let blnc = await BCT.balanceOf(signerAddress);
            blnc = utils.formatEther(blnc);
            setUser(signerAddress);
            // setReceiver(paymentProcessor.address);
            setBalance(blnc.toString());

            dd(blnc.toString() , 'blnc: ');
        }
    }

    const dd = (val, name = null) => {
        if (name) console.log(name);
        console.log(val);
    }

    const bal = async (address) => {
        // let balance = await coin.balanceOf(address) / (10 ** 18 );
        let blnc = await BCT.balanceOf(address);
        blnc = utils.formatEther(blnc);
        dd(blnc.toString(), 'blnc');
        setBalance(blnc.toString());
    }

    // const handleLogin = async (e) => {
    //     init();
    // }

    const handleTransfer = async (e) => {
        console.log('Make Transfer Funx');

        const paymentProcessor = window.paymentProcessor;
        const BCT = window.BCT;
        // const BCT = BCT;

        e.preventDefault();

        let amnt = utils.parseEther(Amount);
        console.log(amnt);

        try {
            // const TransferTokenTx = await paymentProcessor.TransferToken(Amount);
            const TransferTokenTx = await BCT.transfer(Receiver, amnt);
            await TransferTokenTx.wait(1);
            console.log('TransferTokenTx:', TransferTokenTx);
            console.log('Transfer Successful');
            setAmount('');
            bal(user);
            console.log(user);

        } catch (e) {
            console.log(e);
            dd(e, 'Transfer Error');
        }
    }


    return (

        <div className="card">
            {/*<div >*/}
            {/*<button onClick={handleLogin} className="btn btn-danger btn-block">Login to Block Chian</button>*/}
            <h3>Transfer Barpin Contract Token</h3>
            <form onSubmit={handleTransfer}>

                <label>Receiver:</label>
                <input
                    type="text"
                    required
                    value={Receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    // onChange={(e) => setAmount(BigNumber.from(e.target.value))}
                />

                <label>Amount:</label>
                <input
                    type="text"
                    required
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                    // onChange={(e) => setAmount(BigNumber.from(e.target.value))}
                />

                <p>Max: ${balance}</p>

                <button className="btn btn-danger btn-block">Transfer</button>
            </form>
        </div>

    );
}

export default Transfer;