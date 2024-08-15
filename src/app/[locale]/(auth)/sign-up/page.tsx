import AuthForm from "@/components/auth/Form";
import Link from "next/link"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/Typography";
import { getSingUpInfo, localeType } from "@/sanity/lib/interface";
import Image from "next/image";
import NuLogo from "@/components/NuLogo";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const Page = async ({ params: { locale } }: { params: { locale: localeType } }) => {
  const image = await getSingUpInfo();
  return (
    <>
      <div className="bg-nu-blue absolute w-full sm:w-1/2 h-full sm:relative">
        <Image fill alt={image?.alt?.[locale]} src={image.image.url} className="object-cover" />
      </div>
      <div className=" w-full sm:w-1/2 flex-0 flex h-full items-center justifiy-center">
        <Card className="max-w-lg mx-auto my-4 bg-popover p-10">
          <CardHeader className="">
            <Typography variant="h1" className="text-center mb-0">
              {locale == "en" ? "Create an account" : "Créez votre compte"}
            </Typography>
          </CardHeader>
          <CardContent>
            <AuthForm className="mt-0" action="/api/sign-in">
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
              {locale == "en" ? "Already have an account?" : "Déjà un compte?"}{" "}
              <Link href="/sign-in" className="text-secondary-foreground underline">
                {locale == "en" ? "Sign in" : "Connecter"}
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/" className="mx-auto w-fit">
              <NuLogo className=" size-6 fill-muted-foreground" />{" "}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Page;
