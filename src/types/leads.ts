export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'success' | 'lost';
  revenue?: number;
  lostReason?: string;
  createdAt: string;
}