import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { JobSelector } from './JobSelector';
import { RoleRef, RoleSelectorProps } from '../types/role';

const TANK_JOBS = [
  { label: '戦士', icon: '/job/tank/Warrior.png' },
  { label: '暗黒騎士', icon: '/job/tank/DarkKnight.png' },
  { label: 'ナイト', icon: '/job/tank/Paladin.png' },
  { label: 'ガンブレイカー', icon: '/job/tank/Gunbreaker.png' },
] as const;

export const TankRoleSelector = forwardRef<RoleRef, RoleSelectorProps>(
  ({ onJobSelect }, ref) => {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    useEffect(() => {
      setIsRoleSelected(selectedJobs.length === TANK_JOBS.length);
    }, [selectedJobs]);

    const handleRoleSelect = (selected: boolean) => {
      setIsRoleSelected(selected);
      setSelectedJobs(selected ? TANK_JOBS.map(job => job.label) : []);
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

    useImperativeHandle(ref, () => ({
      selectAll: () => {
        setIsRoleSelected(true);
        setSelectedJobs(TANK_JOBS.map(job => job.label));
        onJobSelect();
      },
      clearAll: () => {
        setIsRoleSelected(false);
        setSelectedJobs([]);
        onJobSelect();
      },
      getSelectedJobs: () => selectedJobs.map(label => ({
        label,
        icon: TANK_JOBS.find(job => job.label === label)!.icon
      }))
    }));

    return (
      <div className="bg-[#2a2829] p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <JobSelector
            label="TANK"
            icon="/role/TankRole.png"
            isSelected={isRoleSelected}
            onChange={handleRoleSelect}
          />
          <h2 className="text-[#fff] text-lg">TANK</h2>
        </div>
        <div className="flex justify-center gap-5">
          {TANK_JOBS.map((job) => (
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

TankRoleSelector.displayName = 'TankRoleSelector'; 