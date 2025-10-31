// models/drink.ts
export interface Drink {
  id: number;
  name: string;
  status: 'none' | 'accepted' | 'rejected' | 'purchased';
}
