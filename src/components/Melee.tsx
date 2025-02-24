import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { JobSelector } from './JobSelector';
import { RoleRef, RoleSelectorProps } from '../types/role';

const MELEE_JOBS = [
  { label: '竜騎士', icon: '/job/meleeDPS/Dragoon.png' },
  { label: 'モンク', icon: '/job/meleeDPS/Monk.png' },
  { label: '忍者', icon: '/job/meleeDPS/Ninja.png' },
  { label: 'リーパー', icon: '/job/meleeDPS/Reaper.png' },
  { label: '侍', icon: '/job/meleeDPS/Samurai.png' },
  // { label: 'ヴァイパー', icon: '/job/meleeDPS/Viper.png' },
] as const;

export const MeleeRoleSelector = forwardRef<RoleRef, RoleSelectorProps>(
  ({ onJobSelect }, ref) => {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    useEffect(() => {
      setIsRoleSelected(selectedJobs.length === MELEE_JOBS.length);
    }, [selectedJobs]);

    useImperativeHandle(ref, () => ({
      selectAll: () => {
        setIsRoleSelected(true);
        setSelectedJobs(MELEE_JOBS.map(job => job.label));
      },
      clearAll: () => {
        setIsRoleSelected(false);
        setSelectedJobs([]);
      },
      getSelectedJobs: () => selectedJobs.length > 0 ? selectedJobs.map(label => ({
        label,
        icon: MELEE_JOBS.find(job => job.label === label)!.icon
      })) : []
    }));

    const handleRoleSelect = (selected: boolean) => {
      setIsRoleSelected(selected);
      setSelectedJobs(selected ? MELEE_JOBS.map(job => job.label) : []);
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
      <div className="bg-[#2a2829] p-6 rounded-lg mt-4">
        <div className="flex items-center gap-4 mb-4">
          <JobSelector
            label="MELEE"
            icon="/role/DPSRole.png"
            isSelected={isRoleSelected}
            onChange={handleRoleSelect}
          />
          <h2 className="text-[#fff] text-lg">MELEE</h2>
        </div>
        <div className="flex justify-center gap-5">
          {MELEE_JOBS.map((job) => (
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

MeleeRoleSelector.displayName = 'MeleeRoleSelector'; 