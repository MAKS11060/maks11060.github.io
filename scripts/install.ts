#!/usr/bin/env -S deno run -A

import {parse} from 'jsr:@std/jsonc/parse'
import {existsSync} from 'jsr:@std/fs'

interface PackageJson {
  type?: 'commonjs' | 'module'
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const savePackageJson = (packageJson: PackageJson) => {
  Deno.writeTextFileSync('./package.json', JSON.stringify(packageJson, null, 2))
}

const readDenoJson = () => {
  return parse(Deno.readTextFileSync('./deno.jsonc')) as {
    imports?: Record<string, string>
  }
}

// create .npmrc
if (!existsSync('./.npmrc')) {
  const data = '@jsr:registry=https://npm.jsr.io'
  Deno.writeTextFileSync('.npmrc', data)
}

// extract jsr import to package.json
const jsrDeps = Object.entries(readDenoJson().imports!)
  .filter(([, target]) => target.startsWith('jsr:'))
  .map(([dep, target]) => {
    const pkg = target
      .slice('jsr:@'.length)
      .split('/')

    return [dep, 'npm:@jsr/' + pkg.join('__')]
  })

savePackageJson({
  type: 'module',
  dependencies: {
    ...Object.fromEntries(jsrDeps),
  },
})

// install
// const proc = new Deno.Command('pnpm', {
const proc = new Deno.Command(Deno.execPath(), {
  args: ['install'],
}).outputSync()

console.log(new TextDecoder().decode(proc.stdout))
console.error(new TextDecoder().decode(proc.stderr))
