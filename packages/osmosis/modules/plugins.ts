import { remarkCallout } from '../src/plugins/remark_callout.js'
import { remarkCodeTab } from '../src/plugins/remark_code_tab.js'
import { remarkHeading } from '../src/plugins/remark_heading.js'
import { remarkInstall } from '../src/plugins/remark_install.js'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { rehypeCode } from './plugins.js'
import { default as remarkGfm } from 'remark-gfm'

export * from '../src/plugins/remark_heading.js'
export * from '../src/plugins/rehype_code.js'
export * from '../src/plugins/remark_install.js'
export * from '../src/plugins/remark_code_tab.js'
export * from '../src/plugins/remark_callout_old.js'

export const defaultPlugins = {
  remarkPlugins: [
    remarkFrontmatter,
    remarkMdxFrontmatter,
    remarkHeading,
    remarkInstall,
    remarkCodeTab,
    remarkCallout,
    remarkGfm,
  ],
  rehypePlugins: [rehypeCode],
}
