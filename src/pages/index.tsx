import { TankRoleSelector } from '../components/TankRoleSelector';
import { HealerRoleSelector } from '../components/HealerRoleSelector';
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1d1c1c] p-8">
      <div className="max-w-2xl mx-auto">
        <TankRoleSelector />
        <HealerRoleSelector />
      </div>
    </div>
  );
}
