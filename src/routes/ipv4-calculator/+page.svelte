<script lang="ts">
  import { IPv4 } from "../../logic/ipv4Operations";

  const test = new IPv4("192.168.1.1/19");
  console.log("getMask", test.getMask());
</script>

<h1>Welcome to SvelteKit</h1>
<a href="/">auto subnetter (vlsm and flsm)</a>
