import { decimalToBinary } from "../utils";

export class IPv4 {
    ip: string[];
    slash: number;
    nbBitsHostPart: number;

    /* todo: 
      validate only 2 parts
      validate only 4 parts and they are all int btw 0 and 254
      validate slash is an int btw 0 and 32


      features:
display network, broadcast, first, last, nb ip av, subnet
      */

    constructor(ip: string) {
        /* todo: 
        validate only 2 parts
        validate only 4 parts and they are all int btw 0 and 254
        validate slash is an int btw 0 and 32 */
        if (ip.split("/").length != 2) {
            throw "IPv4 has 2 parts";
        }
        if (ip.split("/")[0].split(".").length != 4) {
            throw "IPv4 is composed of 4 bytes";
        }
        // default ip otherwise ts complains
        this.ip = [];

        ip.split("/")[0]
            .split(".")
            .forEach((byte) => this.ip.push(byte));
        this.slash = Number(ip.split("/")[1]);
        this.nbBitsHostPart = 32 - this.slash;
    }

    getMask(): string {
        const n = Math.floor(this.slash / 8);
        let mask = [];

        for (let i = 0; i < n; i++) {
            mask.push(255);
        }

        // number of bits for the network part on the (n+1)byte
        const networkBits =
            this.nbBitsHostPart % 8 != 0 ? 8 - (this.nbBitsHostPart % 8) : 0;

        // all the network bits are set to ones and the remainding bits are zeroes
        let nextByte = "1".repeat(networkBits) + "0".repeat(8 - networkBits);

        mask.push(parseInt(nextByte, 2));

        // finish by filling with zeroes the remaining bytes
        for (let i = n + 2; i < 5; i++) {
            mask.push(0);
        }

        return mask.join(".");
    }

    getNbHostsAvailable(): number {
        return 2 ** (32 - this.slash) - 2;
    }

    getFirstIpAvailable(): string {
        let firstIpAvailable = [];
        this.getNetwork()
            .split(".")
            .forEach((byte) => firstIpAvailable.push(byte));

        firstIpAvailable[3] = Number(this.getNetwork().split(".")[3]) + 1;
        firstIpAvailable.forEach((byte) => byte.toString());

        return firstIpAvailable.join(".");
    }

    getLastIpAvailable(): string {
        let lastIpAvailable = [];
        this.getBroadcast()
            .split(".")
            .forEach((byte) => lastIpAvailable.push(byte));

        lastIpAvailable[3] = Number(this.getBroadcast().split(".")[3]) - 1;
        lastIpAvailable.forEach((byte) => byte.toString());

        return lastIpAvailable.join(".");
    }

    getBroadcast(): string {
        // the first n bytes are fixed
        const n = Math.floor(this.slash / 8);

        let broadcast = [];
        for (let i = 0; i < n; i++) {
            broadcast.push(Number(this.ip[i]));
        }
        // number of bits for the network part on the (n+1)byte
        const networkBits =
            this.nbBitsHostPart % 8 != 0 ? 8 - (this.nbBitsHostPart % 8) : 0;

        // convert the n byte into bin and keep its network part
        let nextByte = ("00000000" + decimalToBinary(Number(this.ip[n])))
            .slice(-8)
            .slice(0, networkBits);

        // fill the rest of the byte part with ones
        for (let i = networkBits + 1; i < 9; i++) {
            nextByte += "1";
        }
        broadcast.push(parseInt(nextByte, 2));

        // finish by filling with 255 the remaining bytes
        for (let i = n + 2; i < 5; i++) {
            broadcast.push(255);
        }

        return broadcast.join(".");
    }

    getNetwork(): string {
        // the first n bytes are fixed
        const n = Math.floor(this.slash / 8);

        let network = [];
        for (let i = 0; i < n; i++) {
            network.push(Number(this.ip[i]));
        }
        // number of bits for the network part on the (n+1)byte
        const networkBits =
            this.nbBitsHostPart % 8 != 0 ? 8 - (this.nbBitsHostPart % 8) : 0;

        // convert the n byte into bin and keep its network part
        let nextByte = ("00000000" + decimalToBinary(Number(this.ip[n])))
            .slice(-8)
            .slice(0, networkBits);

        // fill the rest of the byte part with zeroes
        for (let i = networkBits + 1; i < 9; i++) {
            nextByte += "0";
        }
        network.push(parseInt(nextByte, 2));

        // finish by filling with 0 the remaining bytes
        for (let i = n + 2; i < 5; i++) {
            network.push(0);
        }

        return network.join(".");
    }
}