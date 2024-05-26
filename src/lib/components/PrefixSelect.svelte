<script lang="ts">
  import { Select } from 'flowbite-svelte';
  
  export let value = 1;
  export let unit = 'V'
  
  let prefixes = [
    { value: 10 ** 9, name: 'G' },
    { value: 10 ** 6, name: 'M' },
    { value: 10 ** 3, name: 'k' },
    { value: 1, name: '' },
    { value: 10 ** -3, name: 'm' },
    { value: 10 ** -6, name: 'μ' },
    { value: 10 ** -9, name: 'n' },
    { value: 10 ** -12, name: 'p' },
  ];

  $: prefixes = prefixes.map((prefix) => {
    return {
      ...prefix,
      name: `${prefix.value !== 1 ? prefix.name : ''}${unit}`
    };
  });
</script>

<Select class="here" size="sm" items={prefixes} bind:value={value} />