export interface IBitcoin {
    lock_time: number;
    ver: number;
    size: number;
    inputs: Array<IBitcoinInput>;
    time: Date;
    tx_index: number;
    vin_sz: number;
    hash: string;
    vout_sz: number;
    relayed_by: string;
    out: Array<IBitcoinOut>;
}

export interface IBitcoinInput {
    sequence: number;
    prev_out: IBitcoinOut;
    script: string;
}

export class IBitcoinOut {
    spent: boolean;
    tx_index: number;
    type: 0;
    addr: string;
    value: number;
    n: number;
    script: string;
}
