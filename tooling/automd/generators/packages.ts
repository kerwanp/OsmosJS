import { defineGenerator } from 'automd'
import { readPackageJSON } from 'pkg-types'
import fs from 'node:fs/promises'
import { md as mdbox } from 'mdbox'

export default defineGenerator({
  name: 'packages',
  async generate() {
    const dirs = await fs.readdir('./packages')

    const columns = ['Package', 'Version', 'Description', '', '']
    const rows: string[][] = []

    for (const dir of dirs) {
      const packageJson = await readPackageJSON(`./packages/${dir}/package.json`)

      rows.push([
        packageJson.name ?? '',
        mdbox.link(
          `https://npmjs.com/package/${packageJson.name}`,
          mdbox.image(
            `https://img.shields.io/npm/v/${packageJson.name}?color=brightgreen`,
            'npm version'
          )
        ),
        packageJson.description ?? '',
        mdbox.link(`https://github.com/kerwanp/osmosjs/tree/main/packages/${dir}`, 'Source'),
        mdbox.link(packageJson.homepage ?? '', 'Documentation'),
      ])
    }

    return {
      contents: mdbox.table({
        columns,
        rows,
      }),
    }
  },
})
