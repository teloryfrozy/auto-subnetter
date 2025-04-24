<script lang="ts">
    import { IPv4 } from "../../logic/IPv4";

    let ipInput = "192.168.1.0/24";
    let errorMsg = "";
    let ip: IPv4 | null = new IPv4("192.168.1.0/24");

    function calculate() {
        try {
            ip = new IPv4(ipInput);
            errorMsg = "";
        } catch (error) {
            errorMsg = error as string;
            ip = null;
        }
    }
</script>

<a href="/">auto subnetter (vlsm and flsm)</a>

<h1 class="text-center">IPv4 Calculator</h1>

<div class="d-flex justify-content-center align-items-center mt-4">
    <input
        id="ipInput"
        bind:value={ipInput}
        type="text"
        class="form-control me-2"
        style="width: auto;"
        placeholder="192.168.1.0/24"
    />
    <button on:click={calculate} class="btn btn-primary">Calculate</button>
</div>

{#if errorMsg}
    <div class="alert alert-danger text-center mt-4">{errorMsg}</div>
{/if}
{#if ip}
    <div class="container d-flex justify-content-center">
        <table class="table table-striped table-bordered mt-4">
            <thead class="table-primary">
                <tr>
                    <th>Network</th>
                    <th>Broadcast</th>
                    <th>First Host</th>
                    <th>Last Host</th>
                    <th>Hosts Available</th>
                    <th>Mask</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{ip.getNetwork()}</td>
                    <td>{ip.getBroadcast()}</td>
                    <td>{ip.getFirstHostAvailable()}</td>
                    <td>{ip.getLastHostAvailable()}</td>
                    <td>{ip.getNbHostsAvailable()}</td>
                    <td>{ip.getMask()}</td>
                </tr>
            </tbody>
        </table>
    </div>
{/if}
