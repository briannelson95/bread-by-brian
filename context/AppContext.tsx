"use client"
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export default function AppProvider({ children }: { children: React.ReactNode}) {
    const [cartProducts, setCartProducts]: any = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    const [quantity, setQuantity]: any = useState(1)

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
    function addToCart(product, quantity = 1) {
        // console.log(product)
        // setCartProducts((prevProducts: any) => {
        //     const cartProduct = {...product}
        //     const newProducts = [...prevProducts, cartProduct];
        //     saveCartProductsToLocalStorage(newProducts);
        //     return {newProducts, quantity};
        // })

        setCartProducts((prevProducts: any) => {
            const existingProductIndex = prevProducts.findIndex(
                (p: any) => p.id === product.id
            );
    
            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update the quantity
                const updatedProducts = [...prevProducts];
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

    const handleAdd = (amount: number, limit: number, inventory: number,) => {
        if (amount < limit) {
            if (amount >= inventory) {
                console.log(inventory)
                return inventory
                // setAmount(inventory)
            } else {
                console.log(amount + 1)
                return amount + 1
                // setAmount(amount + 1)
            }
            
        }
    }

    const handleSubract = (amount: number) => {
        if (amount > 0) {
            console.log(amount - 1)
            return amount - 1
            // setAmount(amount - 1)
        }
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
                    cartProducts, setCartProducts, quantity, setQuantity,
                    addToCart, clearCart, removeCartProduct, handleAdd, handleSubract
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}
