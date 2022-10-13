export interface BasicProductData {
    img: string;
    name: string;
    price: number;
    id?: string;
}

type ImageMap = { [imageName: string]: string };

export interface DetailedProductData {
    id: string;
    img?: ImageMap | undefined;
    name?: string | undefined;
    price?: number | undefined;
    amenities?:
        | {
              tv: boolean;
              ac: boolean;
          }
        | undefined;
    desc?: string | undefined;
    qty?: number | undefined;
}
