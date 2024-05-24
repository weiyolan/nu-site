import { Suspense } from "react";

import Loading from "@/app/loading";
import PageList from "@/components/pages/PageList";
import { getPages } from "@/lib/api/pages/queries";

import { checkAuth } from "@/lib/auth/utils";
import Typography from "@/components/Typography";

export const revalidate = 0;

export default async function PagesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <Typography variant={"h2"}>Pages</Typography>
        </div>
        <Pages />
      </div>
    </main>
  );
}

const Pages = async () => {
  await checkAuth();

  const { pages } = await getPages();

  return (
    <Suspense fallback={<Loading />}>
      <PageList pages={pages} />
    </Suspense>
  );
};
