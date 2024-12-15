import TonConnect from '@tonconnect/sdk';

export const connector = new TonConnect(
    {
        manifestUrl: 'https://food-delivery-web-beryl.vercel.app/tonconnect-manifest.json'
    }
);

connector.restoreConnection();