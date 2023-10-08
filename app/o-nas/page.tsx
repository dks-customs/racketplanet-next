import LogoSVG from "../../components/svg/logo";
import { routes } from "../../constants/constants";
import getAbout from "../../graphql/getAbout";
import pageMetadata from "../../util/pageMetadata";
import NotFound from "../not-found";
import "./about.scss";
import getAuthors from "../../graphql/getAuthors";
import AuthorPreview from "../../components/author-preview/author-preview";

export default async function About() {
  const about = await getAbout();
  const authors = await getAuthors();

  if (about && authors) {
    return (
      <main className="about layout-container">
        <h1>{about.title}</h1>
        <div>
          <div dangerouslySetInnerHTML={{ __html: about.content }}></div>
          <div>
            <LogoSVG />
          </div>
        </div>
        <div>
          {(authors.headAuthor || authors.activeAuthors.length > 0) && (
            <div>
              <h3>Redakcja</h3>
              <ul>
                {authors.headAuthor && (
                  <li>
                    <AuthorPreview
                      name={authors.headAuthor.name}
                      id={authors.headAuthor.databaseId}
                      avatarUrl={authors.headAuthor.avatar.url}
                    />
                  </li>
                )}
                {authors.activeAuthors.map((user) => (
                  <li key={`about-user-${user.databaseId}`}>
                    <AuthorPreview
                      name={user.name}
                      id={user.databaseId}
                      avatarUrl={user.avatar.url}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {authors.inactiveAuthors.length > 0 && (
            <div>
              <h3>Pisali dla nas</h3>
              <ul>
                {authors.inactiveAuthors.map((user) => (
                  <li key={`about-user-${user.databaseId}`}>
                    <AuthorPreview
                      name={user.name}
                      id={user.databaseId}
                      avatarUrl={user.avatar.url}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    );
  } else {
    return null;
  }
}

export const metadata = pageMetadata({
  url: routes.ABOUT,
  titleFollowUp: "O nas",
  description:
    "Misją naszej strony jest zwiększenie świadomości na temat szerokiej gamy sportów rakietowych, w tym tych obecnie niszowych",
  twitterCard: "summary",
});
