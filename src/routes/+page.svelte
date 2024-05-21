<script lang="ts">
  import { Dropzone, RadioButton, ButtonGroup, Card  } from 'flowbite-svelte'
  import { FileChartBarOutline, CloseOutline  } from 'flowbite-svelte-icons'

  const plotTypes: string[] = ['Scope', 'Spectrum', 'Network']
  let selectedPlotType: string =  plotTypes[0]

  let numberOfChannels: number = 1
  let channelsToShow: number = 0


  let value: any = []
  const dropHandle = (event) => {
    value = []
    event.preventDefault()
    if (event.dataTransfer.items) {
      const file = [...event.dataTransfer.items]
        .filter((item, i) => item.kind === 'file' && item.type === 'text/csv')
        .map((file) => file.getAsFile())[0]
      if (!file) {
        return
      }
      value.push(file)
      value = value
    } else {
      [...event.dataTransfer.files].forEach((file, i) => {
        value = file.name
      })
    }
  }

  const handleChange = (event) => {
    const files = event.target.files
    if (files.length > 0 && files[0].type === 'text/csv') {
      value.push(files[0])
      value = value
    }
  }

  const handleRemove = (filename: any) => {
    return () => {
      value = value.filter((f: any) => f.name !== filename)
    }
  }
</script>

<section id="banner">
  <h1>Waveforms Toolkit</h1>
  <p class="font-subtle">A tool made for easily plotting your Analog Discovery 2 data during lab sessions in ESDA</p>
</section>

<section id="uploader">
  <h2>Upload your data </h2>
  <p class="font-subtle">File should be CSV</p>

  {#if value.length === 0}
    <Dropzone
      id="dropzone"
      on:drop={dropHandle}
      on:dragover={(event) => {
        event.preventDefault()
      }}
      on:change={handleChange}
    >
      <FileChartBarOutline size="xl" class="icon-primary" />
      <p><span class="font-semibold">Click to upload</span> or drag and drop</p>
      <p>CSV</p>
    </Dropzone>
  {:else}
    {#each value as file}
      <Card>
        <div class="card">

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={handleRemove(file.name)} id="close">
            <CloseOutline/>
          </div>

          <div class="fileinfo">
            <h2>{file.name}</h2>
            <p>
              {
                file.size.toLocaleString('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                })
              }B
                • {file.type}
            </p>
          </div>
        </div>
      </Card>
    {/each}
  {/if}
</section>

<section id="settings">
  <div id="settings__plot-type">
    <h2>Plot type</h2>
    
    <ButtonGroup>
      {#each plotTypes as type}
        <RadioButton value={type} bind:group={selectedPlotType}>{type}</RadioButton>
      {/each}
    </ButtonGroup>
  </div>

  <div id="settings__general">
    <h2>Settings</h2>
    <div>
      <!-- select amount of channels in data: 1 or 2 -->
      <label for="settings__general__channels">Number of channels</label>
      <ButtonGroup>
        <RadioButton value={1} bind:group={numberOfChannels}>1</RadioButton>
        <RadioButton value={2} bind:group={numberOfChannels}>2</RadioButton>
      </ButtonGroup>
    </div> 

    <div>
      <!-- select channels to plot: Both, 1 or 2 -->
      <label for="settings__general__channel">Channel</label>
      <ButtonGroup>
        <RadioButton value={0} bind:group={channelsToShow}>Both</RadioButton>
        <RadioButton value={1} bind:group={channelsToShow}>1</RadioButton>
        <RadioButton value={2} bind:group={channelsToShow}>2</RadioButton>
      </ButtonGroup>
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
    display: grid;
    place-items: center;
    gap: 1rem;
    width: 100%;
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

  .card {
    width: 100% !important;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    #close {
      cursor: pointer;
    }

    .fileinfo {
      text-align: left;
    }
  }
</style>