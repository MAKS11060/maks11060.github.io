<script lang="ts">
  import {exportKey, generateKeyPair} from '@maks11060/crypto'

  interface Props {}

  let {}: Props = $props()

  generateKeyPair('Ed25519').then(async k => {
    console.log(await exportKey('hex', k.privateKey))
  })

</script>

123
