export interface Service {
  id: number;
  name: string;
  type: 'hosting' | 'domain' | 'other';
  category: string;
  expirationDate: string;
  description?: string;
}