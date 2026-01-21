import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { StatusPill } from '@/app/components/StatusPill';
import { useReferrals } from '@/app/context/ReferralContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Badge } from '@/app/components/ui/badge';
import { FileText, Phone, Bell, FileCheck } from 'lucide-react';

const ReceiverPage: React.FC = () => {
  const { referrals } = useReferrals();
  const [selectedReferral, setSelectedReferral] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Incoming referrals</h1>
        <p className="text-gray-600">
          See referral context before the patient arrives — no blind handoffs.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Booking status</TableHead>
                <TableHead>Time since referral</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>{referral.patientName}</TableCell>
                  <TableCell>{referral.referralReason}</TableCell>
                  <TableCell>
                    <Badge variant={referral.urgency === 'asap' ? 'destructive' : 'outline'}>
                      {referral.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusPill status={referral.status} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {Math.floor((Date.now() - referral.createdAt.getTime()) / (1000 * 60 * 60))}h ago
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReferral(referral)}
                    >
                      Open referral packet
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedReferral} onOpenChange={() => setSelectedReferral(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Referral packet</DialogTitle>
          </DialogHeader>

          {selectedReferral && (
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-600">Patient</p>
                      <p>{selectedReferral.patientName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Referred by</p>
                      <p>Dr. Emily Carter</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Reason</p>
                      <p>{selectedReferral.referralReason}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Urgency</p>
                      <Badge variant={selectedReferral.urgency === 'asap' ? 'destructive' : 'outline'}>
                        {selectedReferral.urgency}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-600">Preferred type</p>
                      <p>{selectedReferral.telehealthOk ? 'In-person or telehealth' : 'In-person'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Preferred times</p>
                      <p>{selectedReferral.preferredTimes.join(', ') || 'Any'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Context */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Context essentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">What the patient is coming for</p>
                    <p className="bg-gray-50 p-3 rounded">"{selectedReferral.summary}"</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Tried already</p>
                    <p>{selectedReferral.tried.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Goal</p>
                    <p>{selectedReferral.goal}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              {selectedReferral.attachments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Attachments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedReferral.attachments.map((file: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="size-4 text-gray-600" />
                        <span className="text-sm">{file}</span>
                        <Button size="sm" variant="ghost" className="ml-auto">
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Booking Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedReferral.appointment ? (
                    <div className="flex items-center gap-2">
                      <StatusPill status="booked" />
                      <span className="text-sm">
                        Appointment booked for {selectedReferral.appointment.time}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <StatusPill status="notBooked" />
                      <span className="text-sm">Patient has not booked yet.</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Receiver actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="size-4 mr-2" />
                    Send gentle reminder
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="size-4 mr-2" />
                    Call patient
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="size-4 mr-2" />
                    Add internal note
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileCheck className="size-4 mr-2" />
                    Mark ready for first session
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Only send reminders when the patient hasn't booked after 48 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceiverPage;
