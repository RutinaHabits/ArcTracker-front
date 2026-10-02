import { Input } from "@/shared/ui/Input/Input";

export default function SignInPage() {
  return (
    <div>
      <span>Sign In</span>
      <Input
        label="Электронная почта"
        type="email"
        placeholder="example@mail.com"
      ></Input>
    </div>
  );
}
