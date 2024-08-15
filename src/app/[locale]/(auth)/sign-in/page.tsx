import NuLogo from "@/components/NuLogo";
import Typography from "@/components/Typography";
import AuthForm from "@/components/auth/Form";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSingInInfo, localeType } from "@/sanity/lib/interface";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params: { locale } }: { params: { locale: localeType } }) => {
  const image = await getSingInInfo();
  return (
    <>
      <div className="bg-nu-blue w-1/2 flex-0 relative">
        <Image fill alt={image?.alt?.[locale]} src={image.image.url} className="object-cover" />
      </div>
      <div className=" w-1/2 flex-0 flex h-full items-center justifiy-center">
        <Card className="max-w-lg mx-auto my-4 bg-popover p-10">
          <CardHeader className="">
            <Typography variant="h1" className="text-center mb-0">
              {locale == "en" ? "Sign in to your account" : "Connectez-vous"}
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
            <div className="mt-4 text-sm text-center text-muted-foreground ">
              {locale == "en" ? "Don't have an account yet?" : "Pas encore de compte?"}{" "}
              <Link href="/sign-up" className="text-accent-foreground underline hover:text-primary">
                {locale == "en" ? "Create an account" : "Enregistrez-vous"}
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <NuLogo className="mx-auto size-6 fill-muted-foreground" />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Page;
