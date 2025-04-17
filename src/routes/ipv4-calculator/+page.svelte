<script lang="ts">
  import { decimalToBinary } from "../../utils";

  class IPv4 {
    ip: string[];
    slash: number;
    nbBitsHostPart: number;

    /* todo: 
      validate only 2 parts
      validate only 4 parts and they are all int btw 0 and 254
      validate slash is an int btw 0 and 32


      features:
display network, broadcast, first, last, nb ip av, subnet

      get_number_ip_available |    first ip av + last
      get_broadcast
      get_network
      get_subnet_mask

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

    getNbHostsAvailable(): number {
      return 2 * this.nbBitsHostPart - 2;
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
  }

  const test = new IPv4("192.168.1.2/21");
  console.log("ip", test, "split", test.slash, test.getBroadcast());
</script>

<h1>Welcome to SvelteKit</h1>
<a href="/">auto subnetter (vlsm and flsm)</a>
