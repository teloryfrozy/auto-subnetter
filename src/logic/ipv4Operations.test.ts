import { IPv4, Subnetting } from "./ipv4Operations";

describe("IPv4 class features test", () => {
    const ip1 = new IPv4("192.168.1.0/1");
    const ip21 = new IPv4("192.168.1.0/21");
    const ip22 = new IPv4("192.168.1.0/22");
    const ip24 = new IPv4("192.168.1.0/24");
    const ip28 = new IPv4("192.168.1.0/28");
    const ip30 = new IPv4("192.168.1.0/30");
    const ip31 = new IPv4("192.168.1.0/31");
    const ip32 = new IPv4("192.168.1.0/32");

    it("VLSM for 172.16.0.0/22", () => {
        const subnet = new Subnetting(new IPv4("172.16.0.0/22"), [
            {
                name: "Subnet 1",
                hostsNeeded: 58,
            },
            {
                name: "Subnet 2",
                hostsNeeded: 26,
            },
            {
                name: "Subnet 3",
                hostsNeeded: 10,
            },
            {
                name: "Subnet 4",
                hostsNeeded: 10,
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
            },
        ]);
        const subnets = subnet.getVLSMSubnets();
        expect(subnets.length).toEqual(7);

        const expectedSubnets = [
            {
                name: "Subnet 1",
                hostsNeeded: 58,
                hostsAvailable: 62,
                unusedHosts: 4,
                network: "172.16.0.0",
                broadcast: "172.16.0.63",
                firstHost: "172.16.0.1",
                lastHost: "172.16.0.62",
                slashMask: 26,
                mask: "255.255.255.192",
            },
            {
                name: "Subnet 2",
                hostsNeeded: 26,
                hostsAvailable: 30,
                unusedHosts: 4,
                network: "172.16.0.64",
                broadcast: "172.16.0.95",
                firstHost: "172.16.0.65",
                lastHost: "172.16.0.94",
                slashMask: 27,
                mask: "255.255.255.224",
            },
            {
                name: "Subnet 3",
                hostsNeeded: 10,
                hostsAvailable: 14,
                unusedHosts: 4,
                network: "172.16.0.96",
                broadcast: "172.16.0.111",
                firstHost: "172.16.0.97",
                lastHost: "172.16.0.110",
                slashMask: 28,
                mask: "255.255.255.240",
            },
            {
                name: "Subnet 4",
                hostsNeeded: 10,
                hostsAvailable: 14,
                unusedHosts: 4,
                network: "172.16.0.112",
                broadcast: "172.16.0.127",
                firstHost: "172.16.0.113",
                lastHost: "172.16.0.126",
                slashMask: 28,
                mask: "255.255.255.240",
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "172.16.0.128",
                broadcast: "172.16.0.131",
                firstHost: "172.16.0.129",
                lastHost: "172.16.0.130",
                slashMask: 30,
                mask: "255.255.255.252",
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "172.16.0.132",
                broadcast: "172.16.0.135",
                firstHost: "172.16.0.133",
                lastHost: "172.16.0.134",
                slashMask: 30,
                mask: "255.255.255.252",
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "172.16.0.136",
                broadcast: "172.16.0.139",
                firstHost: "172.16.0.137",
                lastHost: "172.16.0.138",
                slashMask: 30,
                mask: "255.255.255.252",
            },
        ];

        expectedSubnets.forEach((expected, index) => {
            const actual = subnets[index];
            expect(actual.name).toEqual(expected.name);
            expect(actual.hostsNeeded).toEqual(expected.hostsNeeded);
            expect(actual.hostsAvailable).toEqual(expected.hostsAvailable);
            expect(actual.unusedHosts).toEqual(expected.unusedHosts);
            expect(actual.network).toEqual(expected.network);
            expect(actual.broadcast).toEqual(expected.broadcast);
            expect(actual.firstHost).toEqual(expected.firstHost);
            expect(actual.lastHost).toEqual(expected.lastHost);
            expect(actual.slashMask).toEqual(expected.slashMask);
            expect(actual.mask).toEqual(expected.mask);
        });
    });

    it("VLSM for 192.168.64.0/21", () => {
        const subnet = new Subnetting(new IPv4("192.168.64.0/21"), [
            {
                name: "Subnet 1",
                hostsNeeded: 120,
            },
            {
                name: "Subnet 2",
                hostsNeeded: 60,
            },
            {
                name: "Subnet 3",
                hostsNeeded: 30,
            },
            {
                name: "Subnet 4",
                hostsNeeded: 15,
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
            },
        ]);
        const subnets = subnet.getVLSMSubnets();
        expect(subnets.length).toEqual(7);

        const expectedSubnets = [
            {
                name: "Subnet 1",
                hostsNeeded: 120,
                hostsAvailable: 126,
                unusedHosts: 6,
                network: "192.168.64.0",
                broadcast: "192.168.64.127",
                firstHost: "192.168.64.1",
                lastHost: "192.168.64.126",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 2",
                hostsNeeded: 60,
                hostsAvailable: 62,
                unusedHosts: 2,
                network: "192.168.64.128",
                broadcast: "192.168.64.191",
                firstHost: "192.168.64.129",
                lastHost: "192.168.64.190",
                slashMask: 26,
                mask: "255.255.255.192",
            },
            {
                name: "Subnet 3",
                hostsNeeded: 30,
                hostsAvailable: 30,
                unusedHosts: 0,
                network: "192.168.64.192",
                broadcast: "192.168.64.223",
                firstHost: "192.168.64.193",
                lastHost: "192.168.64.222",
                slashMask: 27,
                mask: "255.255.255.224",
            },
            {
                name: "Subnet 4",
                hostsNeeded: 15,
                hostsAvailable: 30,
                unusedHosts: 15,
                network: "192.168.64.224",
                broadcast: "192.168.64.255",
                firstHost: "192.168.64.225",
                lastHost: "192.168.64.254",
                slashMask: 27,
                mask: "255.255.255.224",
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "192.168.65.0",
                broadcast: "192.168.65.3",
                firstHost: "192.168.65.1",
                lastHost: "192.168.65.2",
                slashMask: 30,
                mask: "255.255.255.252",
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "192.168.65.4",
                broadcast: "192.168.65.7",
                firstHost: "192.168.65.5",
                lastHost: "192.168.65.6",
                slashMask: 30,
                mask: "255.255.255.252",
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
                hostsAvailable: 2,
                unusedHosts: 0,
                network: "192.168.65.8",
                broadcast: "192.168.65.11",
                firstHost: "192.168.65.9",
                lastHost: "192.168.65.10",
                slashMask: 30,
                mask: "255.255.255.252",
            },
        ];

        expectedSubnets.forEach((expected, index) => {
            const actual = subnets[index];
            expect(actual.name).toEqual(expected.name);
            expect(actual.hostsNeeded).toEqual(expected.hostsNeeded);
            expect(actual.hostsAvailable).toEqual(expected.hostsAvailable);
            expect(actual.unusedHosts).toEqual(expected.unusedHosts);
            expect(actual.network).toEqual(expected.network);
            expect(actual.broadcast).toEqual(expected.broadcast);
            expect(actual.firstHost).toEqual(expected.firstHost);
            expect(actual.lastHost).toEqual(expected.lastHost);
            expect(actual.slashMask).toEqual(expected.slashMask);
            expect(actual.mask).toEqual(expected.mask);
        });
    });

    it("Wrong IP", () => {
        expect(() => {
            new IPv4("");
        }).toThrow("IPv4 is empty");
        expect(() => {
            new IPv4("192.168.1.0 24");
        }).toThrow("IPv4 does not have 2 parts");
        expect(() => {
            new IPv4("/24");
        }).toThrow("IPv4 is not composed of 4 bytes");
        expect(() => {
            new IPv4("192/24");
        }).toThrow("IPv4 is not composed of 4 bytes");
        expect(() => {
            new IPv4("192.168.1.1.0/24");
        }).toThrow("IPv4 is not composed of 4 bytes");
        expect(() => {
            new IPv4("192.168.1.-1/24");
        }).toThrow("Byte values must all be between 0 and 255");
        expect(() => {
            new IPv4("192.168.1.256/24");
        }).toThrow("Byte values must all be between 0 and 255");
        expect(() => {
            new IPv4("192.168.1.0/-1");
        }).toThrow("Illegal slash");
        expect(() => {
            new IPv4("192.168.1.0/0");
        }).toThrow("Illegal slash");
        expect(() => {
            new IPv4("192.168.1.0/33");
        }).toThrow("Illegal slash");
    });

    it("Mask", () => {
        expect(ip1.getMask()).toEqual("128.0.0.0");
        expect(ip21.getMask()).toEqual("255.255.248.0");
        expect(ip22.getMask()).toEqual("255.255.252.0");
        expect(ip24.getMask()).toEqual("255.255.255.0");
        expect(ip28.getMask()).toEqual("255.255.255.240");
        expect(ip30.getMask()).toEqual("255.255.255.252");
        expect(ip31.getMask()).toEqual("255.255.255.254");
        expect(ip32.getMask()).toEqual("255.255.255.255");
    });

    it("Number of Hosts Available", () => {
        expect(ip1.getNbHostsAvailable()).toEqual(2147483646);
        expect(ip21.getNbHostsAvailable()).toEqual(2046);
        expect(ip22.getNbHostsAvailable()).toEqual(1022);
        expect(ip24.getNbHostsAvailable()).toEqual(254);
        expect(ip28.getNbHostsAvailable()).toEqual(14);
        expect(ip30.getNbHostsAvailable()).toEqual(2);
        expect(ip31.getNbHostsAvailable()).toEqual(0);
        expect(ip32.getNbHostsAvailable()).toEqual(0);
    });

    it("First Host Available", () => {
        expect(ip1.getFirstHostAvailable()).toEqual("128.0.0.1");
        expect(ip21.getFirstHostAvailable()).toEqual("192.168.0.1");
        expect(ip22.getFirstHostAvailable()).toEqual("192.168.0.1");
        expect(ip24.getFirstHostAvailable()).toEqual("192.168.1.1");
        expect(ip28.getFirstHostAvailable()).toEqual("192.168.1.1");
        expect(ip30.getFirstHostAvailable()).toEqual("192.168.1.1");
        expect(ip31.getFirstHostAvailable()).toEqual("192.168.1.1");
        expect(ip32.getFirstHostAvailable()).toEqual("192.168.1.0");
    });

    it("Last Host Available", () => {
        expect(ip1.getLastHostAvailable()).toEqual("255.255.255.254");
        expect(ip21.getLastHostAvailable()).toEqual("192.168.7.254");
        expect(ip22.getLastHostAvailable()).toEqual("192.168.3.254");
        expect(ip24.getLastHostAvailable()).toEqual("192.168.1.254");
        expect(ip28.getLastHostAvailable()).toEqual("192.168.1.14");
        expect(ip30.getLastHostAvailable()).toEqual("192.168.1.2");
        expect(ip31.getLastHostAvailable()).toEqual("192.168.1.0");
        expect(ip32.getLastHostAvailable()).toEqual("192.168.1.0");
    });

    it("Broadcast", () => {
        expect(ip1.getBroadcast()).toEqual("255.255.255.255");
        expect(ip21.getBroadcast()).toEqual("192.168.7.255");
        expect(ip22.getBroadcast()).toEqual("192.168.3.255");
        expect(ip24.getBroadcast()).toEqual("192.168.1.255");
        expect(ip28.getBroadcast()).toEqual("192.168.1.15");
        expect(ip30.getBroadcast()).toEqual("192.168.1.3");
        expect(ip31.getBroadcast()).toEqual("192.168.1.1");
        expect(ip32.getBroadcast()).toEqual("192.168.1.0");
    });

    it("Network", () => {
        expect(ip1.getNetwork()).toEqual("128.0.0.0");
        expect(ip21.getNetwork()).toEqual("192.168.0.0");
        expect(ip22.getNetwork()).toEqual("192.168.0.0");
        expect(ip24.getNetwork()).toEqual("192.168.1.0");
        expect(ip28.getNetwork()).toEqual("192.168.1.0");
        expect(ip30.getNetwork()).toEqual("192.168.1.0");
        expect(ip31.getNetwork()).toEqual("192.168.1.0");
        expect(ip32.getNetwork()).toEqual("192.168.1.0");
    });
});
