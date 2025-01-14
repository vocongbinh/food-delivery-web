import { beginCell, Cell, contractAddress, internal, SendMode, StateInit, Address, SenderArguments, toNano } from 'ton-core';

export function prepareCreateOrderContractTransfer(contractAddress: string, opts: {
    owner: Address;
    order_id: string;
    name: string;
    image: string;
    quantity: number;
    price: bigint;
    value: bigint;
}) {
    const address = Address.parse(contractAddress);
    // Prepare Jetton transfer message
    const transferBody = beginCell()
        .storeAddress(opts.owner)
        .storeRef(beginCell().storeStringTail(opts.order_id).endCell())
        .storeRef(beginCell().storeStringTail(opts.name).endCell())
        .storeRef(beginCell().storeStringTail(opts.image).endCell())
        .storeUint(opts.quantity, 32)
        .storeCoins(opts.price)
        .endCell()
    const message: SenderArguments = {
        to: address,
        value: toNano(0.02),
        body: transferBody,

    };
    return message;

}