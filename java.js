document.addEventListener('DOMContentLoaded', async () => {
    const contractAddress = "0xB11370E61f8fCD42D679a2cC8d425DdFCd5b9F96"; // Replace with your contract address
    const abi = [/* Insert ABI Array Here */];
    
    let web3;
    let contract;
    let account;

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log("Connected account:", account);
            
            contract = new web3.eth.Contract(abi, contractAddress);

            setupEventListeners();
            updateBalance();
        } catch (error) {
            console.error("User denied account access:", error);
        }
    } else {
        alert('Please install MetaMask to use this app.');
    }

    function setupEventListeners() {
        document.getElementById('createAccount').addEventListener('click', async () => {
            try {
                await contract.methods.createAccount().send({ from: account });
                document.getElementById('createAccountStatus').innerText = "Account created successfully!";
                updateBalance();
            } catch (error) {
                document.getElementById('createAccountStatus').innerText = `Error: ${error.message}`;
            }
        });

        document.getElementById('deposit').addEventListener('click', async () => {
            const amount = document.getElementById('depositAmount').value;
            try {
                await contract.methods.deposit().send({ from: account, value: web3.utils.toWei(amount, "ether") });
                document.getElementById('depositStatus').innerText = "Deposit successful!";
                updateBalance();
            } catch (error) {
                document.getElementById('depositStatus').innerText = `Error: ${error.message}`;
            }
        });

        document.getElementById('withdraw').addEventListener('click', async () => {
            const amount = document.getElementById('withdrawAmount').value;
            try {
                await contract.methods.withdraw(web3.utils.toWei(amount, "ether")).send({ from: account });
                document.getElementById('withdrawStatus').innerText = "Withdrawal successful!";
                updateBalance();
            } catch (error) {
                document.getElementById('withdrawStatus').innerText = `Error: ${error.message}`;
            }
        });

        document.getElementById('transfer').addEventListener('click', async () => {
            const to = document.getElementById('transferTo').value;
            const amount = document.getElementById('transferAmount').value;
            try {
                await contract.methods.transfer(to, web3.utils.toWei(amount, "ether")).send({ from: account });
                document.getElementById('transferStatus').innerText = "Transfer successful!";
                updateBalance();
            } catch (error) {
                document.getElementById('transferStatus').innerText = `Error: ${error.message}`;
            }
        });

        document.getElementById('getBalance').addEventListener('click', updateBalance);
    }

    async function updateBalance() {
        try {
            const balance = await contract.methods.getBalance().call({ from: account });
            document.getElementById('balance').innerText = `Your balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
        } catch (error) {
            document.getElementById('balance').innerText = `Error: ${error.message}`;
        }
    }
});
