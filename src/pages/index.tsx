import { TankRoleSelector } from '../components/TankRoleSelector';
import { HealerRoleSelector } from '../components/HealerRoleSelector';
import { MeleeRoleSelector } from '../components/Melee';
import { RangeRoleSelector } from '../components/Range';
import { CasterRoleSelector } from '../components/Caster';
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1d1c1c] p-8">
      <div className="max-w-2xl mx-auto">
        <TankRoleSelector />
        <HealerRoleSelector />
        <MeleeRoleSelector />
        <div className="flex flex-col sm:flex-row sm:gap-4 justify-center">
          <RangeRoleSelector />
          <CasterRoleSelector />
        </div>
      </div>
    </div>
  );
}
