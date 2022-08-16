
import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from "react";
import getBlockchain from '../ethereum.js';
import {BigNumber} from "ethers";


// import { Card } from "antd";

const styles = {
    title: {
        fontSize: "30px",
        fontWeight: "600",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        width: "450px",
        fontSize: "16px",
        fontWeight: "500",
    },
};


const Contract = ({ BCT, signerAddress }) => {
// const Contract = () => {
    const [PaymentID, setPaymentID] = useState('');
    const [Receiver, setReceiver] = useState('0xc13aaC69A66c4456823650c8feff6F3c030c56Ed');
    const [Amount, setAmount] = useState('');
    const [paymentProcessor, setPaymentProcessor] = useState();

    //----- Balance Related -----//
    const [balance, setBalance] = useState('0');
    const [coin, setCoin] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const init = async () => {
            console.log('UseEffect Run');
            const { BCT, signerAddress, paymentProcessor} = await getBlockchain();
            console.log('BCT Window:', window.BCT);
            setCoin(BCT);
            setPaymentProcessor(paymentProcessor);
            setUser(signerAddress);
            // let signerAddress = window.signerAddress;
            console.log('signerAddress:' , signerAddress);
            // console.log('BCT:' , BCT);
            // console.log('window BCT:' , window.BCT);
            try {
                let balance = await BCT.balanceOf(signerAddress) / (10 ** 18 );
                console.log(balance.toString());
                setBalance(balance.toString());
            } catch (err){
                console.log(err);
            }
        }
        init();
    }, []);

    const bal = async (address) => {
        let coinW = window.BCT;
        let balance = await coin.balanceOf(address) / (10 ** 18 );
        console.log(balance.toString());
        setBalance(balance.toString());
    }
    //----------//

    const handleLogin = async (e) => {
        // call ethereum's getBlockChain()
        const { BCT, signerAddress, setPaymentProcessor} = await getBlockchain();
        setUser(signerAddress);
        setCoin(BCT);
        setPaymentProcessor(setPaymentProcessor)
    }

    const handleMakeContract = async (e) => {
        console.log('Make Contract Funx');
        console.log('BCT Window:', window.BCT);

        const paymentProcessor = window.paymentProcessor;
        // const BCT = window.BCT;
        // setCoin(BCT);

        e.preventDefault();
        // const Payer = '0x4402B4C2A48F6FfE58E3b3d69Af4aD7Fd6BC1d8E';
        const Payer = user;
        const payment = {id:PaymentID, receiver:Receiver, amount:Amount, payer:Payer};

        try {
            // let res = await fetch('http:/localhost:4000/makeContract', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'Application-Json'},
            //     body: JSON.stringify(payment)
            // });
            // const baseURL = 'http:/localhost:4000/';

            //--- Making BigNumbers and related things
            const _FIX = BigNumber.from('1000000000000000000' );
            let amnt = BigNumber.from(Amount);
            amnt = amnt.mul(_FIX);

            console.log('paymentProcessor.address' ,paymentProcessor.address);
            console.log('amnt : ' , amnt.toString());

            const tokenApproveTx = await BCT.approve(paymentProcessor.address, amnt);
            await tokenApproveTx.wait();
            console.log('tokenApproveTx:', tokenApproveTx);


            axios.post('/makeContract', payment)
                .then((res)=> {
                    console.log('Save to DB Success. Response :', res);
                    setPaymentID("");
                    setReceiver("");
                    setAmount('0');
                })
                .then(async (res) => {
                    console.log('Gonna Freeze Amount');
                    // const paymentTx = await paymentProcessor.userToContract(PaymentID, Amount);
                    // const paymentReceipt = await paymentTx.wait();
                    axios.get('/freezeAmount?id=' + PaymentID)
                        .then((res)=>{
                            console.log('freezeAmount Response:', res);
                            bal(user);
                            console.log('Balance New: ', balance);
                        })
                        // .then(res => {
                        //     bal(user);
                        //     console.log('Balance New: ', balance);
                        // })
                        .catch((err)=>{
                            console.log('Error in Pay to Contract: ', err);
                        })
                    ;

                })
                .catch( (err) => {
                    console.log(err);
                })
            ;

            // let resJson = await res.json();
            // if (res.status === 200) {
            //     setPaymentID("");
            //     setReceiver("");
            //     setAmount('0');
            // } else {
            //     console.log('Error. Status not 200', resJson);
            // }
        } catch (e){
            console.log(e);
        }

        // console.log(res);
    }

    return (
        // <Card
        //     style={styles.card}
        //     title={
        //         <div style={styles.header}>
        //             <button>Login to Block Chian</button>
        //         </div>
        //     }
        // >
        //     {/*<Transfer />*/}
        //     <div >
        //         {/*<button>Login to Block Chian</button>*/}
        //         <h2>Add a New Payment Contract</h2>
        //         <form>
        //             <label>Payment ID</label>
        //             <input
        //                 type="text"
        //                 required
        //                 value={PaymentID}
        //                 onChange={(e) => setPaymentID(e.target.value)}
        //             />
        //             <label>Receiver Address:</label>
        //             <input
        //                 type="text"
        //                 required
        //                 value={Receiver}
        //                 onChange={(e) => setReceiver(e.target.value)}
        //             />
        //             <label>Blog author:</label>
        //             <label>Amount:</label>
        //             <input
        //                 type="text"
        //                 required
        //                 value={Amount}
        //                 onChange={(e) => setAmount(e.target.value)}
        //             />
        //
        //             <button>Save</button>
        //         </form>
        //     </div>
        // </Card>

        // <div className="content">
        <div className="card">
        {/*<div >*/}
            <button onClick={handleLogin} className="btn btn-danger btn-block">Login to Block Chian</button>
            <h3>Add a New Payment Contract</h3>
            <form onSubmit={handleMakeContract}>
                <label>Payment ID</label>
                {/*<div className="inputbox">*/}
                    <input
                        type="text"
                        required
                        value={PaymentID}
                        onChange={(e) => setPaymentID(e.target.value)}
                    />
                {/*</div>*/}
                {/*<span>Payment ID</span>*/}

                <label>Receiver Address:</label>
                <input
                    type="text"
                    required
                    value={Receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <label>Amount:</label>
                <input
                    type="text"
                    required
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <p>Balance: ${balance}</p>

                {/*<label>Blog author:</label>*/}
                {/*<select*/}
                {/*    value={author}*/}
                {/*    onChange={(e) => setAuthor(e.target.value)}*/}
                {/*>*/}
                {/*    <option value="mario">mario</option>*/}
                {/*    <option value="yoshi">yoshi</option>*/}
                {/*</select>*/}

                <button className="btn btn-danger btn-block">Save</button>
            </form>
        </div>

    );
}

export default Contract;