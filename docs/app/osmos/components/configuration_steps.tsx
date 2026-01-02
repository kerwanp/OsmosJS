import { Accordion, AccordionContent, AccordionSummary } from './accordion.tsx'
import { Step, Steps } from './steps.tsx'

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
          <Step>
            <h4>Register providers</h4>
            <p>
              Registers the following service providers inside the <code>adonisrc.ts</code> file
            </p>
          </Step>
          {commands && (
            <Step>
              <h4>Register commands</h4>
              <p>
                Registers the following commands inside the <code>adonisrc.ts</code> file
              </p>
            </Step>
          )}
        </Steps>
      </AccordionContent>
    </Accordion>
  )
}
