export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'success' | 'lost';
  createdAt: string;
  revenue?: number;
  lostReason?: string;
}