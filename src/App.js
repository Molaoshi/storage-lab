import React, {useState} from "react";
import {simpleStorage} from "./abi/abi";
import Web3 from "web3";
import './App.css';

const web3 = new Web3(Web3.givenProvider)

const contractAddress = "0xd8B6239B2BF1e9706CA04156B113f90E99C15670";
const storageContract = new web3.eth.Contract(simpleStorage, contractAddress);

//creating the hooks
function App() {
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

const numberSet = async (t) => {
  t.preventDefault();
  //makes sure we are calling our connected address via metamask
  const accounts = await window.ethereum.enable();

  //pulls in the connect account
  const account = accounts[0];

  //Request permission to acces user funds and calculate potential gas
  const gas = await storageContract.methods.set(number).estimateGas();
  
  // confirm transaction (post paying fees)
  const post = await storageContract.methods.set(number).send({
    from: account,
    gas,
  });

};

const numberGet = async (t) => {
  t.preventDefault();
  // retrieve our set number
  const post = await storageContract.methods.get().call();

  // pass the new value we declared
  setGet(post);
};

return (
  <div className="main">
    <div className="card">
      <form className="form" onSubmit={numberSet}>
        <label>
          Set your uint256:
          <input
            className="input"
            type="text"
            name="name"
            onChange={(t) => setUint(t.target.value)}
          />
        </label>
        <button className="button" type="submit" value="Confirm">
          Confirm
        </button>
      </form>
      <br />
      <button className="button" onClick={numberGet} type="button">
        Get your uint256
      </button>
      {getNumber}
    </div>
  </div>
);
}

export default App;
