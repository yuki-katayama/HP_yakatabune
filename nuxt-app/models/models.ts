export type rideMethod = "together" | "chartered" | "both";

export interface Company {
  id: number;
  imgUrl: string;
  name: string;
  area: string;
  rideMethod: rideMethod;
  price: number;
  option?: {};
}

export interface CompanyToTag {
  companyId: number;
  tagId: number;
}

export interface Tag {
  id: number;
  type: string;
  name: string;
}

export interface SearchInput {
  date: Date;
  chartered: boolean;
  area: string[];
  budget: {
    min: number;
    max: number;
  };
  payment: "transfer" | "credit"[];
  other: string[];
}

export interface Event {
  target: {
    checked: boolean;
  };
}
