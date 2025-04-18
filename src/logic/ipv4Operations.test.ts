import { IPv4 } from "./ipv4Operations";

describe("IPv4 class features test", () => {
    const ip1 = new IPv4("192.168.1.1/1");
    const ip21 = new IPv4("192.168.1.1/21");
    const ip22 = new IPv4("192.168.1.1/22");
    const ip24 = new IPv4("192.168.1.1/24");
    const ip28 = new IPv4("192.168.1.1/28");
    const ip30 = new IPv4("192.168.1.1/30");
    const ip31 = new IPv4("192.168.1.1/31");
    const ip32 = new IPv4("192.168.1.1/32");

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

    it("First IP Available", () => {
        expect(ip1.getFirstIpAvailable()).toEqual("128.0.0.1");
        expect(ip21.getFirstIpAvailable()).toEqual("192.168.0.1");
        expect(ip22.getFirstIpAvailable()).toEqual("192.168.0.1");
        expect(ip24.getFirstIpAvailable()).toEqual("192.168.1.1");
        expect(ip28.getFirstIpAvailable()).toEqual("192.168.1.1");
        expect(ip30.getFirstIpAvailable()).toEqual("192.168.1.1");
        expect(ip31.getFirstIpAvailable()).toEqual("192.168.1.1");
        expect(ip32.getFirstIpAvailable()).toEqual("192.168.1.1");
    });

    it("Last IP Available", () => {
        expect(ip1.getLastIpAvailable()).toEqual("255.255.255.254");
        expect(ip21.getLastIpAvailable()).toEqual("192.168.7.254");
        expect(ip22.getLastIpAvailable()).toEqual("192.168.3.254");
        expect(ip24.getLastIpAvailable()).toEqual("192.168.1.254");
        expect(ip28.getLastIpAvailable()).toEqual("192.168.1.14");
        expect(ip30.getLastIpAvailable()).toEqual("192.168.1.2");
        expect(ip31.getLastIpAvailable()).toEqual("192.168.1.0");
        expect(ip32.getLastIpAvailable()).toEqual("192.168.1.1");
    });

    it("Broadcast", () => {
        expect(ip1.getBroadcast()).toEqual("255.255.255.255");
        expect(ip21.getBroadcast()).toEqual("192.168.7.255");
        expect(ip22.getBroadcast()).toEqual("192.168.3.255");
        expect(ip24.getBroadcast()).toEqual("192.168.1.255");
        expect(ip28.getBroadcast()).toEqual("192.168.1.15");
        expect(ip30.getBroadcast()).toEqual("192.168.1.3");
        expect(ip31.getBroadcast()).toEqual("192.168.1.1");
        expect(ip32.getBroadcast()).toEqual("192.168.1.1");
    });

    it("Network", () => {
        expect(ip1.getNetwork()).toEqual("128.0.0.0");
        expect(ip21.getNetwork()).toEqual("192.168.0.0");
        expect(ip22.getNetwork()).toEqual("192.168.0.0");
        expect(ip24.getNetwork()).toEqual("192.168.1.0");
        expect(ip28.getNetwork()).toEqual("192.168.1.0");
        expect(ip30.getNetwork()).toEqual("192.168.1.0");
        expect(ip31.getNetwork()).toEqual("192.168.1.0");
        expect(ip32.getNetwork()).toEqual("192.168.1.1");
    });
});
