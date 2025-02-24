import { useState, useEffect } from 'react';
import { JobSelector } from './JobSelector';

const HEALER_JOBS = [
  { label: '白魔道士', icon: '/job/healer/WhiteMage.png' },
  { label: '学者', icon: '/job/healer/Scholar.png' },
  { label: '占星術師', icon: '/job/healer/Astrologian.png' },
  { label: '賢者', icon: '/job/healer/Sage.png' },
] as const;

export function HealerRoleSelector() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  useEffect(() => {
    setIsRoleSelected(selectedJobs.length === HEALER_JOBS.length);
  }, [selectedJobs]);

  const handleRoleSelect = (selected: boolean) => {
    setIsRoleSelected(selected);
    setSelectedJobs(selected ? HEALER_JOBS.map(job => job.label) : []);
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
    <div className="bg-[#2a2829] p-6 rounded-lg mt-4">
      <div className="flex items-center gap-4 mb-4">
        <JobSelector
          label="HEALER"
          icon="/role/HealerRole.png"
          isSelected={isRoleSelected}
          onChange={handleRoleSelect}
        />
        <h2 className="text-[#fff] text-lg">HEALER</h2>
      </div>
      <div className="flex justify-center gap-5">
        {HEALER_JOBS.map((job) => (
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