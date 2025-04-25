import { IPv4 } from "./IPv4";
import { binaryToDecimal, decimalToBinary } from "./utils";

export type Subnet = {
    name: string;
    hostsNeeded: number;
    hostsAvailable?: number;
    unusedHosts?: number;
    network?: string;
    broadcast?: string;
    firstHost?: string;
    lastHost?: string;
    slashMask?: number;
    mask?: string;
};

export class Subnetting {
    ip: IPv4;
    subnets: Subnet[];

    constructor(ip: IPv4, subnets: Subnet[]) {
        this.ip = ip;
        this.subnets = subnets;
    }

    getFLSMSubnets(): Subnet[] {
        // descending order to get largest subnet first
        this.subnets.sort((a, b) => b.hostsNeeded - a.hostsNeeded);

        // check the number of bits to borrow from network to have enough subnets
        let nbSubnetBitsPart = 0;
        while (2 ** nbSubnetBitsPart < this.subnets.length) {
            nbSubnetBitsPart++;
        }
        const slash = this.ip.slash + nbSubnetBitsPart;

        if (!(2 ** (32 - slash) - 2 >= this.subnets[0].hostsNeeded) || slash > 32) {
            throw "Subnetting is not possible, mask is too small";
        }

        let subnetPart = "0".repeat(nbSubnetBitsPart);

        // represents the immutable part of the subnet
        let binSubnetBase = "";
        this.ip.ip.forEach((byte) => (binSubnetBase += ("00000000" + decimalToBinary(byte)).slice(-8)));
        // we keep only the immutable part of the subnet
        binSubnetBase = binSubnetBase.slice(0, this.ip.slash);

        let subnets: Subnet[] = [];

        for (let currentSubnetIndex = 0; currentSubnetIndex < this.subnets.length; currentSubnetIndex++) {
            const currentSubnet = binSubnetBase + subnetPart + "0".repeat(32 - slash);

            // convert the string into an array of numbers
            let network = "";

            for (let i = 0; i < 32; i += 8) {
                const byte = currentSubnet.slice(i, i + 8);
                network += binaryToDecimal(byte) + (i < 24 ? "." : "");
            }
            const currentSubnetIpv4 = new IPv4(network + "/" + slash);

            subnets.push({
                name: this.subnets[currentSubnetIndex].name,
                hostsNeeded: this.subnets[currentSubnetIndex].hostsNeeded,
                hostsAvailable: currentSubnetIpv4.getNbHostsAvailable(),
                unusedHosts: currentSubnetIpv4.getNbHostsAvailable() - this.subnets[currentSubnetIndex].hostsNeeded,
                network: network,
                broadcast: currentSubnetIpv4.getBroadcast(),
                firstHost: currentSubnetIpv4.getFirstHostAvailable(),
                lastHost: currentSubnetIpv4.getLastHostAvailable(),
                slashMask: slash,
                mask: currentSubnetIpv4.getMask(),
            });

            // increment the subnet part
            // convert back to binary
            // ensure the bin number is represented over nbSubnetBitsPart bits
            subnetPart = ("0".repeat(nbSubnetBitsPart) + decimalToBinary(binaryToDecimal(subnetPart) + 1)).slice(
                -nbSubnetBitsPart
            );
        }

        return subnets;
    }

    getVLSMSubnets(): Subnet[] {
        // descending order to get largest subnet first
        this.subnets.sort((a, b) => b.hostsNeeded - a.hostsNeeded);

        // check if there are enough bits to create the subnets
        if (!(2 ** this.ip.nbBitsHostPart - 2 * this.subnets.length >= 0)) {
            throw "Subnetting is not possible, mask is too small";
        }

        let subnets: Subnet[] = [];

        // get the largest subnet power
        let power = 0;
        while (2 ** power - 2 < this.subnets[0].hostsNeeded) {
            power++;
        }
        let slash = 32 - power;

        let nbSubnetBitsPart = 32 - power - this.ip.slash;
        if (nbSubnetBitsPart < 0) {
            throw "Subnetting is not possible, mask is too small";
        }
        let subnetPart = "0".repeat(nbSubnetBitsPart);

        // represents the immutable part of the subnet
        let binSubnetBase = "";
        this.ip.ip.forEach((byte) => (binSubnetBase += ("00000000" + decimalToBinary(byte)).slice(-8)));
        // we keep only the immutable part of the subnet
        binSubnetBase = binSubnetBase.slice(0, this.ip.slash);

        const currentSubnet = binSubnetBase + subnetPart + "0".repeat(power);

        // convert the string into an array of numbers
        let network = "";

        for (let i = 0; i < 32; i += 8) {
            const byte = currentSubnet.slice(i, i + 8);
            network += binaryToDecimal(byte) + (i < 24 ? "." : "");
        }
        const currentSubnetIpv4 = new IPv4(network + "/" + slash);

        subnets.push({
            name: this.subnets[0].name,
            hostsNeeded: this.subnets[0].hostsNeeded,
            hostsAvailable: currentSubnetIpv4.getNbHostsAvailable(),
            unusedHosts: currentSubnetIpv4.getNbHostsAvailable() - this.subnets[0].hostsNeeded,
            network: network,
            broadcast: currentSubnetIpv4.getBroadcast(),
            firstHost: currentSubnetIpv4.getFirstHostAvailable(),
            lastHost: currentSubnetIpv4.getLastHostAvailable(),
            slashMask: slash,
            mask: currentSubnetIpv4.getMask(),
        });

        for (let currentSubnetIndex = 1; currentSubnetIndex < this.subnets.length; currentSubnetIndex++) {
            power = 0;
            while (2 ** power - 2 < this.subnets[currentSubnetIndex].hostsNeeded) {
                power++;
            }
            slash = 32 - power;

            if (nbSubnetBitsPart === 32 - power - this.ip.slash) {
                // increment the subnet part
                // convert back to binary
                // ensure the bin number is represented over nbSubnetBitsPart bits
                subnetPart = ("0".repeat(nbSubnetBitsPart) + decimalToBinary(binaryToDecimal(subnetPart) + 1)).slice(
                    -nbSubnetBitsPart
                );
            } else {
                // add zeroes to complete the subnet part when extending it
                subnetPart =
                    ("0".repeat(nbSubnetBitsPart) + decimalToBinary(binaryToDecimal(subnetPart) + 1)).slice(
                        -nbSubnetBitsPart
                    ) + "0".repeat(32 - power - this.ip.slash - nbSubnetBitsPart);
            }
            nbSubnetBitsPart = 32 - power - this.ip.slash;

            const currentSubnet = binSubnetBase + subnetPart + "0".repeat(power);

            // convert the string into an array of numbers
            let network = "";

            for (let i = 0; i < 32; i += 8) {
                const byte = currentSubnet.slice(i, i + 8);
                network += binaryToDecimal(byte) + (i < 24 ? "." : "");
            }
            const currentSubnetIpv4 = new IPv4(network + "/" + slash);

            subnets.push({
                name: this.subnets[currentSubnetIndex].name,
                hostsNeeded: this.subnets[currentSubnetIndex].hostsNeeded,
                hostsAvailable: currentSubnetIpv4.getNbHostsAvailable(),
                unusedHosts: currentSubnetIpv4.getNbHostsAvailable() - this.subnets[currentSubnetIndex].hostsNeeded,
                network: network,
                broadcast: currentSubnetIpv4.getBroadcast(),
                firstHost: currentSubnetIpv4.getFirstHostAvailable(),
                lastHost: currentSubnetIpv4.getLastHostAvailable(),
                slashMask: slash,
                mask: currentSubnetIpv4.getMask(),
            });
        }

        return subnets;
    }
}
