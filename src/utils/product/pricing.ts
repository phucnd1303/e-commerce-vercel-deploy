export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculateDiscountPercentage(
  originalPrice: number,
  currentPrice: number
): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
