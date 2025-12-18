import CartItem from "./CartItem.jsx"

const CartList = ({ items, onRemove }) => {
    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        )
    }

    return (
        <div className="cart-list">
            {items.map(item => (
                <CartItem key={item.id} item={item} onRemove={onRemove} />
            ))}
        </div>
    )
}

export default CartList
