const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "giraffe garden program modify brick truth ready enhance piano tennis account cram";

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/5ced7720ca7a4a86bcc0970fd0c2f7f2")
      },
      network_id: 3
    }
  }
};