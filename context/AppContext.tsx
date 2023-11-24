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
    function addToCart(product) {
        console.log(product)
        setCartProducts((prevProducts: any) => {
            const cartProduct = {...product}
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        })
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
                    addToCart, clearCart, removeCartProduct
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}
