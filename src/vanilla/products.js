async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }
    return response.json()
}

function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "product-card"

    card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <h3 class="product-title">${product.title}</h3>
    <p class="product-price">$${product.price.toFixed(2)}</p>
    <button class="btn-add-cart" data-product-id="${
        product.id
    }">Add to cart</button>
  `

    const button = card.querySelector(".btn-add-cart")
    button?.addEventListener("click", () => {
        const event = new CustomEvent("addToCart", {detail: product})
        window.dispatchEvent(event)
    })

    return card
}

function createLoadingSpinner() {
    const loading = document.createElement("div")
    loading.className = "loading"
    loading.innerHTML = '<div class="loading-spinner"></div>'
    return loading
}

export async function initializeProducts(containerId) {
    const container = document.getElementById(containerId)
    if (!container) {
        console.error("Products container not found")
        return
    }

    const section = document.createElement("section")
    section.className = "products-section"

    const heading = document.createElement("h2")
    heading.textContent = "Products"
    section.appendChild(heading)

    const grid = document.createElement("div")
    grid.className = "products-grid"

    const loading = createLoadingSpinner()
    section.appendChild(loading)

    container.appendChild(section)

    try {
        const products = await fetchProducts()

        loading.remove()

        products.forEach(product => {
            const card = createProductCard(product)
            grid.appendChild(card)
        })

        section.appendChild(grid)
    } catch (error) {
        loading.remove()
        const errorMsg = document.createElement("p")
        errorMsg.textContent = "Failed to load products. Please try again later."
        errorMsg.style.textAlign = "center"
        errorMsg.style.color = "#dc3545"
        errorMsg.style.padding = "40px"
        section.appendChild(errorMsg)
    }
}
