export interface Setting {
    id: number;
    key: string;
    name: string;
    description: string;
}

export const DEFAULT_SETTINGS: Setting[] = [
    {   id: 1,
        key: "transactionConfirmationAlerts",
        name: "Transaction Confirmation Alerts",
        description: "Receive notifications when your transactions are confirmed on the blockchain."
    },
    {
        id: 2,
        key: "securityAlerts",
        name: "Security Alerts",
        description: "Get notified of any suspicious activity or unauthorized access attempts on your account."
    },
    {
        id: 3,
        key: "tokenPriceAlerts",
        name: "Token Price Alerts",
        description: "Enable notifications for price changes or milestones for tokens in your watchlist."
    },
    {
        id: 4,
        key: "stakingAndRewardUpdates",
        name: "Staking and Reward Updates",
        description: "Stay informed about staking rewards, earnings, and updates on your staking activities."
    },
    {
        id: 5,
        key: "systemAndMaintenanceAnnouncements",
        name: "System and Maintenance Announcements",
        description: "Receive notifications about upcoming maintenance, system updates, or any changes affecting the platform's functionality."
    }
]