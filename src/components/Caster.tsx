import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { JobSelector } from './JobSelector';
import { RoleRef, RoleSelectorProps } from '../types/role';

const CASTER_JOBS = [
  { label: '黒魔道士', icon: '/job/magicalrangedDPS/BlackMage.png' },
  { label: '召喚士', icon: '/job/magicalrangedDPS/Summoner.png' },
  { label: '赤魔道士', icon: '/job/magicalrangedDPS/RedMage.png' },
  // { label: 'ピクトマンサー', icon: '/job/magicalrangedDPS/Pictomancer.png' },
] as const;

export const CasterRoleSelector = forwardRef<RoleRef, RoleSelectorProps>(
  ({ onJobSelect }, ref) => {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    useEffect(() => {
      setIsRoleSelected(selectedJobs.length === CASTER_JOBS.length);
    }, [selectedJobs]);

    useImperativeHandle(ref, () => ({
      selectAll: () => {
        setIsRoleSelected(true);
        setSelectedJobs(CASTER_JOBS.map(job => job.label));
      },
      clearAll: () => {
        setIsRoleSelected(false);
        setSelectedJobs([]);
      },
      getSelectedJobs: () => selectedJobs.length > 0 ? selectedJobs.map(label => ({
        label,
        icon: CASTER_JOBS.find(job => job.label === label)!.icon
      })) : []
    }));

    const handleRoleSelect = (selected: boolean) => {
      setIsRoleSelected(selected);
      setSelectedJobs(selected ? CASTER_JOBS.map(job => job.label) : []);
      onJobSelect();
    };

    const handleJobSelect = (jobLabel: string, selected: boolean) => {
      setSelectedJobs(prev => {
        const newSelection = selected
          ? [...prev, jobLabel]
          : prev.filter(label => label !== jobLabel);
        onJobSelect();
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
);

CasterRoleSelector.displayName = 'CasterRoleSelector'; 