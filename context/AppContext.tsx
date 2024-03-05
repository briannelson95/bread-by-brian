"use client"
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export default function AppProvider({ children }: { children: React.ReactNode}) {
    const [cartProducts, setCartProducts]: any = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
          //@ts-ignore
          setCartProducts( JSON.parse( ls.getItem('cart') ) );
        }
    }, [])

    function saveCartProductsToLocalStorage(cartProducts: any) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    //@ts-ignore
    function addToCart(product, quantity, options?: any, /*total: number*/) {
        setCartProducts((prevProducts: any) => {
            const existingProductIndex = prevProducts.findIndex(
                (p: any) => p.id === product.id
            );
      
            let newQuantity = quantity;
            if (existingProductIndex !== -1) {
                newQuantity = prevProducts[existingProductIndex].quantity + quantity;
            }

            if (
                newQuantity <= product.limit &&
                newQuantity <= product.inventory
            ) {
                const updatedProducts = [...prevProducts];
    
                if (existingProductIndex !== -1) {
                    updatedProducts[existingProductIndex] = {
                        ...prevProducts[existingProductIndex],
                        quantity: newQuantity,
                        // total
                    };
                } else {
                    // Validate options and include them in the cart
                    if (typeof options === 'string' && options.length > 0) {
                        updatedProducts.push({
                            ...product,
                            quantity: newQuantity,
                            options: options,
                            // total
                        });
                    } else {
                        // Show error message for invalid options
                        updatedProducts.push({
                            ...product,
                            quantity: newQuantity,
                            options: null,
                            // total
                        });
                    }
                }
    
                // Save updated products to local storage
                saveCartProductsToLocalStorage(updatedProducts);
    
                // Show success message
                toast('Added to cart', {
                    icon: '🍞👍',
                });
    
                return updatedProducts;
            } else {
                // Show error message for exceeding limits
                toast.error('Exceeds limit per customer or inventory.');
                return prevProducts;
            }
        });
    }
      
      
      

    const updateQuantity = (productId: any, newQuantity: number, limitPerCustomer: number, inventory: number) => {
        
        const validLimit = !isNaN(limitPerCustomer) ? limitPerCustomer : Infinity;
        const validInventory = !isNaN(inventory) ? inventory : Infinity;
        const updatedQuantity = Math.min(newQuantity, validLimit, validInventory);
        
        setCartProducts((prevProducts: any) =>
            prevProducts.map((product: any) =>
                product.id === productId ? { ...product, quantity: updatedQuantity } : product
            )
        );
    };

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    };

    function removeCartProduct(index: number) {
        setCartProducts((prevCartProducts: any) => {
            const newCartProducts = prevCartProducts
                .filter((v: any, i: number) => i !== index);

            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts;
        });

        toast.success("Removed Product")
    }

    return (
        <>
            <CartContext.Provider 
                value={{
                    cartProducts, setCartProducts,
                    addToCart, clearCart, removeCartProduct, updateQuantity,
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}
