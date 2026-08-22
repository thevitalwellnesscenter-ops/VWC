// Synthetic demo data shown until a Medplum project is connected.
// Never put real patient information in this file.

export interface SampleAppointment {
  time: string;
  patient: string;
  visitType: string;
  provider: string;
  room: string;
  status: 'scheduled' | 'arrived' | 'in-room' | 'checkout';
}

export const todaysAppointments: SampleAppointment[] = [
  { time: '08:00', patient: 'Jordan Rivera', visitType: 'Annual physical', provider: 'Dr. Chen', room: 'Exam 1', status: 'checkout' },
  { time: '08:30', patient: 'Sam Okafor', visitType: 'Follow-up', provider: 'Dr. Chen', room: 'Exam 2', status: 'in-room' },
  { time: '09:00', patient: 'Priya Natarajan', visitType: 'IV therapy', provider: 'Nurse Diaz', room: 'Infusion A', status: 'in-room' },
  { time: '09:15', patient: 'Alex Fontaine', visitType: 'New patient', provider: 'Dr. Chen', room: '—', status: 'arrived' },
  { time: '09:30', patient: 'Morgan Lee', visitType: 'Telehealth check-in', provider: 'Dr. Whitfield', room: 'Virtual', status: 'scheduled' },
];

export interface SampleInvoice {
  patient: string;
  description: string;
  amount: number;
  method: 'insurance' | 'cash' | 'membership';
  status: 'draft' | 'submitted' | 'paid' | 'denied';
}

export const openInvoices: SampleInvoice[] = [
  { patient: 'Jordan Rivera', description: '99396 Preventive visit', amount: 285, method: 'insurance', status: 'submitted' },
  { patient: 'Priya Natarajan', description: 'IV therapy — Myers pack (3 of 6)', amount: 0, method: 'membership', status: 'paid' },
  { patient: 'Sam Okafor', description: '99213 Established patient', amount: 145, method: 'insurance', status: 'draft' },
  { patient: 'Alex Fontaine', description: 'New patient consult (self-pay)', amount: 220, method: 'cash', status: 'paid' },
];

export interface SampleMetric {
  name: string;
  value: string;
  target: string;
  module: string;
}

export const practiceMetrics: SampleMetric[] = [
  { name: 'Clean-claim rate', value: '96.4%', target: '≥ 98%', module: 'VO-REV' },
  { name: 'Days in A/R', value: '27', target: '< 25', module: 'VO-REV' },
  { name: 'No-show rate', value: '6.1%', target: '< 5%', module: 'VO-FLOW' },
  { name: 'Avg patient wait', value: '11 min', target: '< 10 min', module: 'VO-FLOW' },
  { name: 'Docs time per visit', value: '4.2 min', target: '< 3 min', module: 'VO-CLIN' },
];
