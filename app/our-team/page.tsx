import type { Metadata } from "next";
import Background from "@/components/shared/background";
import TeamGrid from "@/components/our-team/team-grid";
import FinalCta from "@/components/about-us/final-cta";

// Team members are managed from /admin/team — force dynamic rendering so
// admin edits show up immediately instead of waiting for a redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team at Constant Care Family Services Inc., the people delivering compassionate, person-centred care across New Brunswick.",
  alternates: { canonical: "/our-team" },
};

export default function OurTeam() {
  return (
    <div className="overflow-x-hidden">
      <Background className="md:py-10">
        <h1>Meet Our Team</h1>
      </Background>

      <TeamGrid />
      <FinalCta />
    </div>
  );
}
