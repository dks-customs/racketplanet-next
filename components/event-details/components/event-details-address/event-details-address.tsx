import "./event-details-address.scss";

export default function EventDetailsAddress({ address }: { address?: string }) {
  if (address) {
    return (
      <p className="event-details-address">
        Adres: <span dangerouslySetInnerHTML={{ __html: address }}></span>
      </p>
    );
  } else {
    return null;
  }
}
