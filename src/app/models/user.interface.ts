export interface User {
  uid: string;
  joined?: number; // Date when user registered, timestamp
  email: string;
  provider: string;
  phoneNumber?: string;
  photoURL?: string;
  displayName?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  description?: string;
  admin?: boolean;
}
