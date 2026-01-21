import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { StatusPill } from '@/app/components/StatusPill';
import { toast } from 'sonner';
import { useReferrals } from '@/app/context/ReferralContext';
import { Paperclip } from 'lucide-react';

const ReferrerPage: React.FC = () => {
  const { addReferral } = useReferrals();
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    preferredContact: 'sms' as 'sms' | 'email' | 'phone',
    referralReason: '',
    urgency: 'routine' as 'routine' | 'soon' | 'asap',
    provider: '',
    summary: '',
    tried: [] as string[],
    goal: '',
    preferredTimes: [] as string[],
    telehealthOk: true,
    location: '',
    accessibility: [] as string[],
  });

  const handleSendSMS = () => {
    const newReferral = {
      id: Date.now().toString(),
      ...formData,
      attachments: [],
      status: 'sent' as const,
      createdAt: new Date()
    };
    
    addReferral(newReferral);
    toast.success(`SMS sent to ${formData.patientName}`);
    
    // Reset form
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      preferredContact: 'sms',
      referralReason: '',
      urgency: 'routine',
      provider: '',
      summary: '',
      tried: [],
      goal: '',
      preferredTimes: [],
      telehealthOk: true,
      location: '',
      accessibility: [],
    });
  };

  const handleTriedChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tried: checked 
        ? [...prev.tried, value]
        : prev.tried.filter(t => t !== value)
    }));
  };

  const handleTimeChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredTimes: checked
        ? [...prev.preferredTimes, value]
        : prev.preferredTimes.filter(t => t !== value)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Create a Referral</h1>
        <p className="text-gray-600">
          Send a referral that is easy for patients to act on and keeps you in the loop.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Patient full name</Label>
                <Input
                  id="name"
                  placeholder="Rihanna Goli"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Use the name the patient recognizes.</p>
              </div>

              <div>
                <Label htmlFor="phone">Phone number (for SMS booking link)</Label>
                <Input
                  id="phone"
                  placeholder="0402 240 994"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">We'll send a secure booking link by SMS.</p>
              </div>

              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  placeholder="rey.goli8@gmail.com"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Useful if SMS fails or patient prefers email.</p>
              </div>

              <div>
                <Label>Preferred contact method</Label>
                <RadioGroup
                  value={formData.preferredContact}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredContact: value as any })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="sms" />
                    <Label htmlFor="sms" className="cursor-pointer">SMS (recommended)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-radio" />
                    <Label htmlFor="email-radio" className="cursor-pointer">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone-radio" />
                    <Label htmlFor="phone-radio" className="cursor-pointer">Phone call</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-2">No app. No login. Works on any phone.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason">Referral reason</Label>
                <Select value={formData.referralReason} onValueChange={(value) => setFormData({ ...formData, referralReason: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose the main reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Back pain">Back pain</SelectItem>
                    <SelectItem value="Knee pain">Knee pain</SelectItem>
                    <SelectItem value="Shoulder pain">Shoulder pain</SelectItem>
                    <SelectItem value="Post-surgery rehab">Post-surgery rehab</SelectItem>
                    <SelectItem value="Diabetes nutrition">Diabetes nutrition</SelectItem>
                    <SelectItem value="Weight management">Weight management</SelectItem>
                    <SelectItem value="Anxiety / stress support">Anxiety / stress support</SelectItem>
                    <SelectItem value="Chronic pain management">Chronic pain management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Urgency</Label>
                <RadioGroup
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value as any })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="routine" id="routine" />
                    <Label htmlFor="routine" className="cursor-pointer">Routine (next available)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soon" id="soon" />
                    <Label htmlFor="soon" className="cursor-pointer">Soon (1–2 weeks)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap" className="cursor-pointer">ASAP (urgent)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="provider">Recommended provider / clinic</Label>
                <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bright Physio — Alex Johnson">Bright Physio — Alex Johnson</SelectItem>
                    <SelectItem value="Bright Physio — Olivia Taylor">Bright Physio — Olivia Taylor</SelectItem>
                    <SelectItem value="Nourish Dietetics — Emma Davis">Nourish Dietetics — Emma Davis</SelectItem>
                    <SelectItem value="Calm Psychology — Daniel Miller">Calm Psychology — Daniel Miller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context (keeps continuity of care)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="summary">Brief summary (1–2 lines)</Label>
                <Textarea
                  id="summary"
                  placeholder="3 weeks worsening lower back pain, worse after walking. No red flags."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Keep it short. This prevents the patient starting from scratch.</p>
              </div>

              <div>
                <Label>What has been tried already?</Label>
                <div className="space-y-2 mt-2">
                  {['Rest / activity modification', 'Pain relief medication', 'Heat/ice', 'Exercises', 'Imaging (MRI/X-ray)', 'Previous physio', 'Other'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={item}
                        checked={formData.tried.includes(item)}
                        onCheckedChange={(checked) => handleTriedChange(item, checked as boolean)}
                      />
                      <Label htmlFor={item} className="cursor-pointer">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="goal">Goal of referral</Label>
                <Input
                  id="goal"
                  placeholder="Reduce pain + improve walking tolerance"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient preferences (reduces drop-off)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Preferred appointment times</Label>
                <div className="space-y-2 mt-2">
                  {['Morning', 'Afternoon', 'Evenings', 'Any'].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.preferredTimes.includes(time)}
                        onCheckedChange={(checked) => handleTimeChange(time, checked as boolean)}
                      />
                      <Label htmlFor={time} className="cursor-pointer">{time}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="telehealth">Telehealth acceptable?</Label>
                <Switch
                  id="telehealth"
                  checked={formData.telehealthOk}
                  onCheckedChange={(checked) => setFormData({ ...formData, telehealthOk: checked })}
                />
              </div>

              <div>
                <Label htmlFor="location">Location preference (optional)</Label>
                <Input
                  id="location"
                  placeholder="Near Carlton / within 20 mins drive"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attachments (optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Paperclip className="size-4 mr-2" />
                Attach document
              </Button>
              <p className="text-xs text-gray-500 mt-2">PDF only, max 5MB.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient view preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg space-y-2 text-sm">
                <p><strong>From:</strong> Dr. Emily Carter</p>
                <p><strong>To:</strong> {formData.provider || 'Provider not selected'}</p>
                <p><strong>Reason:</strong> {formData.referralReason || 'Not specified'} ({formData.urgency})</p>
                <div className="pt-2 border-t border-blue-200">
                  <p className="italic text-gray-700">
                    "Hi {formData.patientName || '[Patient]'}, I'm referring you to {formData.provider?.split('—')[0]?.trim() || 'a specialist'}. They already have your details so you won't need to repeat everything."
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={handleSendSMS}>
                  Send SMS booking link
                </Button>
                <Button variant="outline" className="w-full">
                  Send email link
                </Button>
                <Button variant="outline" className="w-full">
                  Print referral slip (QR code)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <StatusPill status="created" />
                  <span className="text-gray-600">Created</span>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <StatusPill status="sent" />
                  <span className="text-gray-600">SMS sent</span>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <StatusPill status="opened" />
                  <span className="text-gray-600">Link opened</span>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <StatusPill status="started" />
                  <span className="text-gray-600">Booking started</span>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <StatusPill status="booked" />
                  <span className="text-gray-600">Appointment booked</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                We'll update this automatically as the patient progresses.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReferrerPage;
