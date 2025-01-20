import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { MainHero } from "@/components/hero-main";
import { Team } from "@/components/team";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <MainHero />
      <Features />
      <Team />
      <Footer />
    </div>
  );
}
