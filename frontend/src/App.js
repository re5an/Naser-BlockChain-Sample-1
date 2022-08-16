import React, { useState, useEffect } from 'react';
import Store from './components/Store.js';
import Contract from './components/Contract.jsx';
import getBlockchain from './ethereum.js';
import Navbar from "./components/Navbar";
import Buy from "./components/Buy";
import Sell from "./components/Sell";
import Wallet from "./components/Wallet";
import PaymentsList from "./components/PaymentsList";

import './appRed.css';
import './navbar.css';
import './green.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Transfer from "./components/Transfer";


function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [BCT, setBCT] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, BCT, signerAddress } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setBCT(BCT);
      setSignerAddress(signerAddress);
    }
    init();
  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-1'>
          <h1>ERC20 Tokens Barpin</h1>
          <p>You need to install the latest version of Metamask to use this app. Metamask is an Ethereum wallet, available as a Google chrome extension.</p>
          <ul>
            <li>Go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Metamask page</a> on the chrome webstore and install it</li>  
            <li>If you already have it installed, uninstall and re-install it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
      <Router>
        {/*<Layout>*/}
          <Navbar />
          <Routes>
            <Route exact path="/store" element={<Store/>}/>
            <Route exact path="/" element={<Contract paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress}/>}/>
            <Route exact path="/Contract" element={<Contract paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress} />}/>
            <Route exact path="/buy" element={<Buy paymentProcessor={paymentProcessor} BCT={BCT} />}/>
            <Route exact path="/sell" element={<Sell paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress}/>}/>
            <Route exact path="/wallet" element={<Wallet paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress}/>}/>
            <Route exact path="/payments" element={<PaymentsList paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress}/>}/>
            <Route exact path="/transfer" element={<Transfer paymentProcessor={paymentProcessor} BCT={BCT} signerAddress={signerAddress}/>}/>

            {/*<Route exact path="/recovery-password" element={<RecoveryPassword/>}/>*/}
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Routes>
        {/*</Layout>*/}
      </Router>


    // <div className='container'>
    //   <div className='col-sm-12'>
    //     <h1>Barpin Smart Contract Maker</h1>
    //     <Store paymentProcessor={paymentProcessor} BCT={BCT} />
    //   </div>
    // </div>
  );
}

export default App;
