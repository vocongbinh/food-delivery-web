import TonConnect from '@tonconnect/sdk';

export const connector = new TonConnect(
    {
        manifestUrl: 'https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json'
    }
);

connector.restoreConnection();