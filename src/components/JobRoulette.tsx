import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Job } from '../types/job';

interface JobRouletteProps {
  getSelectedJobs: () => Job[];
}

export function JobRoulette({ getSelectedJobs }: JobRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [availableJobs, setAvailableJobs] = useState<Job[]>(() => getSelectedJobs());

  useEffect(() => {
    setAvailableJobs(getSelectedJobs());
  }, [getSelectedJobs]);

  const startRoulette = () => {
    const jobs = getSelectedJobs();
    if (jobs.length === 0) return;
    
    setAvailableJobs(jobs);
    setIsSpinning(true);
    
    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * jobs.length);
      setCurrentJob(jobs[randomIndex]);
    }, 100);
  };

  const stopRoulette = () => {
    if (!isSpinning) return;
    
    setIsSpinning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const finalIndex = Math.floor(Math.random() * availableJobs.length);
    setCurrentJob(availableJobs[finalIndex]);
  };

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[#2a2829] p-4 rounded-lg mb-4">
      <div className="text-center max-w-sm mx-auto w-24 mb-8">
          {currentJob && (
            <>
              <Image
                src={currentJob.icon}
                alt={currentJob.label}
                width={100}
                height={100}
                className="w-24 h-24 object-contain"
                unoptimized
              />
              <span className="text-[#fff] text-lg">{currentJob.label}</span>
            </>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={startRoulette}
            disabled={isSpinning || availableJobs.length === 0}
            className={`px-4 py-2 rounded transition-colors ${
              isSpinning || availableJobs.length === 0
                ? 'bg-[#3a3534] text-gray-500'
                : 'bg-[#594731] text-[#b89249] hover:bg-[#6a563b]'
            }`}
          >
            START
          </button>
          <button
            onClick={stopRoulette}
            disabled={!isSpinning}
            className={`px-4 py-2 rounded transition-colors ${
              !isSpinning
                ? 'bg-[#3a3534] text-gray-500'
                : 'bg-[#2c2928] text-[#b89249] hover:bg-[#3a3534]'
            }`}
          >
            STOP
          </button>
        </div>
    </div>
  );
} 