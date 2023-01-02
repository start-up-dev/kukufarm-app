export interface IapProduct {
  description: string;
  name: string;
  oneTimePurchaseOfferDetails: IOneTimePurchaseOfferDetails;
  productId: string;
  productType: string;
  title: string;
}

export interface IOneTimePurchaseOfferDetails {
  formattedPrice: string;
  priceAmountMicros: number;
  priceCurrencyCode: string;
}
