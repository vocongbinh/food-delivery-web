
import { Address, beginCell, SenderArguments, toNano } from 'ton-core';
import {JettonMaster, JettonWallet, TonClient} from "ton"

export const client = new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", 
    apiKey: process.env.NEXT_PUBLIC_TONCENTER_API_KEY 
  });

export function prepareJettonTransfer(jettonWalletAddress: string, recipientAddress:string, jettonAmount:number) {
    const walletAddress = Address.parse(jettonWalletAddress);
    const recipient = Address.parse(recipientAddress);

    // Prepare Jetton transfer message
    const transferBody = beginCell()
        .storeUint(0x0f8a7ea5, 32)  // OP code for Jetton transfer
        .storeUint(0, 64)  // Querry ID
        .storeCoins(toNano(jettonAmount))  // Amount of Jettons to send
        .storeAddress(recipient)  // Recipient address
        .storeAddress(Address.parse("0QAY0-nximDrQIdBrH4r8RpJz9WtVANal49taOGX6u5LHXIH"))  // Recipient address
        .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
        .storeCoins(toNano("0.05"))                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
        .storeUint(0,1)
        .endCell();
    
    // Prepare the full Jetton transaction
    const message:SenderArguments = {
        to: walletAddress,
        value: toNano(0.1),  // Amount of TONs for transaction fees (adjust if necessary)
        body: transferBody,  // Serialized message body in base64

    };

    return message;
}

export async function getJettonAddress(address: string) {
    const jettonMaster = new JettonMaster(Address.parse("kQAoj7j8Sy0enWZcjy6Je7G_ixzlCh2QaCThAv67vOkEGAbk"))
    const jettonWallet = await client.open(jettonMaster).getWalletAddress(Address.parse(address))
    return jettonWallet;
}   

export async function getJettonBalance(address: Address) {
    const {stack} = await client.callGetMethod(address, "get_wallet_data")
    const balance = stack.readBigNumber();
    return Number(balance / BigInt(1000000000))
}