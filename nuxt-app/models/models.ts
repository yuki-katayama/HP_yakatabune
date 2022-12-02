export type rideMethod = "together" | "chartered" | "both";
export type seatType = "座席";
export type toiletType = "洋式" | "和式";

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

export interface CompanyToPlan {
  companyId: number;
  planId: number;
}

export interface Tag {
  id: number;
  type: string;
  name: string;
}

export interface Plan {
  id: number;
  name: string;
  content: string;
  requiredTime: Date;
  departureTime: Date;
  appearance: string;
  seat: seatType;
  deck: boolean;
  wifi: boolean;
  allergySupport: boolean;
  toilet: toiletType;
  imagePath: string;
  cuisine: {
    explain: string;
    imagePath: string;
  };
  tourCourse: string;
  price: {
    adult: number;
    middle: number;
    elementary: number;
    baby: number;
  };
  place: string;
  notes: string;
}

export interface SearchInput {
  date: Date;
  chartered: boolean;
  options: {
    tagIdList: number[];
    budget: {
      min: number;
      max?: number;
    };
  };
}

export interface Reserve {
  date: Date;
  num: {
    adult: number;
    middle: number;
    elementary: number;
    baby: number;
  };
}

// export interface Calendar {
//   day: number;
//   month: number;
//   year: number;
// }
