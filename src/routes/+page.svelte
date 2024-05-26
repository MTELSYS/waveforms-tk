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
	import { FileChartBarOutline, ChartOutline, ChartMixedOutline, CodeForkOutline } from 'flowbite-svelte-icons';

	import PrefixSelect from '$lib/components/PrefixSelect.svelte';

	let selectedPlotType: string = 'scope';

	let numberOfChannels: number = 1;
	let channelsToShow: number = 0;

	let xLimPrefixLowerBound = 1
	let xLimPrefixUpperBound = 1

	let yLimPrefixLowerBound = 1
	let yLimPrefixUpperBound = 1

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

<section id="banner" class="flex flex-col text-center justify-center">
	<h1 class="font-bold">Waveforms Toolkit</h1>
	<p class="font-subtle">
		A tool made for easily plotting your Analog Discovery 2 data during lab sessions in ESDA
	</p>
</section>

<section id="uploader">
	<h2 class="font-semibold">Upload your data</h2>
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
				<div class="card flex flex-cols justify-between w-full">
					<div class="text-left w-full">
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

<section  class="plot-type-selector flex flex-col items-center mb-6">
		<h2 class="font-semibold mb-4">Plot type</h2>

		<ButtonGroup id="plot-selector">
			<RadioButton value={0} bind:group={selectedPlotType}><ChartOutline class="w-7 h-7 me-2" />Scope</RadioButton>
			<RadioButton value={1} bind:group={selectedPlotType}><ChartMixedOutline class="w-7 h-7 me-2" />Spectrum</RadioButton>
			<RadioButton value={2} bind:group={selectedPlotType}><CodeForkOutline class="w-7 h-7 me-2" />Network</RadioButton>
		</ButtonGroup>
</section>

<section class="flex flex-col items-center gap-6 md:w-auto w-full">
		<h2 class="font-semibold">Settings</h2>
		
		<div class="flex flex-cols items-center justify-between w-full">
			<!-- select amount of channels in data: 1 or 2 -->
			<label for="settings__general__channels">Number of channels</label>
			<ButtonGroup id="settings__general__channels">
				<RadioButton value={1} bind:group={numberOfChannels}>1</RadioButton>
				<RadioButton value={2} bind:group={numberOfChannels}>2</RadioButton>
			</ButtonGroup>
		</div>

		<div class="flex flex-cols items-center justify-between w-full">
			<!-- select channels to plot: Both, 1 or 2 -->
			<label for="settings__general__channels-shown">Plot channels</label>
			<ButtonGroup id="settings__general__channels-shown">
				<RadioButton value={0} bind:group={channelsToShow}>Both</RadioButton>
				<RadioButton value={1} bind:group={channelsToShow}>1</RadioButton>
				<RadioButton value={2} bind:group={channelsToShow}>2</RadioButton>
			</ButtonGroup>
		</div>

		<!-- dropdown for advanced settings -->
		<details id="advanced-settings">
			<summary class="text-center my-6 font-semibold">Advanced settings</summary>

			<article>
				<section class="w-full">
					<h3 aria-describedby="helper-axis-limits" class="font-semibold">Axis Limits</h3>
					<Helper id="helper-axis-limits">Limit the channel axis' to an interval</Helper>
					<hr class="solid mb-4">
	
					<div class="flex flex-rows gap-2 mb-2 items-center">
						<Label for="ax-x-lim" class="w-full">Limit x-axis</Label>
						<NumberInput id="x-lim" placeholder="min" /><PrefixSelect bind:value={xLimPrefixLowerBound} unit="s" /> -
						<NumberInput id="x-lim" placeholder="max" /><PrefixSelect bind:value={xLimPrefixUpperBound} unit="s"/>
					</div>
					<div class="flex flex-rows gap-2 items-center">
						<Label for="ax-y-lim" class="w-full">Limit y-axis</Label>
						<NumberInput id="y-lim" placeholder="min" /><PrefixSelect bind:value={yLimPrefixLowerBound} /> -
						<NumberInput id="y-lim" placeholder="max" /><PrefixSelect bind:value={yLimPrefixUpperBound} />
					</div>
				</section>
	
				<section class="w-full mt-6">
					<h3 aria-describedby="helper-axis-labels" class="font-semibold">Labels</h3>
					<Helper id="helper-axis-labels">Set the channels' axis labels</Helper>
					<hr class="solid mb-4">
	
					<div>
						<h4 class="font-semibold">Channel 1</h4>
	
						<div class="flex flex-rows justify-between items-center mb-2 gap-2">
							<Label for="ch1-x-label" class="w-full">X-axis Label</Label>
							<Input id="ch1-x-label" name="ch1-x-label" required placeholder="Time [s]" />
						</div>
						<div class="flex flex-rows justify-between items-center gap-2">
							<Label for="ch1-y-label" class="w-full">Y-axis Label</Label>
							<Input id="ch1-y-label" name="ch1-y-label" required placeholder="Amplitude [V]" />
						</div>
					</div>
					
					{#if numberOfChannels === 2 && channelsToShow !== 1}
					<div class="mt-2">
						<h4 class="font-semibold">Channel 2</h4>
	
						<div class="flex flex-rows justify-between items-center mb-2 gap-2">
							<Label for="ch2-x-label" class="w-full">X-axis Label</Label>
							<Input id="ch2-x-label" name="ch2-x-label" required placeholder="Time [s]" />
						</div>
						<div class="flex flex-rows justify-between items-center gap-2">
							<Label for="ch2-y-label" class="w-full">Y-axis Label</Label>
							<Input id="ch2-y-label" name="ch2-y-label" required placeholder="Amplitude [V]" />
						</div>
					</div>
					{/if}
				</section>
	
				<section class="w-full mt-6">
					<h3 aria-describedby="helper-legends" class="font-semibold">Legends</h3>
					<Helper id="helper-legends">Set channel legends</Helper>
					<hr class="solid mb-4">
	
					<div class="flex flex-rows justify-between items-center mb-2">
						<Label for="ch1-legend" class="w-full">Channel 1</Label>
						<Input id="ch1-legend" name="ch1-legend" placeholder="Signal 1" />
					</div>
					{#if numberOfChannels === 2}
						<div class="flex flex-rows justify-between items-center">
							<Label for="ch2-legend" class="w-full">Channel 2</Label>
							<Input id="ch2-legend" name="ch2-legend" placeholder="Signal 2" />
						</div>
					{/if}
				</section>
				
				<section class="w-full mt-6 gap-2">
					<h3 aria-describedby="helper-presentations" class="font-semibold">Presentations</h3>
					<Helper id="helper-presentations">Set optional presentation settings</Helper>
					<hr class="solid mb-4">
	
					<Checkbox aria-describedby="helper-checkbox-legends">Show legends</Checkbox>
					<Helper id="helper-checkbox-legends" class="ps-6 mb-2">Display legends in figure</Helper>
					
					<Checkbox aria-describedby="helper-checkbox-subfigures">Use subfigures</Checkbox>
					<Helper id="helper-checkbox-subfigures" class="ps-6">Split channels and/or phase plot into subfigures</Helper>
				</section>
			</article>
	</details>
</section>

<style lang="scss">
	#banner {
		height: 25vh;
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
	
	#advanced-settings {
		min-width: clamp(300px, 50vw, 900px);
	}

	hr.solid {
		border-top: 1px solid $grey-lighten-2;
	}
</style>
