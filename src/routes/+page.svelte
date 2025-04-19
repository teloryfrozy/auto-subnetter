<script lang="ts">
    import { IPv4 } from "../logic/ipv4Operations";


    type Subnet = {
        name: string;
        hostsNeeded: number;
        hostsAvailable: number;
        unusedHosts: number;
        network: string;
        broadcast: string;
        firstHost: string;
        lastHost: string;
        slashMask: string;
    }

    let ipInput = "192.168.1.1/24";
    let nbSubnets = 3;
    let subnets: Subnet[] = [];
    let errorMsg = "";
    let ip: IPv4 | null = null;
    let vlsm = true;


    function calculate( ) {
        try {
            ip = new IPv4(ipInput);
            errorMsg = "";
        } catch (error) {
            errorMsg = error as string;
            ip = null;
        }
        if (vlsm) {
            // VLSM calculation logic 
        } else {
            // FLSM calculation logic 
        }
    }

    function addSubnets() {
        if (nbSubnets > 0) {
            // Add subnets logic
        } else {
            errorMsg = "Invalid number of subnets";
        }
    }
</script>

<h1>VLSM & FLSM Subnetting</h1>
<a href="/ipv4-calculator">ipv4 calculator</a>

<div class="form-check form-switch">
    <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={vlsm}
        on:change={() => (vlsm = !vlsm)}
    />
    <label class="form-check-label" for="flexSwitchCheckChecked">{vlsm ? "VLSM": "FLSM"}</label>
</div>
 
<p>IP</p>
<input
        id="ipInput"
        bind:value={ipInput}
        type="text"
        class="form-control me-2"
        style="width: auto;"
        placeholder="192.168.1.1/24"
    />

     
<p>Subnets</p>
<input
id="nbSubnets"
bind:value={nbSubnets}
type="number"
class="form-control me-2"
style="width: auto;"
placeholder="0"
/>
<button on:click={addSubnets} class="btn btn-primary">Add</button>
    <button on:click={calculate} class="btn btn-primary">Calculate</button>

    
{#if errorMsg}
<div class="alert alert-danger text-center">{errorMsg}</div>
{/if}

    <table class="table table-striped table-bordered mt-4">
        <thead class="table-primary">
            <tr>
                <th>Name</th>
                <th>Hosts</th> 
            </tr>
        </thead> 
        <tbody>
            <tr>
                <td>1</td>
                <td>123</td> 
            </tr>
            <tr>
                <td>2</td>
                <td>59</td> 
            </tr>
            <tr>
                <td>3</td>
                <td>98</td> 
            </tr>
        </tbody>
    </table>


todo: 
total hosts available
total hosts needed
total hosts Unused
list of stuff to show for each row

Name Hosts Needed Hosts Available Unused hosts Network Broadcast Host Range Slash Mask
