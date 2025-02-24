import { useState, useEffect } from 'react';
import { JobSelector } from './JobSelector';

const CASTER_JOBS = [
  { label: '黒魔導士', icon: '/job/magicalrangedDPS/BlackMage.png' },
  { label: '赤魔導士', icon: '/job/magicalrangedDPS/RedMage.png' },
  { label: '召喚士', icon: '/job/magicalrangedDPS/Summoner.png' },
] as const;

export function CasterRoleSelector() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  useEffect(() => {
    setIsRoleSelected(selectedJobs.length === CASTER_JOBS.length);
  }, [selectedJobs]);

  const handleRoleSelect = (selected: boolean) => {
    setIsRoleSelected(selected);
    setSelectedJobs(selected ? CASTER_JOBS.map(job => job.label) : []);
  };

  const handleJobSelect = (jobLabel: string, selected: boolean) => {
    setSelectedJobs(prev => {
      const newSelection = selected
        ? [...prev, jobLabel]
        : prev.filter(label => label !== jobLabel);
      return newSelection;
    });
  };

  return (
    <div className="bg-[#2a2829] p-6 rounded-lg mt-4 w-full">
      <div className="flex items-center gap-4 mb-4">
        <JobSelector
          label="CASTER"
          icon="/role/DPSRole.png"
          isSelected={isRoleSelected}
          onChange={handleRoleSelect}
        />
        <h2 className="text-[#fff] text-lg">CASTER</h2>
      </div>
      <div className="flex justify-center gap-5">
        {CASTER_JOBS.map((job) => (
          <JobSelector
            key={job.label}
            label={job.label}
            icon={job.icon}
            isSelected={selectedJobs.includes(job.label)}
            onChange={(selected) => handleJobSelect(job.label, selected)}
          />
        ))}
      </div>
    </div>
  );
} 