
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string | null;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}

export interface Branch {
    idDto?: string;
    codeDto?: number;
    descriptionDto?: string;
    company?: string;
    addressDto?: string;
    identificationDto?: string;
    creationDateDto?: Date;
    idCurrencyDto?: string;
    currencyDescriptionDto?: string;
}