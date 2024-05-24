import AuthForm from "@/components/auth/Form";
import Link from "next/link"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/Typography";
import { localeType } from "@/sanity/lib/interface";

const Page = async ({ params: { locale } }: { params: { locale: localeType } }) => {
  return (
    <main className="max-w-lg mx-auto my-4 bg-popover p-10">
      <Typography variant="h1" className="text-center">
        {locale == "en" ? "Create an account" : "Créez votre compte"}
      </Typography>
      <AuthForm action="/api/sign-up">
        <Label htmlFor="username" className="text-muted-foreground">
          {locale == "en" ? "Username" : "Nom utilisateur"}
        </Label>
        <Input name="username" id="username" />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          {locale == "en" ? "Password" : "Mot de passe"}
        </Label>
        <Input type="password" name="password" id="password" />
        <br />
      </AuthForm>
      <div className="mt-4 text-muted-foreground text-center text-sm">
        {locale == "en" ? "Already have an account?" : "Avez-vous déjà un compte?"}{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          {locale == "en" ? "Sign in" : "Connecter"}
        </Link>
      </div>
    </main>
  );
};

export default Page;
