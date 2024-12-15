import TonConnect from '@tonconnect/sdk';

export const connector = new TonConnect(
    {
        manifestUrl: 'https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json'
    }
);
async function initializeConnector() {
    try {
        // Check if the manifest is correctly loaded
        const response = await fetch("https://vocongbinh.github.io/food-delivery-TMA/tonconnect-manifest.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch manifest: ${response.statusText}`);
        }
        const manifestData = await response.json();
        console.log('Manifest Loaded:', manifestData);

        // Now restore connection
        await connector.restoreConnection();
        console.log('Connection restored successfully');
    } catch (error) {
        console.error('Error initializing connection or retrieving address:', error);
    }
}

// Initialize the connector
initializeConnector();