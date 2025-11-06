<script lang="ts">
  import {get} from 'svelte/store'
  import Layout from '../../components/Layout/Layout.svelte'
  import {useSessionStorage} from '../../lib/hooks.ts'

  const sessionStorage = useSessionStorage('codec', 'test')
  $effect(() => sessionStorage.set(text))

  //
  let text = $state(get(sessionStorage))
  let hex = $state('')
  let base64 = $state('')
  let base64Url = $state('')

   // Состояния ошибок
  let hexError = $state(false)
  let base64Error = $state(false)
  let base64UrlError = $state(false)

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  // Обновляем hex, base64, base64Url при изменении text
  $effect(() => {
    hex = encoder.encode(text).toHex()
    base64 = encoder.encode(text).toBase64()
    base64Url = encoder.encode(text).toBase64({ alphabet: 'base64url' })

    // Сбрасываем ошибки при изменении text
    hexError = false
    base64Error = false
    base64UrlError = false
  })

  // Валидация hex
  function isValidHex(str: string): boolean {
    return /^[0-9a-fA-F]*$/.test(str) && str.length % 2 === 0
  }

  // Валидация base64/base64Url
  function isValidBase64(str: string, alphabet: 'base64' | 'base64url' = 'base64'): boolean {
    if (alphabet === 'base64') {
      return /^[A-Za-z0-9+/]*={0,2}$/.test(str)
    } else {
      return /^[A-Za-z0-9_-]*={0,2}$/.test(str)
    }
  }

  // Обновляем text при изменении hex (только если hex валиден)
  $effect(() => {
    if (isValidHex(hex)) {
      try {
        text = decoder.decode(Uint8Array.fromHex(hex))
        hexError = false
      } catch {
        hexError = true
      }
    } else {
      hexError = true
    }
  })

  // Обновляем text при изменении base64 (только если base64 валиден)
  $effect(() => {
    if (isValidBase64(base64, 'base64')) {
      try {
        text = decoder.decode(Uint8Array.fromBase64(base64))
        base64Error = false
      } catch {
        base64Error = true
      }
    } else {
      base64Error = true
    }
  })

  // Обновляем text при изменении base64Url (только если base64Url валиден)
  $effect(() => {
    if (isValidBase64(base64Url, 'base64url')) {
      try {
        text = decoder.decode(Uint8Array.fromBase64(base64Url, { alphabet: 'base64url' }))
        base64UrlError = false
      } catch {
        base64UrlError = true
      }
    } else {
      base64UrlError = true
    }
  })
</script>

<Layout>
  <main class="grid m-4">
    <input class="input w-full input-primary" type="text" bind:value={text} />
    <input
      class="input w-full {hexError ? 'input-error' : 'input-primary'}"
      type="text"
      bind:value={hex}
    />
    <input
      class="input w-full {base64Error ? 'input-error' : 'input-primary'}"
      type="text"
      bind:value={base64}
    />
    <input
      class="input w-full {base64UrlError ? 'input-error' : 'input-primary'}"
      type="text"
      bind:value={base64Url}
    />
  </main>
</Layout>