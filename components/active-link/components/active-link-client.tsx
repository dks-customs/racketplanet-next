"use client";

import Link from "next/link";
import { ActiveLinkProps } from "../active-link";
import { usePathname } from "next/navigation";

export default function ActiveLinkClient({
  href,
  children,
  className,
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const displayedClassname =
    pathname === href
      ? className
        ? `${className} active`
        : `active`
      : className
      ? className
      : undefined;
  return (
    <Link href={href} className={displayedClassname} onClick={onClick}>
      {children}
    </Link>
  );
}
