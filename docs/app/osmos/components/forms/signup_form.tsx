import User from '#models/user'
import { Osmos } from '@osmosjs/osmos'
import { Form } from '@osmosjs/adonis/form'
import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

const FormSchema = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
})

export async function SignupForm(this: Osmos) {
  const form = await this.form(FormSchema)

  if (form.isSubmitted && form.isValid) {
    const user = await User.create(form.parsed)
    await this.ctx.auth.use('web').login(user)
    this.redirect('home')
  }

  return (
    <Form form={form}>
      <div>
        <label>Full name</label>
        <input {...form.field('fullName')} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" autoComplete="email" {...form.field('email')} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...form.field('password')} />
      </div>

      <div>
        <label>Password confirmation</label>
        <input name="passwordConfirmation" type="password" />
      </div>

      <button type="submit">Sign Up</button>
    </Form>
  )
}
