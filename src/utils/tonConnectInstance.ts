import TonConnect from '@tonconnect/sdk';

export const connector = new TonConnect(
    {
        manifestUrl: 'https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json'
    }
);

connector.onStatusChange((walletInfo) => {
    console.log('Wallet status changed:', walletInfo);

    if (walletInfo) {
        console.log('Connected to wallet:', walletInfo);
        // You can access walletInfo properties like walletInfo.account, walletInfo.name, etc.
    } else {
        console.log('Disconnected from wallet.');
    }
});

connector.restoreConnection();