import Background from "@/components/shared/background";
import WhoCanRefer from "@/components/referrals/who-can-refer";
import ReferralForm from "@/components/referrals/referral-form";

export default function Referrals() {
  return (
    <div>
      <Background className="md:py-10">
        <h1>Refer a Client</h1>
        {/* <p className="w-10/12 pt-3 mx-auto text-base font-normal leading-tight md:w-6/12">
          We welcome referrals from families, professionals, and community
          partners across New Brunswick.
        </p> */}
      </Background>

      <WhoCanRefer />
      <ReferralForm />
    </div>
  );
}
