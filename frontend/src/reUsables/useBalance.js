/** Sample Custom Hook */
// import { useState, useEffect } from 'react';
//
// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         setTimeout(() => {
//             fetch(url)
//                 .then(res => {
//                     if (!res.ok) { // error coming back from server
//                         throw Error('could not fetch the data for that resource');
//                     }
//                     return res.json();
//                 })
//                 .then(data => {
//                     setIsPending(false);
//                     setData(data);
//                     setError(null);
//                 })
//                 .catch(err => {
//                     // auto catches network / connection error
//                     setIsPending(false);
//                     setError(err.message);
//                 })
//         }, 1000);
//     }, [url])
//
//     return { data, isPending, error };
// }
//
// export default useFetch;


import { useState, useEffect } from 'react';

// const bal = async (address) => {
//     let balance = await coin.balanceOf(paymentProcessor.address) / (10 ** 18 );
//     console.log(balance.toString());
//     setBalance(balance.toString());
// }


const useBalance = (address) => {
    // const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [balance, setBalance] = useState(null);

    useEffect(async () => {
        let balance = await coin.balanceOf(paymentProcessor.address) / (10 ** 18 );
        setBalance(balance);
    }, [address])

    return { isPending , balance};
}

export default useBalance();