export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  companyId: string;
  roles: string | string[];
}
