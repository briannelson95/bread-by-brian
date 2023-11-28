"use client"
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export default function AppProvider({ children }: { children: React.ReactNode}) {
    const [cartProducts, setCartProducts]: any = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    // const [quantity, setQuantity]: any = useState(1)

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
          //@ts-ignore
          setCartProducts( JSON.parse( ls.getItem('cart') ) );
        }
    }, [])

    // useEffect(() => {
    //     console.log(cartProducts); // Log the updated cartProducts whenever it changes
    // }, [cartProducts]);


    function saveCartProductsToLocalStorage(cartProducts: any) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    //@ts-ignore
    function addToCart(product, quantity) {
        // console.log("Adding to cart with quantity:", quantity,);
        setCartProducts((prevProducts: any) => {
            const existingProductIndex = prevProducts.findIndex(
                (p: any) => p.id === product.id
            );
    
            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update the quantity
                const updatedProducts = [...prevProducts];
                console.log('Quantity:', updatedProducts[existingProductIndex].quantity) // this gets run 2 times which is why I think more than 1 is being added
                updatedProducts[existingProductIndex].quantity += quantity;
                // console.log(updatedProducts)
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
        // console.log(cartProducts)
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
