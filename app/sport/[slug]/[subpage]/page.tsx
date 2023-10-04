import { Metadata } from "next";
import getSports from "../../../../api/getSports";
import subpageSlug from "../../../../util/subpageSlug";
import getSportSubpage from "../../../../api/getSportSubpage";
import NotFound from "../../../not-found";
import { routes } from "../../../../constants/constants";
import pageMetadata from "../../../../util/pageMetadata";

type SportSubpageProps = {
  params: {
    slug: string;
    subpage: string;
  };
};

export default async function SportSubpage({ params }: SportSubpageProps) {
  const subpage = await getSportSubpage(params.slug, params.subpage);

  if (subpage) {
    return (
      <main className="sport-subpage layout-container">
        <h1>{subpage.title}</h1>
        {subpage.ustawieniaStrony && (
          <div>
            <p>{subpage.ustawieniaStrony.nazwaFederacji}</p>
            <p>{subpage.ustawieniaStrony.prezesFederacji}</p>
            <p>
              <a
                href={subpage.ustawieniaStrony.stronaFederacji}
                target="_blank"
              >
                Strona internetowa&nbsp;&rarr;
              </a>
            </p>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: subpage.content }}></div>
      </main>
    );
  } else {
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const sports = await getSports();

  const params: {
    slug: string;
    subpage: string;
  }[] = [];

  return sports.map((sport) => {
    sport.pages.nodes.forEach((page) => {
      params.push({
        slug: sport.slug,
        subpage: subpageSlug(page.slug, sport.slug),
      });
    });
  });
}

export async function generateMetadata({
  params,
}: SportSubpageProps): Promise<Metadata> {
  const subpage = await getSportSubpage(params.slug, params.subpage);

  return pageMetadata({
    url: `${routes.SPORT}/${params.slug}/${params.subpage}`,
    titleFollowUp: subpage ? subpage.title : "Nie znaleziono strony",
    twitterCard: "summary",
    ogType: "article",
  });
}
