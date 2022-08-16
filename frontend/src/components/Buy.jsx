
import React, {useEffect} from 'react';
// import axios from 'axios';
import {useState} from "react";
import getBlockchain from "../ethereum";
import {BigNumber, utils} from 'ethers';

const Buy = ({paymentProcessor, BCT, signerAddress}) => {
    const [Amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0');
    // const [coin, setCoin] = useState();
    // const [gateway, setGateway] = useState();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        console.log('Init Run: BUY');
        // setCoin(BCT);
        // setGateway(paymentProcessor);

        try {
            dd(BCT, 'BCT: ');
            // dd(paymentProcessor, 'paymentProcessor: ');
            let blnc = await BCT.balanceOf(paymentProcessor.address);
            blnc = utils.formatEther(blnc);
            setBalance(blnc);
            dd('TRY: success');
            dd(blnc.toString() , 'blnc: ');

            setBalance(blnc.toString());

        } catch (err){
            dd('Catch');
            const { paymentProcessor, BCT, signerAddress} = await getBlockchain();

            dd(BCT, 'BCT: ');
            // dd(paymentProcessor, 'paymentProcessor: ');

            let blnc = await BCT.balanceOf(paymentProcessor.address);
            blnc = utils.formatEther(blnc);
            setBalance(blnc);
            // setCoin(BCT);
            // setGateway(paymentProcessor);

            dd(blnc.toString() , 'blnc: ');
            setBalance(blnc.toString());
        }

    }

    const dd = (val, name = null) => {
        if (name) console.log(name);
        console.log(val);
    }

    const bal = async (address) => {
        // let blnc = await coin.balanceOf(address) / (10 ** 18 );
        let blnc = await BCT.balanceOf(address);
        blnc = utils.formatEther(blnc);
        dd(blnc.toString(), 'blnc');
        setBalance(blnc.toString());
    }


    const handleLogin = async (e) => {
        // call ethereum's getBlockChain()
        // const { paymentProcessor, BCT} = await getBlockchain();
        dd('LOGIN')
        init()
    }

    const handleBuy = async (e) => {
        console.log('Make Buy Funx');

        const paymentProcessor = window.paymentProcessor;
        const BCT = window.BCT;

        e.preventDefault();

        let amnt = utils.parseEther(Amount);
        console.log(amnt);

        try {
            const buyTokenTx = await paymentProcessor.buyToken(amnt);
            console.log('buyTokenTx:', buyTokenTx);
            await buyTokenTx.wait();
            setAmount('');
            bal(paymentProcessor.address);

        } catch (e){
            console.log(e);
        }

    }

    return (

        <div className="card">
            <button onClick={handleLogin} className="btn btn-danger btn-block">Login to Block Chian</button>
            <h3>Buy Barpin Contract Token</h3>
            <form onSubmit={handleBuy}>
                <label>Amount:</label>
                <input
                    type="text"
                    required
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <p>Contract Balance: ${balance}</p>

                <button className="btn btn-danger btn-block">Buy</button>
            </form>
        </div>

    );
}

export default Buy;