import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { JobSelector } from './JobSelector';
import { RoleRef, RoleSelectorProps } from '../types/role';

const RANGE_JOBS = [
  { label: '吟遊詩人', icon: '/job/physicalrangedDPS/Bard.png' },
  { label: '踊り子', icon: '/job/physicalrangedDPS/Dancer.png' },
  { label: '機工士', icon: '/job/physicalrangedDPS/Machinist.png' },
] as const;

export const RangeRoleSelector = forwardRef<RoleRef, RoleSelectorProps>(
  ({ onJobSelect }, ref) => {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    useEffect(() => {
      setIsRoleSelected(selectedJobs.length === RANGE_JOBS.length);
    }, [selectedJobs]);

    const handleRoleSelect = (selected: boolean) => {
      setIsRoleSelected(selected);
      setSelectedJobs(selected ? RANGE_JOBS.map(job => job.label) : []);
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
        setSelectedJobs(RANGE_JOBS.map(job => job.label));
      },
      clearAll: () => {
        setIsRoleSelected(false);
        setSelectedJobs([]);
      },
      getSelectedJobs: () => selectedJobs.length > 0 ? selectedJobs.map(label => ({
        label,
        icon: RANGE_JOBS.find(job => job.label === label)!.icon
      })) : []
    }));

    return (
      <div className="bg-[#2a2829] p-6 rounded-lg mt-4 w-full">
        <div className="flex items-center gap-4 mb-4">
          <JobSelector
            label="RANGE"
            icon="/role/DPSRole.png"
            isSelected={isRoleSelected}
            onChange={handleRoleSelect}
          />
          <h2 className="text-[#fff] text-lg">RANGE</h2>
        </div>
        <div className="flex justify-center gap-5">
          {RANGE_JOBS.map((job) => (
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

RangeRoleSelector.displayName = 'RangeRoleSelector'; 