export type UserState = {
  email: string;
  name: string;
  phone: string;
  useContractRead: boolean;
  phoneVerified?: boolean;
};

export type CompanyState = {
  address: string;
  addressNumber: string;
  cnpj: string;
  companySegment: string;
  companyType: string;
  complement: string;
  corporateName: string;
  district: string;
  phone: string;
  zipCode: string;
};

export type FormState = {
  user: UserState;
  company: CompanyState;
};
