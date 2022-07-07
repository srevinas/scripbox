export class Product{
    constructor(
        
        public productName: string,
        public imageUrl: string,
        public productDescription: string, 
        public manufacturer: string,
        public productPrice: number,
        public productQuantity: number,
        public isSelected =false,
        public count: number =0) {}
}