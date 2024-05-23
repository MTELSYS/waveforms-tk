<script lang="ts">
	import {
		Dropzone,
		RadioButton,
		ButtonGroup,
		Card,
		Label,
		Input,
		NumberInput,
		Checkbox,
		Helper,
		CloseButton,
	} from 'flowbite-svelte';
	import { FileChartBarOutline, CloseOutline, ChartOutline, ChartMixedOutline, CodeForkOutline, InfoCircleOutline } from 'flowbite-svelte-icons';

	let selectedPlotType: string = 'scope';

	let numberOfChannels: number = 1;
	let channelsToShow: number = 0;

	let value: any = [];
	const dropHandle = (event) => {
		value = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			const file = [...event.dataTransfer.items]
				.filter((item, i) => item.kind === 'file' && item.type === 'text/csv')
				.map((file) => file.getAsFile())[0];
			if (!file) {
				return;
			}
			value.push(file);
			value = value;
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				value = file.name;
			});
		}
	};

	const handleChange = (event) => {
		const files = event.target.files;
		if (files.length > 0 && files[0].type === 'text/csv') {
			value.push(files[0]);
			value = value;
		}
	};

	const handleRemove = (filename: any) => {
		return () => {
			value = value.filter((f: any) => f.name !== filename);
		};
	};
</script>

<section id="banner">
	<h1>Waveforms Toolkit</h1>
	<p class="font-subtle">
		A tool made for easily plotting your Analog Discovery 2 data during lab sessions in ESDA
	</p>
</section>

<section id="uploader">
	<h2>Upload your data</h2>
	<p class="font-subtle">File should be CSV</p>

	{#if value.length === 0}
		<Dropzone
			id="dropzone"
			on:drop={dropHandle}
			on:dragover={(event) => {
				event.preventDefault();
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
				<div class="card flex flex-cols justify-between">
					<div class="fileinfo">
						<h2>{file.name}</h2>
						<p>
							{file.size.toLocaleString('en-US', {
								notation: 'compact',
								compactDisplay: 'short'
							})}B • {file.type}
						</p>
					</div>
					<CloseButton on:click={handleRemove(file.name)} />
				</div>
			</Card>
		{/each}
	{/if}
</section>

<section  class="plot-type-selector flex flex-col align-center">
		<h2>Plot type</h2>

		<ButtonGroup>
				<RadioButton value={0} bind:group={selectedPlotType}><ChartOutline class="w-4 h-4 me-2" />Scope</RadioButton>
				<RadioButton value={1} bind:group={selectedPlotType}><ChartMixedOutline class="w-4 h-4 me-2" />Spectrum</RadioButton>
				<RadioButton value={2} bind:group={selectedPlotType}><CodeForkOutline class="w-4 h-4 me-2" />Network</RadioButton>
		</ButtonGroup>
</section>

<section class="settings flex flex-col align-center">
		<h2>Settings</h2>
		<div>
			<!-- select amount of channels in data: 1 or 2 -->
			<label for="settings__general__channels">Number of channels</label>
			<ButtonGroup id="settings__general__channels">
				<RadioButton value={1} bind:group={numberOfChannels}>1</RadioButton>
				<RadioButton value={2} bind:group={numberOfChannels}>2</RadioButton>
			</ButtonGroup>
		</div>

		{#if numberOfChannels === 2}
		<div>
			<!-- select channels to plot: Both, 1 or 2 -->
			<label for="settings__general__channels-shown">Plot channels</label>
			<ButtonGroup id="settings__general__channels-shown">
				<RadioButton value={0} bind:group={channelsToShow}>Both</RadioButton>
				<RadioButton value={1} bind:group={channelsToShow}>1</RadioButton>
				<RadioButton value={2} bind:group={channelsToShow}>2</RadioButton>
			</ButtonGroup>
		</div>
		{/if}

		<!-- dropdown for advanced settings -->
		<details>
			<summary>Advanced settings</summary>
		</details>
		<section class="settings__category">
			<h3 aria-describedby="helper-axis-limits">Axis Limits</h3>
			<Helper id="helper-axis-limits">Limit the channel axis' to an interval</Helper>

			<div class="settings__row">
				<Label for="ax-x-lim" class="mb-2">Limit x-axis</Label>
				<NumberInput id="x-lim" placeholder="min" /> -
				<NumberInput id="x-lim" placeholder="max" />
			</div>
			<div class="settings__row">
				<Label for="ax-y-lim" class="mb-2">Limit y-axis</Label>
				<NumberInput id="y-lim" placeholder="min" /> -
				<NumberInput id="y-lim" placeholder="max" />
			</div>
		</section>

		<section class="settings__category">
			<h3 aria-describedby="helper-axis-labels">Labels</h3>
			<Helper id="helper-axis-labels">Set the channels' axis labels</Helper>

			<div id="ch1-labels">
				<h4>Channel 1</h4>

				<div class="settings__row">
					<Label for="x-label" class="mb-2 block">X-axis Label</Label>
					<Input id="x-label" name="x-label" required placeholder="Time [s]" />
				</div>
				<div class="settings__row">
					<Label for="y-label" class="mb-2 block">Y-axis Label</Label>
					<Input id="y-label" name="y-label" required placeholder="Amplitude [V]" />
				</div>
			</div>
			
			{#if numberOfChannels === 2 && channelsToShow !== 1}
			<div id="ch2-labels">
				<h4>Channel 2</h4>
				
				<div class="settings__row">
					<Label for="x-label" class="mb-2 block">X-axis Label</Label>
					<Input id="x-label" name="x-label" required placeholder="Time [s]" />
				</div>
				<div class="settings__row">
					<Label for="y-label" class="mb-2 block">Y-axis Label</Label>
					<Input id="y-label" name="y-label" required placeholder="Amplitude [V]" />
				</div>
			</div>
			{/if}
		</section>

		<section class="settings__category">
			<h3 aria-describedby="helper-legends">Legends</h3>
			<Helper id="helper-legends">Set potential channel legends</Helper>

			<div class="settings__row">
				<Label for="ch1-legend" class="mb-2 block">Channel 1</Label>
				<Input id="ch1-legend" name="ch1-legend" placeholder="Signal 1" />
			</div>
			{#if numberOfChannels === 2}
				<div class="settings__row">
					<Label for="ch2-legend" class="mb-2 block">Channel 2</Label>
					<Input id="ch2-legend" name="ch2-legend" placeholder="Signal 2" />
				</div>
			{/if}
		</section>
		
		<section class="settings__category">
			<h3 aria-describedby="helper-presentations">Presentations</h3>
			<Helper id="helper-presentations">Set optional presentation settings</Helper>

			<Checkbox aria-describedby="helper-checkbox-legends">Show legends</Checkbox>
			<Helper id="helper-checkbox-legends" class="ps-6">Display legends in figure</Helper>
			<Checkbox aria-describedby="helper-checkbox-subfigures">Use subfigures</Checkbox>
			<Helper id="helper-checkbox-subfigures" class="ps-6">Split channels and/or phase plot into subfigures</Helper>
		</section>
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

	.plot-type-selector {
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.fileinfo {
		text-align: left;
	}

	.settings {
		width: 100%;
		gap: 1rem;
		display: flex;

		&__row {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.align {
		&-center {
			align-items: center;
		}
	}
</style>
