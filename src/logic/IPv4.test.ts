import { IPv4 } from "./IPv4";

describe("IPv4 class features test", () => {
    const ip1 = new IPv4("192.168.1.0/1");
    const ip21 = new IPv4("192.168.1.0/21");
    const ip22 = new IPv4("192.168.1.0/22");
    const ip24 = new IPv4("192.168.1.0/24");
    const ip28 = new IPv4("192.168.1.0/28");
    const ip30 = new IPv4("192.168.1.0/30");
    const ip31 = new IPv4("192.168.1.0/31");
    const ip32 = new IPv4("192.168.1.0/32");

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
