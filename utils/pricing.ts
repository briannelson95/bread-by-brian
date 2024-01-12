export const calculateTotalPriceWithDiscount = (price: number, quantity: number, title: string) => {
    // Check if the product is "Cinnamon Rolls" and quantity is a multiple of 4
    if (title === 'Cinnamon Rolls' && quantity >= 4) {
        const discountedSets = Math.floor(quantity / 4); // Calculate the number of discounted sets
        const regularItems = quantity % 4; // Calculate the remaining regular items
        const discountedPrice = discountedSets * 6; // Total price for discounted sets
        const regularPrice = regularItems * price; // Total price for remaining regular items
    
        return discountedPrice + regularPrice;
    }
  
    // If no discount applies, calculate the regular total price
    return price * quantity;
};
  