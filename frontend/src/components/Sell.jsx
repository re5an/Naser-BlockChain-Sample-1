
import React, {useEffect} from 'react';
import {useState} from "react";
import getBlockchain from "../ethereum";
import { utils} from 'ethers';


const Sell = ({paymentProcessor, BCT, signerAddress}) => {
    const [Receiver, setReceiver] = useState('0x89628f97c366bd3EFDAdbcf61D47e49Ff02f9EF7');
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
            setReceiver(paymentProcessor.address);
        } catch (err){
            const { paymentProcessor, BCT, signerAddress} = await getBlockchain();
            let blnc = await BCT.balanceOf(signerAddress);
            blnc = utils.formatEther(blnc);
            setUser(signerAddress);
            setReceiver(paymentProcessor.address);
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

    const handleLogin = async (e) => {
        init();
    }

    const handleSell = async (e) => {
        console.log('Make Sell Funx');

        const paymentProcessor = window.paymentProcessor;
        const BCT = window.BCT;
        // const BCT = BCT;

        e.preventDefault();

        let amnt = utils.parseEther(Amount);
        console.log(amnt);

        try {
            // const sellTokenTx = await paymentProcessor.sellToken(Amount);
            const sellTokenTx = await BCT.transfer(Receiver, amnt);
            await sellTokenTx.wait(1);
            console.log('SellTokenTx:', sellTokenTx);
            console.log('Sell Successful');
            setAmount('');
            bal(user);
            console.log(user);

        } catch (e) {
            console.log(e);
        }
    }


    return (

        <div className="card">
            {/*<div >*/}
            <button onClick={handleLogin} className="btn btn-danger btn-block">Login to Block Chian</button>
            <h3>Sell Barpin Contract Token</h3>
            <form onSubmit={handleSell}>

                <label>Amount:</label>
                <input
                    type="text"
                    required
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                    // onChange={(e) => setAmount(BigNumber.from(e.target.value))}
                />

                <p>Max: ${balance}</p>

                <button className="btn btn-danger btn-block">Sell</button>
            </form>
        </div>

    );
}

export default Sell;