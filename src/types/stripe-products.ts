export interface StripeProducts {
    name?: string | undefined;
    description?: string | null | undefined;
    images?: ImageMap | undefined;
    unit_amount: number;
    currency: string;
    product: string;
    priceID: string;
}

export interface StripeProductDetailed {
    unit_amount: number;
    currency: string;
    product: string;
}

export interface StripeProductBasic {
    name: string;
    description: string | null;
    images: ImageMap;
}

type ImageMap = { [imageName: string]: string };
