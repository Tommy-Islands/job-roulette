import { useRef, useState } from 'react';
import { TankRoleSelector } from '../components/TankRoleSelector';
import { HealerRoleSelector } from '../components/HealerRoleSelector';
import { MeleeRoleSelector } from '../components/Melee';
import { RangeRoleSelector } from '../components/Range';
import { CasterRoleSelector } from '../components/Caster';
import { GlobalControls } from '../components/GlobalControls';
import { JobRoulette } from '../components/JobRoulette';
import { RoleRef } from '../types/role';

export default function Home() {
  const tankRef = useRef<RoleRef>(null);
  const healerRef = useRef<RoleRef>(null);
  const meleeRef = useRef<RoleRef>(null);
  const rangeRef = useRef<RoleRef>(null);
  const casterRef = useRef<RoleRef>(null);

  const [, setUpdateCount] = useState(0);

  const handleCheckAll = () => {
    [tankRef, healerRef, meleeRef, rangeRef, casterRef].forEach(ref => {
      ref.current?.selectAll();
    });
    handleJobSelect();
  };

  const handleClearAll = () => {
    [tankRef, healerRef, meleeRef, rangeRef, casterRef].forEach(ref => {
      ref.current?.clearAll();
    });
    handleJobSelect();
  };

  const handleJobSelect = () => {
    setUpdateCount(prev => prev + 1);
  };

  const getSelectedJobs = () => {
    const jobs = [
      tankRef.current?.getSelectedJobs() || [],
      healerRef.current?.getSelectedJobs() || [],
      meleeRef.current?.getSelectedJobs() || [],
      rangeRef.current?.getSelectedJobs() || [],
      casterRef.current?.getSelectedJobs() || [],
    ];
    return jobs.flat().filter(job => job !== null);
  };

  return (
    <div className="min-h-screen bg-[#1d1c1c] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-[#1d1c1c] pt-4 pb-4 z-10">
          <JobRoulette getSelectedJobs={getSelectedJobs} />
          <GlobalControls 
            onCheckAll={handleCheckAll} 
            onClearAll={handleClearAll} 
          />
        </div>

        <div className="mt-4">
          <TankRoleSelector ref={tankRef} onJobSelect={handleJobSelect} />
          <HealerRoleSelector ref={healerRef} onJobSelect={handleJobSelect} />
          <MeleeRoleSelector ref={meleeRef} onJobSelect={handleJobSelect} />
          <div className="flex flex-col sm:flex-row sm:gap-4 justify-center">
            <RangeRoleSelector ref={rangeRef} onJobSelect={handleJobSelect} />
            <CasterRoleSelector ref={casterRef} onJobSelect={handleJobSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
