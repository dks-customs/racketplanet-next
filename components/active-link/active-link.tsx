import Link from "next/link";
import { headers } from "next/headers";
import { ReactNode } from "react";

type ActiveLinkProps = {
  href: string;
  children: ReactNode;
};

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  return <Link href={href}>{children}</Link>;
}
