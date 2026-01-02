import { Osmos } from '@osmosjs/osmos'
import RootLayout from '../../layouts/root_layout.tsx'
import { LoginForm } from '../../components/forms/login_form.tsx'

export async function LoginPage(this: Osmos) {
  return (
    <RootLayout>
      <div className="form-container">
        <div>
          <h1> Login </h1>
          <p>Enter your email and password below to log in</p>
        </div>

        <div>
          <LoginForm />
        </div>
      </div>
    </RootLayout>
  )
}
