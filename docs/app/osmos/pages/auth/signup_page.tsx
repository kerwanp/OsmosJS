import { Osmos } from '@osmosjs/osmos'
import RootLayout from '../../layouts/root_layout.tsx'
import { SignupForm } from '../../components/forms/signup_form.tsx'

export async function SignupPage(this: Osmos) {
  return (
    <RootLayout>
      <div className="form-container">
        <div>
          <h1> Signup </h1>
          <p>Enter your details below to create your account</p>
        </div>
        <div>
          <SignupForm />
        </div>
      </div>
    </RootLayout>
  )
}
