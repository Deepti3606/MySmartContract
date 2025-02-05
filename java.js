const contractAddress = "0xYourDeployedContractAddress"; // Replace with deployed address
const abi = [ /* Insert ABI Here */ ];
let web3, contract, account;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log("Connected:", account);

        contract = new web3.eth.Contract(abi, contractAddress);
        setupEventListeners();
    } else {
        alert("Please install MetaMask!");
    }
});

function setupEventListeners() {
    document.getElementById("registerLand").addEventListener("click", async () => {
        const area = document.getElementById("landArea").value;
        const location = document.getElementById("landLocation").value;
        try {
            await contract.methods.registerLand(area, location).send({ from: account });
            document.getElementById("registerLandStatus").innerText = "Land registered!";
        } catch (error) {
            document.getElementById("registerLandStatus").innerText = `Error: ${error.message}`;
        }
    });

    document.getElementById("transferOwnership").addEventListener("click", async () => {
        const landId = document.getElementById("landId").value;
        const newOwner = document.getElementById("newOwner").value;
        try {
            await contract.methods.transferOwnership(landId, newOwner).send({ from: account });
            document.getElementById("transferOwnershipStatus").innerText = "Ownership transferred!";
        } catch (error) {
            document.getElementById("transferOwnershipStatus").innerText = `Error: ${error.message}`;
        }
    });

    document.getElementById("getLandRecord").addEventListener("click", async () => {
        const landId = document.getElementById("checkLandId").value;
        try {
            const land = await contract.methods.getLand(landId).call();
            document.getElementById("landRecord").innerText =
                `Land ID: ${land[0]} | Owner: ${land[1]} | Area: ${land[2]} sqm | Location: ${land[3]}`;
        } catch (error) {
            document.getElementById("landRecord").innerText = `Error: ${error.message}`;
        }
    });
}
