import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { StatusPill } from '@/app/components/StatusPill';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl tracking-tight">Referral Flow</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A referral experience that increases booking rates by making the handoff feel like
          continuity of care, not a cold start!
          {/* <br />
          Designed for older patients: no app download, no account creation, works from SMS. */}
        </p>
      </div>

      {/* Goal */}
      <Card>
        <CardHeader>
          <CardTitle>What we're trying to improve</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Increase Referral → Booked conversion</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Reduce time-to-book</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Preserve context so patients don't repeat themselves</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Give referrers visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Prevent "blind referrals" for receiving practitioners</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Core Idea */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">What breaks today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <XCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Patients delay or forget (41% never book)</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Booking often feels complicated</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Patients don't trust the new provider yet</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Receiving practitioner lacks context</span>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>Referrer has no visibility after sending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">What we changed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>A referral link that opens instantly in the browser (no login)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>3-step booking designed for low tech confidence</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>A "warm handoff" message from the referrer</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>A referral packet for the receiver (context + preferences)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Live status tracking + loop closure after visit</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Principle */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-6 text-center">
          <p className="text-lg">
            <strong>Key principle:</strong> Reduce friction + increase trust + preserve context +
            close the loop
          </p>
        </CardContent>
      </Card>

      {/* Design Constraints */}
      <Card>
        <CardHeader>
          <CardTitle>Design constraints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <StatusPill status="privacySafe" />
              <span>No app download</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="privacySafe" />
              <span>No account creation</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="privacySafe" />
              <span>Mobile-first, large text, big buttons</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="privacySafe" />
              <span>Always offer "Call to book"</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="privacySafe" />
              <span>Share only what's needed (privacy-safe)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Metrics we track</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Primary</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">Referral → Booked rate</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">Median time-to-book</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Secondary</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">Link opened rate</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">Booking completion rate</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">No-show rate</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">Loop closure rate</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Buttons */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Button size="lg" className="w-full" onClick={() => navigate('/referrer')}>
          Start demo (Referrer flow)
          <ArrowRight className="size-4 ml-2" />
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/patient')}>
          Jump to Patient flow
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/receiver')}>
          Jump to Receiver view
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/tracking')}>
          View tracking dashboard
        </Button>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-600 pt-8 border-t">
        <p>
          🔒 Privacy-safe design: Only essential referral context is shared. Patients don't need
          accounts or passwords.
        </p>
      </div>
    </div>
  );
};

export default OverviewPage;
