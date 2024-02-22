import { Image } from './image-interface';
export interface Api{
    total: number ,
    totalHits: number,
    hits: Image[]
}