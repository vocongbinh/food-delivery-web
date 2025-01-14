import { NumberFormatterCallbackFunction } from "highcharts"

export type Jetton = {
    address: string,
    name: string,
    symbol: string,
    decimals: number,
    image: string;
    verification: string;
    balance: number;
}