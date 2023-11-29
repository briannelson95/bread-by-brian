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
    function addToCart(product, quantity) {
        setCartProducts((prevProducts: any) => {
            const existingProductIndex = prevProducts.findIndex(
                (p: any) => p.id === product.id
            );
    
            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update the quantity
                const updatedProducts = [...prevProducts];
                console.log('Quantity:', updatedProducts[existingProductIndex].quantity)
                updatedProducts[existingProductIndex].quantity += quantity;
                saveCartProductsToLocalStorage(updatedProducts);
                return updatedProducts;
            } else {
                // If the product is not in the cart, add it with the given quantity
                const cartProduct = { ...product, quantity };
                const newProducts = [...prevProducts, cartProduct];
                saveCartProductsToLocalStorage(newProducts);
                return newProducts;
            }
        });
    }

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
                    addToCart, clearCart, removeCartProduct, 
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}
