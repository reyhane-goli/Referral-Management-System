import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { StatusPill } from '@/app/components/StatusPill';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { TrendingUp, Clock, CheckCircle2, Users } from 'lucide-react';

const TrackingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl mb-2">Referral tracking & outcomes</h1>
        <p className="text-gray-600">
          Visibility for referrers, clarity for receivers, and fewer drop-offs for patients.
        </p>
      </div>

      {/* Metrics Dashboard */}
      <div>
        <h2 className="text-2xl mb-4">Conversion metrics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Referral → Booked rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl">75%</div>
                <div className="flex items-center text-sm text-green-600 mb-1">
                  <TrendingUp className="size-4 mr-1" />
                  <span>+16%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Previous: 59%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Median time-to-book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl">1.1</div>
                <div className="text-xl text-gray-600">days</div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Previous: 3.0 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Link opened rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">89%</div>
              <p className="text-xs text-gray-500 mt-1">Previous: 72%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Booking completion rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">84%</div>
              <p className="text-xs text-gray-500 mt-1">Previous: 68%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">No-show rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">8%</div>
              <p className="text-xs text-gray-500 mt-1">Previous: 15%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Loop closure rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">92%</div>
              <p className="text-xs text-gray-500 mt-1">Previous: 34%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Referral Timeline Example */}
      <Card>
        <CardHeader>
          <CardTitle>Referral timeline</CardTitle>
          <p className="text-sm text-gray-600">Example: Mary Thompson</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '10:00', status: 'created', label: 'Created' },
              { time: '10:01', status: 'sent', label: 'SMS sent' },
              { time: '10:05', status: 'opened', label: 'Link opened' },
              { time: '10:06', status: 'started', label: 'Booking started' },
              { time: '10:07', status: 'booked', label: 'Appointment booked' },
              { time: '10:08', status: 'viewed', label: 'Receiver viewed packet' },
              { time: 'Tomorrow', status: 'completed', label: 'Visit completed', future: true },
              { time: 'Tomorrow', status: 'closed', label: 'Loop closed', future: true }
            ].map((event, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">{event.time}</div>
                <div className="flex-1 flex items-center gap-2">
                  <StatusPill status={event.status} />
                  <span className={`text-sm ${event.future ? 'text-gray-400' : 'text-gray-900'}`}>
                    {event.label}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drop-off Reduction */}
      <Card>
        <CardHeader>
          <CardTitle>Where drop-off is reduced</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drop-off point</TableHead>
                <TableHead>What used to happen</TableHead>
                <TableHead>What happens now</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Patient forgets</TableCell>
                <TableCell className="text-gray-600">no follow-up</TableCell>
                <TableCell className="text-green-700">reminder SMS triggered at 24h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Booking too hard</TableCell>
                <TableCell className="text-gray-600">login + long forms</TableCell>
                <TableCell className="text-green-700">3-step booking, no login</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Low trust</TableCell>
                <TableCell className="text-gray-600">cold handoff</TableCell>
                <TableCell className="text-green-700">"referred by your GP" trust cue</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Receiver blind</TableCell>
                <TableCell className="text-gray-600">no context</TableCell>
                <TableCell className="text-green-700">referral packet with essentials</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Referrer in the dark</TableCell>
                <TableCell className="text-gray-600">no updates</TableCell>
                <TableCell className="text-green-700">timeline + outcome note</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Success Metric */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-6 text-center">
          <p className="text-lg">
            Success is measured by bookings and continuity, not just tracking!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingPage;
