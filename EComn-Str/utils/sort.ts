export const sortProducts = (products: any[], type: string) => {
  switch (type) {
    case 'rating-desc':
      return [...products].sort((a, b) => b.rating - a.rating)
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price)
    default:
      return products
  }
}
