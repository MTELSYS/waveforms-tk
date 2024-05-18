<script lang="ts">
  import { FileDropzone, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  
  let files: FileList;

  let plotType: number = 0;
  let numberOfChannels: number = 1;
  let channelsToShow: number = 0;
</script>

<section id="banner">
  <h1>Waveforms Toolkit</h1>
  <p class="font-subtle">A tool made for easily plotting your Analog Discovery 2 data during lab sessions in ESDA</p>
</section>

<section id="uploader">
  <h2>Upload your data </h2>
  <p class="font-subtle">File should be CSV</p>

  <FileDropzone name="files" bind:files={files}>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="message"><strong>Upload a file</strong> or drag and drop</svelte:fragment>
    <svelte:fragment slot="meta">Only csv allowed</svelte:fragment>
  </FileDropzone>
</section>

<section id="settings">
  <div id="settings__plot-type">
    <h2>Plot type</h2>
    
    <RadioGroup display="flex">
      <RadioItem bind:group={plotType} name="justify" value={0}>Scope</RadioItem>
      <RadioItem bind:group={plotType} name="justify" value={1}>Spectrum</RadioItem>
      <RadioItem bind:group={plotType} name="justify" value={2}>Network</RadioItem>
    </RadioGroup>

  </div>

  <div id="settings__general">
    <h2>Settings</h2>
    <div>
      <!-- select amount of channels in data: 1 or 2 -->
      <label for="settings__general__channels">Number of channels</label>
      <RadioGroup>
        <RadioItem bind:group={numberOfChannels} name="justify" value={1}>1</RadioItem>
        <RadioItem bind:group={numberOfChannels} name="justify" value={2}>2</RadioItem>
      </RadioGroup>
    </div> 

    <div>
      <!-- select channels to plot: Both, 1 or 2 -->
      <label for="settings__general__channel">Channel</label>
      <RadioGroup>
        <RadioItem bind:group={channelsToShow} name="justify" value={0}>Both</RadioItem>
        <RadioItem bind:group={channelsToShow} name="justify" value={1}>1</RadioItem>
        <RadioItem bind:group={channelsToShow} name="justify" value={2}>2</RadioItem>
      </RadioGroup>
    </div>

    <!-- dropdown for advanced settings -->
    <details>
      <summary>Advanced settings</summary>
      <div>
        <label for="settings__general__sample-rate">Sample rate</label>
        <input type="number" id="settings__general__sample-rate" />
      </div>
      <div>
        <label for="settings__general__time-scale">Time scale</label>
        <input type="number" id="settings__general__time-scale" />
      </div>
    </details>
  </div>
</section> 

<style lang="scss">
  #banner {
    padding: 1rem;
    text-align: center;
  }

  #uploader {
    color: $grey-darken-5;
    padding: 1rem;
    text-align: center;
  }

  #settings {
    color: $grey-darken-5;
    padding: 1rem;
    text-align: center;

    #settings__plot-type {
      margin-bottom: 1rem;
    }

    #settings__general {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      select, input {
        margin-top: 0.5rem;
      }
    }
  }
</style>