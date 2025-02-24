import { Job } from './job';

export interface RoleRef {
  selectAll: () => void;
  clearAll: () => void;
  getSelectedJobs: () => Job[];
}

export interface RoleSelectorProps {
  onJobSelect: () => void;
} 