import Link from "next/link";
import { headers } from "next/headers";
import { ReactNode, Suspense } from "react";
import ActiveLinkClient from "./components/active-link-client";

export type ActiveLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: any;
};

export default function ActiveLink({
  href,
  children,
  className = "",
  onClick = undefined,
}: ActiveLinkProps) {
  const pathname = headers().get("next-url");
  const displayedClassname =
    pathname === href
      ? className
        ? `${className} active`
        : `active`
      : className
      ? className
      : undefined;

  return (
    <Suspense
      fallback={
        <Link href={href} className={displayedClassname} onClick={onClick}>
          {children}
        </Link>
      }
    >
      <ActiveLinkClient href={href} className={className} onClick={onClick}>
        {children}
      </ActiveLinkClient>
    </Suspense>
  );
}
