import { useState, useEffect } from "react"
import CartList from "./CartList.jsx"

const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    })

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    // Listen for custom events from vanilla JS to add products
    useEffect(() => {
        const handleAddToCart = event => {
            const product = event.detail

            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === product.id)

                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }

                return [...prevItems, { ...product, quantity: 1 }]
            })
        }

        window.addEventListener("addToCart", handleAddToCart)

        return () => {
            window.removeEventListener("addToCart", handleAddToCart)
        }
    }, [])

    const removeFromCart = productId => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productId)

            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            }

            return prevItems.filter(item => item.id !== productId)
        })
    }

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <section className="cart-section">
            <h2>
                <svg
                    className="cart-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                Shopping Cart {totalQuantity > 0 && `(${totalQuantity})`}
            </h2>

            <CartList items={cartItems} onRemove={removeFromCart} />

            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <div className="cart-total">
                        <span className="cart-total-label">Total:</span>
                        <span className="cart-total-amount">${totalAmount.toFixed(2)}</span>
                    </div>
                    <button className="btn-checkout">Proceed to Checkout</button>
                </div>
            )}
        </section>
    )
}

export default Cart