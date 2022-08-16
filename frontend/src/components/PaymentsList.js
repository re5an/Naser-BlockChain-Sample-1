
import React, {useEffect} from 'react';
import {useState} from "react";
import getBlockchain from "../ethereum";
import {ethers, utils} from 'ethers';
import axios from 'axios';
import {Link} from "react-router-dom";


const PaymentsList = ({paymentProcessor, BCT, signerAddress}) => {
// const PaymentsList = () => {

    const [Payments, setPayments] = useState(null);
    const [user, setUser] = useState(signerAddress);
    const [isStatusPending, setStatusPending] = useState(false);
    const [isListPending, setListPending] = useState(true);
    const [reloadList, setReloadList] = useState(true);

    var userPayments;

    useEffect( () => {
        ( async function(){
                let {paymentProcessor, BCT, signerAddress} = await getBlockchain();
                let bcData = {paymentProcessor, BCT, signerAddress};
                dd(bcData, 'bcData:');
                setUser(bcData.signerAddress);
                dd(bcData.signerAddress, 'user bctData.signerAddress');
        }()
        )
    }, []);

    useEffect( () => {
        (async function() {
            try {
                userPayments = await axios.get(`/getUserPayments?payer=` + user);
                if (userPayments.data && userPayments.data.length > 0)
                    setPayments(userPayments.data);

                dd(userPayments, 'userPayments: ');
            } catch (err) {
                dd(err, 'err: ')
            }
            setListPending(false);

            // dd(Payments, ' Payments State : ');
        }()
        )

    }, [user, reloadList]);

    const dd = (val, name = null) => {
        if (name) console.log(name);
        console.log(val);
    }

    const forwardPaymentStatus = async (item) => {
        setStatusPending(true);
        let res = null;
            try {
            res = await axios.get(`/forwardStatus?id=` + item);
            dd(res, 'backend response:');
            if (res.data.error !== null){}
            setReloadList(!reloadList);
        } catch (err) {
            dd(err, 'forwardStatus Error:');
        } finally {
            setStatusPending(false);
        }
    }

    const unFreezePayment = async (item) => {
        setStatusPending(true);
        let res = null;
        try {
            res = await axios.get(`/unFreeze?id=` + item);
            dd(res, 'backend response:');
            if (res.data.error !== null){}
            setReloadList(!reloadList);
        } catch (err) {
            dd(err, 'unFreezePayment Error:');
        } finally {
            setStatusPending(false);
        }
    }

    const freezePayment = async (item) => {
        setStatusPending(true);
        let res = null;

        try {
            //--- Approve Amount
            let amnt = utils.parseEther(item.amount);
            const approveTx = await BCT.approve(paymentProcessor.address, amnt);
            // await approveTx.wait(1);
            dd(approveTx,'Approve Passed:');

            //--- Freeze Amount
            res = await axios.get(`/freezeAmount?id=` + item.id);
            dd(res, 'backend response:');
            if (res.data.error !== null){}
            setReloadList(!reloadList);
        } catch (err) {
            dd(err, 'FreezePayment Error:');
        } finally {
            setStatusPending(false);
        }
    }

    const transferToReceiver = async (item) => {
        setStatusPending(true);
        let res = null;
        try {
            res = await axios.get(`/transferToReceiver?id=` + item);
            dd(res, 'backend response:');
            if (res.data.error !== null){
                dd(res.data.error, 'transferToReceiver Error:');
            }
            setReloadList(!reloadList);
        } catch (err) {
            dd(err, 'transferToReceiver Error:');
        } finally {
            setStatusPending(false);
        }
    }

    return (

        <div className="card">

            <h3>Payment Contracts</h3>

            {/*{userPayments}*/}

            {isListPending && <div>Its Loading. Please Wait ...</div>}

            <ul className="list-group" style={{
                margin:'5px',
                borderRadius: '11px'
            }}>
                {Payments && Payments.map(Payment =>
                    <li className="list-group-item" key={Payment.id}>
                        <div className="row"><span className='font-weight-bold'> id: </span> {Payment.id}</div>
                        <div className="row"><span className='font-weight-bold'> Amount: </span> {Payment.amount}</div>
                        <div className="row"><span className='font-weight-bold'> Frozen: </span> {Payment.frozen.toString()}</div>
                        <div className="row"><span className='font-weight-bold'> Paid: </span> {Payment.paid.toString()}</div>
                        <div className="row"><span className='font-weight-bold'> Receiver: </span> {Payment.receiver}</div>
                        <div className="row"><span className='font-weight-bold'> Status: </span> {Payment.status}</div>

                        <div className="row">

                            <button type="button" className="btn btn-success" onClick={() => forwardPaymentStatus(Payment.id)} disabled={isStatusPending} >
                                Forward Status
                            </button>

                            {Payment.frozen == false && <button type="button" className="btn btn-info" onClick={() => freezePayment(Payment)}
                                     disabled={isStatusPending}>
                                Freeze
                            </button>}

                            {Payment.frozen && Payment.paid == false  && <button type="button" className="btn btn-danger"
                                     onClick={() => unFreezePayment(Payment.id)} disabled={isStatusPending}>
                                unFreeze
                            </button>}

                            {Payment.frozen && Payment.paid == false && <button type="button" className="btn btn-primary"
                                     onClick={() => transferToReceiver(Payment.id)}
                                     disabled={isStatusPending}>
                                     {/*disabled={Payment.frozen == false || Payment.paid == true}>*/}
                                Pay to Receiver
                            </button>}
                            {/*<Link to={"/payments/${Payment.id}"} className="btn btn-danger btn-block">Operation</Link>*/}
                        </div>

                    </li>
                )}
            </ul>

        </div>

    );
}

export default PaymentsList;