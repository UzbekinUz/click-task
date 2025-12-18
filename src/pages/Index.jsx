import { useEffect } from 'react';
import Cart from '../components/cart/Cart';
import { initializeProducts } from '../vanilla/products';

const Index = () => {
    useEffect(() => {
        // Initialize vanilla JS products after component mounts
        initializeProducts('products-container');
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Mini Marketplace</h1>
                <p>Discover amazing products at great prices</p>
            </header>

            <main className="main-layout">
                <div id="products-container"></div>

                <Cart />
            </main>
        </div>
    );
};

export default Index;
