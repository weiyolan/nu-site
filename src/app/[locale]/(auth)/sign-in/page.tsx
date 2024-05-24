import Typography from "@/components/Typography";
import AuthForm from "@/components/auth/Form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { localeType } from "@/sanity/lib/interface";
import Link from "next/link";

const Page = async ({ params: { locale } }: { params: { locale: localeType } }) => {
  return (
    <main className="max-w-lg mx-auto my-4 bg-popover p-10">
      <Typography variant="h1" className="text-center">
        {locale == "en" ? "Sign in to your account" : "Connectez-vous"}
      </Typography>
      <AuthForm action="/api/sign-in">
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
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {locale == "en" ? "Don't have an account yet?" : "Pas encore de compte?"}{" "}
        <Link href="/sign-up" className="text-accent-foreground underline hover:text-primary">
          {locale == "en" ? "Create an account" : "Enregistrez-vous"}
        </Link>
      </div>
    </main>
  );
};

export default Page;
