export interface BasicProductData {
    img: string;
    name: string;
    price: number;
    id: string;
}

type ImageMap = { [imageName: string]: string };

export interface DetailedProductData {
    img: ImageMap;
    name: string;
    price: number;
    amenities: {
        tv: boolean;
        ac: boolean;
    };
    desc: string;
    id: string;
    qty: number;
}
