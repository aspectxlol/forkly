interface RegistrationFormProps {
  onBack: () => void;
  onNext: () => void;
}

export function RegistrationForm(props: RegistrationFormProps) {
  return (
    <div>
      <h1>Step 2: Registration Form</h1>
      {/* input fields for email, password, etc. */}
      <button onClick={props.onBack}>Back</button>
      <button onClick={props.onNext}>Signup</button>
    </div>
  );
}