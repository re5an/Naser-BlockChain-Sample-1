
import React, {useEffect} from 'react';
import {useState} from "react";
import getBlockchain from "../ethereum";
import {ethers, utils} from 'ethers';
import { Link } from "react-router-dom";
import Transfer from "./Transfer";

const Items = [
    {
        id: 1,
        name: 'BCT',
        price: 11,
        // price: ethers.utils.parseEther('100'),
        balance: ''
    },
    // {
    //     id: 2,
    //     name: 'DAI',
    //     price: ethers.utils.parseEther('200'),
    //     balance: ''
    // }
];

const Wallet = ({paymentProcessor, BCT, signerAddress}) => {
    // const [Receiver, setReceiver] = useState('0x89628f97c366bd3EFDAdbcf61D47e49Ff02f9EF7');
    // const [Amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0');
    const [user, setUser] = useState();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {

        try {
            let blnc = await BCT.methods.balanceOf(signerAddress);
            blnc = utils.formatEther(blnc);
            // setBalance(blnc);
            dd('TRY: success');
            dd(blnc.toString() , 'blnc: ');

            Items[0].balance = blnc.toString();

            setBalance(blnc.toString());
            setUser(signerAddress);
        } catch (err){
            const { paymentProcessor, BCT, signerAddress} = await getBlockchain();
            let blnc = await BCT.balanceOf(signerAddress);
            blnc = utils.formatEther(blnc);
            setUser(signerAddress);
            setBalance(blnc.toString());

            dd(blnc.toString() , 'blnc Catch: ');
        }
    }

    const dd = (val, name = null) => {
        if (name) console.log(name);
        console.log(val);
    }

    const handleLogin = async (e) => {
        init();
    }

    return (

        <div className="card">
            <button onClick={handleLogin} className="btn btn-danger btn-block">Login to Block Chian</button>
            <h3>Barpin Wallet</h3>

            <ul className="list-group">
            {Items && Items.map(Item =>
                    <li className="list-group-item" key={Item.id}>
                        <div className='row-cols-4'>
                            Name:  <span className='font-weight-bold'>${Item.name}</span>
                        </div>
                        <div className='row-cols-4'>
                            Price:  <span className='font-weight-bold'>${Item.price}</span>
                        </div>
                        <div className='row-cols-4'>
                            Available: <span className='font-weight-lighter'>${Item.balance}</span>
                        </div>
                        <div className='row-cols-4'>
                            Available State: <span className='font-weight-lighter'>${balance}</span>
                        </div>

                        <div className='row-cols-4'>
                            <Link to={"/buy"} className="btn btn-danger btn-group-sm ">Buy</Link>
                            <Link to={"/sell"} className="btn btn-primary btn-group-sm">Sell</Link>
                            <Link to={"/transfer"} className="btn btn-info btn-group-sm float-right">Transfer</Link>
                        </div>

                    </li>
            )}
            </ul>

        </div>

    );
}

export default Wallet;