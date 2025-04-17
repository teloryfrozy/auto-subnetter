import { IPv4 } from "./ipv4Operations";

describe('IPv4 class features test', () => {
    const ip = new IPv4("192.168.1.1/24")
    it('Broadcast tests', () => {
      expect(new IPv4("192.168.1.1/24").getBroadcast()).toEqual('192.168.1.255');
      expect(new IPv4("192.168.1.1/30").getBroadcast()).toEqual('192.168.1.3');
	  expect(new IPv4("192.168.1.1/21").getBroadcast()).toEqual('192.168.7.255');	  
    });
});