import "./event-details-address.scss";

export default function EventDetailsAddress({ address }: { address?: string }) {
  if (address) {
    return <p className="event-details-address">{address}</p>;
  } else {
    return null;
  }
}
