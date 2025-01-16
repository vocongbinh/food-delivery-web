import { beginCell, Cell, contractAddress, internal, SendMode, StateInit, Address, SenderArguments, toNano } from 'ton-core';

export function prepareCreateOrderContractTransfer(contractAddress: string, opts: {
    owner: Address;
    value: bigint;
}) {
    const address = Address.parse(contractAddress);
    // Prepare Jetton transfer message
    const transferBody = beginCell()
        .storeUint(4, 32)
        .storeAddress(opts.owner)
        .endCell()
    const message: SenderArguments = {
        to: address,
        value: opts.value,
        body: transferBody,

    };
    return message;

}

export function generateOrderId() {
    const timestamp = Date.now(); // Lấy thời gian hiện tại
    const random = Math.floor(Math.random() * 1000); // Số ngẫu nhiên
    return `ORD-${timestamp}-${random}`; // Kết hợp
}
export function getTONPrice(price: number) {
    return parseFloat((price / (25000 * 5.66)).toFixed(2));
}