export interface OrderRequest {
    orderDetails: OrderDetailRequest[];
}

export interface OrderDetailRequest {
    flowerBouquetId: number;
    quantity: number;
    discount: number;
}
