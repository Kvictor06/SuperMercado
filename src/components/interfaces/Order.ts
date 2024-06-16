interface Order {
    id: string;
    userId: string;
    products: Product[];
    totalAmount: number;
}