import ContactForm from "../../components/contact-form/contact-form";
import FacebookSVG from "../../components/svg/facebook";
import {
  FACEBOOK_URL,
  RACKETPLANET_EMAIL,
  routes,
} from "../../constants/constants";
import getContact from "../../graphql/getContact";
import pageMetadata from "../../util/pageMetadata";
import "./contact.scss";

export default async function Contact() {
  const contact = await getContact();

  if (contact) {
    return (
      <main className="contact layout-container">
        <div className="archive-header">
          <h1 className="archive-title">{contact.title}</h1>
        </div>
        <div className="contact__content">
          <section className="contact__content__form">
            <ContactForm />
          </section>
          <section className="contact__content__desc">
            <h2>Jeśli bardzo nie lubisz wypełniania formularzy...</h2>
            <p>
              ...możesz skontaktować się z nami pisząc bezpośrednio na nasz
              adres e-mail:
            </p>
            <a
              className="contact-info__email"
              href={`mailto: ${RACKETPLANET_EMAIL}`}
            >
              {RACKETPLANET_EMAIL}
            </a>
            <p>
              ...lub poprzez prywatną wiadomość na naszym facebookowym fanpage:
            </p>
            <a
              className="contact-info__fb"
              href={FACEBOOK_URL}
              target="__blank"
            >
              <FacebookSVG />
            </a>
          </section>
        </div>
      </main>
    );
  } else {
    return null;
  }
}

export const metadata = pageMetadata({
  url: routes.CONTACT,
  titleFollowUp: "Kontakt",
  description:
    "Cenimy sobie krytykę oraz obiecujemy, że każdą wiadomością zajmiemy się najszybciej jak to będzie możliwe",
  twitterCard: "summary",
});
