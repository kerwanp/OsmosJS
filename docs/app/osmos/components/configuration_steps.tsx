import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  DynamicCodeBlock,
  Step,
  Steps,
} from '@osmosjs/osmosis/ui'

export type ConfigurationSteps = {
  readonly commands?: boolean
  readonly config?: string
  readonly pkg: string
  readonly providers?: string[]
}

export const ConfigurationSteps = ({
  pkg,
  providers,
  commands = false,
  config,
}: ConfigurationSteps) => {
  return (
    <Accordion>
      <AccordionSummary>See steps performed by this command</AccordionSummary>
      <AccordionContent>
        <Steps>
          <Step>
            <h4>Installs {pkg}</h4>
            <p>
              Installs the <code>{pkg}</code> package using the detected package manager.
            </p>
          </Step>
          {providers && (
            <Step>
              <h4>Register providers</h4>
              <p>
                Registers the following service providers inside the <code>adonisrc.ts</code> file
              </p>
              <DynamicCodeBlock
                lang="ts"
                title="adonisrc.ts"
                code={`{
  providers: [
    // ...other providers
    ${providers.map((provider) => `() => import("${pkg}/providers/${provider}")`).join(',\n')}
  ]
}`}
              />
            </Step>
          )}
          {commands && (
            <Step>
              <h4>Register commands</h4>
              <p>
                Registers the following commands inside the <code>adonisrc.ts</code> file
              </p>
              <DynamicCodeBlock
                lang="ts"
                title="adonisrc.ts"
                code={`{
  commands: [
    // ...other commands
    () => import("${pkg}/commands")
  ]
}`}
              />
            </Step>
          )}

          {config && (
            <Step>
              <h4>Generates configuration</h4>
              <p>
                A configuration file <code>config/{config}.ts</code> is generated containing the
                default configuration.
              </p>
            </Step>
          )}
        </Steps>
      </AccordionContent>
    </Accordion>
  )
}
