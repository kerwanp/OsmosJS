import { ComponentProps } from '@osmosjs/osmos'
import { Button } from './ui/button.jsx'

const icons = {
  github: <i className="hgi hgi-stroke hgi-github" />,
  x: <i className="hgi hgi-stroke hgi-new-twitter" />,
  npm: <i className="hgi hgi-stroke hgi-npm" />,
  discord: <i className="hgi hgi-stroke hgi-discord" />,
}

export const SocialButton = ({
  social,
  ...props
}: ComponentProps<typeof Button> & {
  social: keyof typeof icons
}) => {
  return (
    <Button size="icon" variant="ghost" className="text-xl" {...props}>
      {icons[social]}
    </Button>
  )
}
