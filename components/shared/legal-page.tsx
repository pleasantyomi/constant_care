import type { ReactNode } from "react";
import Background from "@/components/shared/background";

// Layout for the Privacy Policy and Terms pages: blue banner, then a single
// readable column of sections.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <Background className="md:py-10">
        <h1>{title}</h1>
      </Background>
      <article className="w-11/12 max-w-3xl py-14 mx-auto space-y-8 text-sm leading-relaxed text-muted-foreground md:py-20">
        <p className="text-xs">Last updated: {updated}</p>
        {children}
      </article>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}
