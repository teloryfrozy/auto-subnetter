import { IPv4 } from "./IPv4";
import { Subnetting } from "./Subnetting";

describe("Subnetting class features test", () => {
    const subnet1 = new Subnetting(new IPv4("172.16.0.0/22"), [
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

    const subnet2 = new Subnetting(new IPv4("192.168.64.0/21"), [
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

    it("Error Subnetting", () => {
        const subnetting1 = new Subnetting(new IPv4("172.16.0.0/28"), [
            {
                name: "Subnet 1",
                hostsNeeded: 500,
            },
        ]);
        const subnetting2 = new Subnetting(new IPv4("10.0.0.0/30"), [
            { name: "Subnet 1", hostsNeeded: 2 },
            { name: "Subnet 2", hostsNeeded: 2 },
            { name: "Subnet 3", hostsNeeded: 2 },
            { name: "Subnet 4", hostsNeeded: 2 },
        ]);

        expect(() => {
            subnetting1.getFLSMSubnets();
        }).toThrow("Subnetting is not possible, mask is too small");

        expect(() => {
            subnetting2.getVLSMSubnets();
        }).toThrow("Subnetting is not possible, mask is too small");

        expect(() => {
            subnetting1.getVLSMSubnets();
        }).toThrow("Subnetting is not possible, mask is too small");

        expect(() => {
            subnetting2.getVLSMSubnets();
        }).toThrow("Subnetting is not possible, mask is too small");
    });

    it("VLSM for 172.16.0.0/22", () => {
        const subnets = subnet1.getVLSMSubnets();
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

    it("FLSM for 172.16.0.0/22", () => {
        const subnets = subnet1.getFLSMSubnets();
        expect(subnets.length).toEqual(7);

        const expectedSubnets = [
            {
                name: "Subnet 1",
                hostsNeeded: 58,
                hostsAvailable: 126,
                unusedHosts: 68,
                network: "172.16.0.0",
                broadcast: "172.16.0.127",
                firstHost: "172.16.0.1",
                lastHost: "172.16.0.126",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 2",
                hostsNeeded: 26,
                hostsAvailable: 126,
                unusedHosts: 100,
                network: "172.16.0.128",
                broadcast: "172.16.0.255",
                firstHost: "172.16.0.129",
                lastHost: "172.16.0.254",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 3",
                hostsNeeded: 10,
                hostsAvailable: 126,
                unusedHosts: 116,
                network: "172.16.1.0",
                broadcast: "172.16.1.127",
                firstHost: "172.16.1.1",
                lastHost: "172.16.1.126",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 4",
                hostsNeeded: 10,
                hostsAvailable: 126,
                unusedHosts: 116,
                network: "172.16.1.128",
                broadcast: "172.16.1.255",
                firstHost: "172.16.1.129",
                lastHost: "172.16.1.254",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
                hostsAvailable: 126,
                unusedHosts: 124,
                network: "172.16.2.0",
                broadcast: "172.16.2.127",
                firstHost: "172.16.2.1",
                lastHost: "172.16.2.126",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
                hostsAvailable: 126,
                unusedHosts: 124,
                network: "172.16.2.128",
                broadcast: "172.16.2.255",
                firstHost: "172.16.2.129",
                lastHost: "172.16.2.254",
                slashMask: 25,
                mask: "255.255.255.128",
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
                hostsAvailable: 126,
                unusedHosts: 124,
                network: "172.16.3.0",
                broadcast: "172.16.3.127",
                firstHost: "172.16.3.1",
                lastHost: "172.16.3.126",
                slashMask: 25,
                mask: "255.255.255.128",
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

    it("FLSM for 192.168.64.0/21", () => {
        const subnets = subnet2.getFLSMSubnets();
        expect(subnets.length).toEqual(7);

        const expectedSubnets = [
            {
                name: "Subnet 1",
                hostsNeeded: 120,
                hostsAvailable: 254,
                unusedHosts: 134,
                network: "192.168.64.0",
                broadcast: "192.168.64.255",
                firstHost: "192.168.64.1",
                lastHost: "192.168.64.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 2",
                hostsNeeded: 60,
                hostsAvailable: 254,
                unusedHosts: 194,
                network: "192.168.65.0",
                broadcast: "192.168.65.255",
                firstHost: "192.168.65.1",
                lastHost: "192.168.65.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 3",
                hostsNeeded: 30,
                hostsAvailable: 254,
                unusedHosts: 224,
                network: "192.168.66.0",
                broadcast: "192.168.66.255",
                firstHost: "192.168.66.1",
                lastHost: "192.168.66.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 4",
                hostsNeeded: 15,
                hostsAvailable: 254,
                unusedHosts: 239,
                network: "192.168.67.0",
                broadcast: "192.168.67.255",
                firstHost: "192.168.67.1",
                lastHost: "192.168.67.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 5",
                hostsNeeded: 2,
                hostsAvailable: 254,
                unusedHosts: 252,
                network: "192.168.68.0",
                broadcast: "192.168.68.255",
                firstHost: "192.168.68.1",
                lastHost: "192.168.68.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 6",
                hostsNeeded: 2,
                hostsAvailable: 254,
                unusedHosts: 252,
                network: "192.168.69.0",
                broadcast: "192.168.69.255",
                firstHost: "192.168.69.1",
                lastHost: "192.168.69.254",
                slashMask: 24,
                mask: "255.255.255.0",
            },
            {
                name: "Subnet 7",
                hostsNeeded: 2,
                hostsAvailable: 254,
                unusedHosts: 252,
                network: "192.168.70.0",
                broadcast: "192.168.70.255",
                firstHost: "192.168.70.1",
                lastHost: "192.168.70.254",
                slashMask: 24,
                mask: "255.255.255.0",
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
        const subnets = subnet2.getVLSMSubnets();
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
});
