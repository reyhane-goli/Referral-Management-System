import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CheckCircle2, Phone, Calendar } from 'lucide-react';

const PatientPage: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'type' | 'time' | 'confirm' | 'confirmed'>('landing');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  if (step === 'landing') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl">Book your appointment</h1>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle2 className="size-5" />
                <span>You were referred by Dr. Emily Carter</span>
              </div>
              <p className="text-sm text-green-700">
                Your provider already has your referral notes — you won't need to repeat everything.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="w-full text-lg py-6" onClick={() => setStep('type')}>
              Book appointment
            </Button>
            <Button size="lg" variant="outline" className="w-full text-lg py-6">
              <Phone className="size-5 mr-2" />
              Call to book
            </Button>
            <p className="text-sm text-gray-600">
              Prefer to speak to someone? Call us and we'll book for you.
            </p>
          </div>

          <div className="pt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Your referral is private and secure.</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'type') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl text-center">How would you like your appointment?</h1>
          
          <div className="grid gap-4">
            <Button
              size="lg"
              variant={selectedType === 'in-person' ? 'default' : 'outline'}
              className="w-full text-lg py-8"
              onClick={() => {
                setSelectedType('in-person');
                setStep('time');
              }}
            >
              In-person
            </Button>
            <Button
              size="lg"
              variant={selectedType === 'telehealth' ? 'default' : 'outline'}
              className="w-full text-lg py-8"
              onClick={() => {
                setSelectedType('telehealth');
                setStep('time');
              }}
            >
              Telehealth
            </Button>
            <Button
              size="lg"
              variant={selectedType === 'any' ? 'default' : 'outline'}
              className="w-full text-lg py-8"
              onClick={() => {
                setSelectedType('any');
                setStep('time');
              }}
            >
              First available
            </Button>
          </div>

          <div className="pt-4 text-center">
            <Button variant="ghost" onClick={() => setStep('landing')}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'time') {
    const times = [
      'Tomorrow — 10:00 AM',
      'Tomorrow — 2:30 PM',
      'Friday — 11:00 AM',
      'Friday — 3:00 PM',
      'Monday — 9:00 AM'
    ];

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl text-center">Choose a time</h1>
          
          <p className="text-sm text-gray-600 text-center">
            These times match your referral urgency and preferences.
          </p>

          <div className="grid gap-3">
            {times.map((time) => (
              <Button
                key={time}
                size="lg"
                variant={selectedTime === time ? 'default' : 'outline'}
                className="w-full text-lg py-6"
                onClick={() => {
                  setSelectedTime(time);
                  setStep('confirm');
                }}
              >
                {time}
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button variant="link">Show more times</Button>
          </div>

          <div className="pt-4 text-center">
            <Button variant="ghost" onClick={() => setStep('type')}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl text-center">Confirm booking</h1>
          
          <Card>
            <CardContent className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Patient</p>
                <p>Rihanna Goli</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p>Alex Johnson</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p>{selectedTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="capitalize">{selectedType === 'any' ? 'In-person' : selectedType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p>Bright Physio — Carlton</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button size="lg" className="w-full text-lg py-6" onClick={() => setStep('confirmed')}>
              Confirm booking
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => setStep('time')}>
              Change time
            </Button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            You'll receive a reminder 24 hours before.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'confirmed') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="size-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl">Booking confirmed</h1>
            <p className="text-lg text-gray-600">
              Your appointment is booked.<br />
              Your clinician already has your referral notes.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-600">Appointment</p>
                <p>{selectedTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p>Alex Johnson at Bright Physio — Carlton</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button size="lg" variant="outline" className="w-full">
              <Calendar className="size-5 mr-2" />
              Add to calendar
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Reschedule
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              <Phone className="size-5 mr-2" />
              Call clinic
            </Button>
          </div>

          <div className="pt-6 text-sm text-gray-600">
            Need help? Call (0x) xxxx xxxx
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PatientPage;
