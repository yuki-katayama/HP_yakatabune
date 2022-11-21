export interface Company {
	id: number;
	imgUrl: string;
	name: string;
	area: string;
	price: number;
}

export interface CompanyToTag {
	companyId: number,
	tagId: number,
}

export interface Tag {
	id: number;
	name: string;
}