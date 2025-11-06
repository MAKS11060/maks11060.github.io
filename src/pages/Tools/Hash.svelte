<script lang="ts">
  import {crypto, DIGEST_ALGORITHM_NAMES} from '@std/crypto/crypto'
  import type {Snippet} from 'svelte'
  import {get} from 'svelte/store'
  import Layout from '../../components/Layout/Layout.svelte'
  import {useSessionStorage} from '../../lib/hooks.ts'

  const algStore = useSessionStorage<typeof DIGEST_ALGORITHM_NAMES[number]>('hash-alg', 'BLAKE3')

  let text = $state('')
  let inputFiles: FileList | undefined = $state()

  let output = $state(new Uint8Array())

  // options
  let alg = $state<typeof DIGEST_ALGORITHM_NAMES[number]>(get(algStore))
  let inputSource = $state<'text' | 'file'>('text')

  $inspect(inputSource)

  const hash = async (input: Uint8Array<ArrayBuffer>) => {
    return new Uint8Array(await crypto.subtle.digest(alg, input))
  }

  $effect(() => algStore.set(alg))
  $effect(() => {
    hash(new TextEncoder().encode(text)).then((hash) => {
      output = hash
    })
  })
</script>

<Layout>
  <main class="">
    {#snippet form(inputEl: Snippet)}
      <div class="m-4 bg-base-300 rounded-box border border-primary mb-8">
        <div class="grid grid-cols-[130px_1fr] gap-2 p-2">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Digest algorithm</legend>
            <select class="select select-primary w-full" bind:value={alg}>
              <option disabled selected>Digest algorithm</option>
              {#each DIGEST_ALGORITHM_NAMES.toSorted() as value}
                <option {value}>{value}</option>
              {/each}
            </select>
          </fieldset>

          {@render inputEl()}
        </div>

        <!-- result -->
        <div class="grid gap-1 p-2">
          <span class="font-mono text-wrap break-all select-text">
            <span class="select-none mr-2">Hex</span>{output.toHex()}
          </span>
          <span class="font-mono text-wrap break-all select-text">
            <span class="select-none mr-2">Base64url</span>{output.toBase64({alphabet: 'base64url'})}
          </span>
        </div>
      </div>
    {/snippet}

    {#snippet textInput()}
      <div class="">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Text input</legend>
          <textarea class="w-full textarea textarea-primary h-10 min-h-10" bind:value={text}></textarea>
        </fieldset>
      </div>
    {/snippet}

    {#snippet fileInput()}
      <fieldset class="fieldset">
        <legend class="fieldset-legend">File</legend>
        <input class="file-input file-input-primary w-full" type="file" bind:files={inputFiles}>
      </fieldset>
    {/snippet}

    {@render form(textInput)}
    {@render form(fileInput)}
  </main>
</Layout>
