const CartItem = ({ item, onRemove }) => {
    return (
        <div className="cart-item">
            <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
            />
            <div className="cart-item-details">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <div className="cart-item-quantity">
                    <span className="quantity-badge">Qty: {item.quantity}</span>
                </div>
            </div>
            <button
                className="btn-remove"
                onClick={() => onRemove(item.id)}
                aria-label="Remove item"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                </svg>
            </button>
        </div>
    );
};

export default CartItem;