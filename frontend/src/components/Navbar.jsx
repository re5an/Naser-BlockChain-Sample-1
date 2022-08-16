import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Smart Contract Maker</h1>
            <div className="links">
                <Link to="/Contract">Contract</Link>
                <Link to="/store">store</Link>
                <Link to="/buy">Buy</Link>
                <Link to="/sell">Sell</Link>
                <Link to="/wallet">Wallet</Link>
                <Link to="/payments">Payments</Link>
                {/*<Link to="/buy" style={{*/}
                {/*    color: 'white',*/}
                {/*    backgroundColor: '#f1356d',*/}
                {/*    borderRadius: '8px'*/}
                {/*}}>Buy</Link>*/}
            </div>
        </nav>
    );
}

export default Navbar;