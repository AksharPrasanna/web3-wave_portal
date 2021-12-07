const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address)
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("Hello!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Howdy!");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
