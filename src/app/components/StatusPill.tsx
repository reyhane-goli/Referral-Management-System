import React from 'react';
import { cn } from '@/app/components/ui/utils';

interface StatusPillProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { emoji: string; label: string; color: string }> = {
  created: { emoji: '✅', label: 'Created', color: 'bg-gray-100 text-gray-700' },
  sent: { emoji: '📩', label: 'SMS sent', color: 'bg-blue-100 text-blue-700' },
  opened: { emoji: '👀', label: 'Link opened', color: 'bg-purple-100 text-purple-700' },
  started: { emoji: '⏳', label: 'Booking started', color: 'bg-yellow-100 text-yellow-700' },
  booked: { emoji: '✅', label: 'Booked', color: 'bg-green-100 text-green-700' },
  viewed: { emoji: '✅', label: 'Receiver viewed', color: 'bg-teal-100 text-teal-700' },
  completed: { emoji: '✅', label: 'Visit completed', color: 'bg-indigo-100 text-indigo-700' },
  closed: { emoji: '✅', label: 'Loop closed', color: 'bg-emerald-100 text-emerald-700' },
  notBooked: { emoji: '⚠️', label: 'Not booked', color: 'bg-red-100 text-red-700' },
  privacySafe: { emoji: '🔒', label: 'Privacy safe', color: 'bg-gray-100 text-gray-700' }
};

export const StatusPill: React.FC<StatusPillProps> = ({ status, className }) => {
  const config = statusConfig[status] || statusConfig.created;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
        config.color,
        className
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};
