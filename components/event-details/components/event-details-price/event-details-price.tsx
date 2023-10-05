import "./event-details-price.scss";

export default function EventDetailsPrice({ price }: { price?: string }) {
  if (price && price !== "-") {
    return <p className="event-details-price">{price}</p>;
  } else {
    return null;
  }
}
