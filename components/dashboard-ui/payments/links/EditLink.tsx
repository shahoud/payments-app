"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditLink({ paymentId }: { paymentId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Construct full URL including query params
  const currentUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <Link
      href={`payments/${paymentId}/edit?redirect=${encodeURIComponent(
        currentUrl
      )}`}
    >
      Edit
    </Link>
  );
}
