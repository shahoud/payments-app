"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AddNewLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams.toString()}`;
  return (
    <Link href={`payments/create?redirect=${encodeURIComponent(currentUrl)}`}>
      Add New
    </Link>
  );
}
