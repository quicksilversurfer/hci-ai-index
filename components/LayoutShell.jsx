"use client";

import PropTypes from "prop-types";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import AnnotationFloatingHistory from "@/components/ui/AnnotationFloatingHistory";

export default function LayoutShell({ children, footer }) {
  const pathname = usePathname();
  const isNewsletterDetail = pathname?.startsWith("/newsletters");
  const isNewsletterIndex = pathname === "/" || pathname === "/newsletters";
  const isManualLayout = [
    "/about",
    "/allWorks",
    "/generate",
    "/disclaimer",
    "/collections",
  ].includes(pathname);

  const shouldApplyShell = !isNewsletterIndex && !isManualLayout;

  return (
    <div className="w-full grow flex flex-col relative isolation-auto">
      {isNewsletterDetail && (
        <div className="fixed inset-0 pointer-events-none -z-50 bg-base-100 dark:bg-base-950 transition-colors duration-300" />
      )}
      <div
        className={clsx(
          "w-full flex flex-col grow",
          shouldApplyShell && "content-shell mt-12"
        )}
      >
        {children}
      </div>
      <div className="w-full content-shell">{footer}</div>
      <AnnotationFloatingHistory />
    </div>
  );
}

LayoutShell.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};
