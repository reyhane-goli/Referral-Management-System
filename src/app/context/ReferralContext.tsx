import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Referral {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  preferredContact: 'sms' | 'email' | 'phone';
  referralReason: string;
  urgency: 'routine' | 'soon' | 'asap';
  provider: string;
  summary: string;
  tried: string[];
  goal: string;
  preferredTimes: string[];
  telehealthOk: boolean;
  location: string;
  accessibility: string[];
  attachments: string[];
  status: 'created' | 'sent' | 'opened' | 'started' | 'booked' | 'viewed' | 'completed' | 'closed';
  createdAt: Date;
  appointment?: {
    type: 'in-person' | 'telehealth';
    time: string;
    confirmedAt: Date;
  };
  outcome?: {
    attended: boolean;
    diagnosis: string;
    plan: string;
    followUpRequired: boolean;
    urgent: boolean;
  };
}

interface ReferralContextType {
  referrals: Referral[];
  currentReferral: Referral | null;
  setCurrentReferral: (referral: Referral | null) => void;
  addReferral: (referral: Referral) => void;
  updateReferral: (id: string, updates: Partial<Referral>) => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

const mockReferrals: Referral[] = [
  {
    id: '1',
    patientName: 'Mary Thompson',
    patientPhone: '0412 345 678',
    patientEmail: 'mary.thompson@email.com',
    preferredContact: 'sms',
    referralReason: 'Back pain',
    urgency: 'soon',
    provider: 'Bright Physio — Alex Johnson',
    summary: '3 weeks worsening lower back pain, worse after walking. No red flags.',
    tried: ['Rest / activity modification', 'Pain relief medication', 'Heat/ice'],
    goal: 'Reduce pain + improve walking tolerance',
    preferredTimes: ['Morning'],
    telehealthOk: false,
    location: 'Near Carlton / within 20 mins drive',
    accessibility: [],
    attachments: ['MRI_report.pdf'],
    status: 'booked',
    createdAt: new Date('2026-01-20T10:00:00'),
    appointment: {
      type: 'in-person',
      time: 'Tomorrow 10:00 AM',
      confirmedAt: new Date('2026-01-20T10:07:00')
    }
  },
  {
    id: '2',
    patientName: 'John Smith',
    patientPhone: '0423 456 789',
    patientEmail: '',
    preferredContact: 'sms',
    referralReason: 'Anxiety / stress support',
    urgency: 'routine',
    provider: 'Calm Psychology — Daniel Miller',
    summary: 'Persistent anxiety affecting work performance. Sleep disturbances.',
    tried: ['Mindfulness apps', 'Exercise'],
    goal: 'Better coping strategies and improved sleep',
    preferredTimes: ['Evening'],
    telehealthOk: true,
    location: '',
    accessibility: [],
    attachments: [],
    status: 'sent',
    createdAt: new Date('2026-01-19T14:00:00')
  }
];

export const ReferralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [currentReferral, setCurrentReferral] = useState<Referral | null>(null);

  const addReferral = (referral: Referral) => {
    setReferrals((prev) => [...prev, referral]);
  };

  const updateReferral = (id: string, updates: Partial<Referral>) => {
    setReferrals((prev) =>
      prev.map((ref) => (ref.id === id ? { ...ref, ...updates } : ref))
    );
  };

  return (
    <ReferralContext.Provider
      value={{ referrals, currentReferral, setCurrentReferral, addReferral, updateReferral }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferrals = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferrals must be used within a ReferralProvider');
  }
  return context;
};
