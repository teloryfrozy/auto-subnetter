<script lang="ts">
    import { onMount } from "svelte";
    import { IPv4, Subnetting, type Subnet } from "../logic/ipv4Operations";

    let ipInput = "192.168.1.0/24";
    let nbSubnets = 3;
    let subnets: Subnet[] = [];
    let subnetsResults: Subnet[] = [];
    let errorMsg = "";
    let ip: IPv4 | null = null;
    // let vlsm = true;
    let vlsm = false;

    function calculate() {
        errorMsg = "";
        try {
            ip = new IPv4(ipInput);
        } catch (error) {
            errorMsg = error as string;
            ip = null;
            return;
        }
        if (subnets.length === 0) {
            errorMsg = "Please add subnets";
            return;
        }
        if (subnets.some((subnet) => subnet.hostsNeeded <= 0)) {
            errorMsg = "Invalid number of hosts of a subnet";
            return;
        }

        try {
            const subnetting = new Subnetting(new IPv4(ipInput), subnets);
            if (vlsm) {
                // VLSM calculation logic
            } else {
                subnetsResults = subnetting.getFLSMSubnets();
            }
        } catch (error) {
            errorMsg = error as string;
            return;
        }
    }

    function addSubnets() {
        errorMsg = "";
        if (nbSubnets > 0) {
            if (subnets.length < nbSubnets) {
                // add missing subnets
                for (let i = subnets.length; i < nbSubnets; i++) {
                    subnets = [
                        ...subnets,
                        {
                            name: `Subnet ${i + 1}`,
                            hostsNeeded: 0,
                            hostsAvailable: 0,
                            unusedHosts: 0,
                            network: "",
                            broadcast: "",
                            firstHost: "",
                            lastHost: "",
                            slashMask: -1,
                            mask: "",
                        },
                    ];
                }
            } else {
                // remove extra subnets
                subnets = subnets.slice(0, nbSubnets);
            }
        } else {
            errorMsg = "Invalid number of subnets";
        }
    }

    onMount(() => {
        addSubnets();
    });
</script>

<a href="/ipv4-calculator">ipv4 calculator</a>

<h1 class="text-center">{vlsm ? "VLSM" : "FLSM"} Subnetting</h1>

<div class="container" style="width: 30%;">
    <div class="form-check form-switch d-flex justify-content-center">
        <input
            class="form-check-input me-2"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={vlsm}
            onchange={() => (vlsm = !vlsm)}
        />
        <label class="form-check-label" for="flexSwitchCheckChecked">{vlsm ? "VLSM" : "FLSM"}</label>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4">
        <input id="ipInput" bind:value={ipInput} type="text" class="form-control me-2" placeholder="192.168.1.0/24" />
        <input id="nbSubnets" bind:value={nbSubnets} type="number" class="form-control me-2" placeholder="0" />
        <button onclick={addSubnets} class="btn btn-primary">Add</button>
    </div>
</div>

<button onclick={calculate} class="btn btn-primary mx-auto d-block mt-4">Calculate</button>

{#if errorMsg}
    <div class="alert alert-danger text-center mt-4">{errorMsg}</div>
{:else if subnets.length > 0}
    <div class="container d-flex justify-content-center" style="width: 30%;">
        <table class="table table-striped table-bordered mt-4">
            <thead class="table-primary">
                <tr>
                    <th>Subnet name</th>
                    <th>Number of hosts</th>
                </tr>
            </thead>
            <tbody>
                {#each subnets as subnet}
                    <tr>
                        <td><input bind:value={subnet.name} type="text" /></td>
                        <td><input bind:value={subnet.hostsNeeded} type="number" /></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}
{#if subnetsResults.length > 0}
    <div class="container d-flex justify-content-center">
        <table class="table table-striped table-bordered mt-4">
            <thead class="table-primary">
                <tr>
                    <th>Name</th>
                    <th>Hosts needed</th>
                    <th>Hosts available</th>
                    <th>Unused Hosts</th>
                    <th>Network</th>
                    <th>Broadcast</th>
                    <th>Host range</th>
                    <th>Slash mask</th>
                    <th>Mask</th>
                </tr>
            </thead>
            <tbody>
                {#each subnetsResults as subnet}
                    <tr>
                        <td>{subnet.name}</td>
                        <td>{subnet.hostsNeeded}</td>
                        <td>{subnet.hostsAvailable}</td>
                        <td>{subnet.unusedHosts}</td>
                        <td>{subnet.network}</td>
                        <td>{subnet.broadcast}</td>
                        <td>{subnet.firstHost}-{subnet.lastHost}</td>
                        <td>{subnet.slashMask}</td>
                        <td>{subnet.mask}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}
