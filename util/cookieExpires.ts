export default function cookieExpires() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 100);

  return expires;
}
