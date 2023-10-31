import { Metadata } from "next";
import getSports from "../../../../graphql/getSports";
import subpageSlug from "../../../../util/subpageSlug";
import getSportSubpage from "../../../../graphql/getSportSubpage";
import NotFound from "../../../not-found";
import { routes } from "../../../../constants/constants";
import pageMetadata from "../../../../util/pageMetadata";
import PostContent from "../../../../components/post-content/post-content";
import "./sport-subpage.scss";

type SportSubpageProps = {
  params: {
    slug: string;
    subpage: string;
  };
};

export const dynamic = "force-static";

export default async function SportSubpage({ params }: SportSubpageProps) {
  const subpage = await getSportSubpage(params.slug, params.subpage);

  if (subpage) {
    const { ustawieniaStrony, featuredImage } = subpage;
    const nazwaFederacji = ustawieniaStrony?.nazwaFederacji;
    const prezesFederacji = ustawieniaStrony?.prezesFederacji;
    const stronaFederacji = ustawieniaStrony?.stronaFederacji;

    return (
      <main className="sport-subpage layout-container">
        <div className="sport-subpage-content">
          <div className="archive-header">
            <h1 className="archive-title sport-subpage-content__title">
              {subpage.title}
            </h1>
          </div>
          {featuredImage && (
            <div className="sport-subpage-content__image">
              <img src={featuredImage?.node.sourceUrl}></img>
            </div>
          )}
          {subpage.ustawieniaStrony &&
            (nazwaFederacji || prezesFederacji || stronaFederacji) && (
              <div className="sport-subpage-content__federation-info">
                {nazwaFederacji && (
                  <p>{subpage.ustawieniaStrony.nazwaFederacji}</p>
                )}
                {prezesFederacji && (
                  <p>{subpage.ustawieniaStrony.prezesFederacji}</p>
                )}
                {stronaFederacji && (
                  <p>
                    <a
                      href={subpage.ustawieniaStrony.stronaFederacji}
                      target="_blank"
                    >
                      Strona internetowa&nbsp;&rarr;
                    </a>
                  </p>
                )}
              </div>
            )}
          <div className="sport-subpage-content__content">
            <PostContent content={subpage.content} />
          </div>
        </div>
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
