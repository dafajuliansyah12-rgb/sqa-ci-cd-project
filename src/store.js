
const products = [
  { id: 1, name: "Laptop", price: 7500000, stock: 5 },
  { id: 2, name: "Mouse", price: 150000, stock: 10 },
  { id: 3, name: "Keyboard", price: 350000, stock: 8 }
];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find(product => product.id === Number(id)) || null;
}

function calculateTotal(cart) {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function addToCart(cart, productId, quantity = 1) {
  const product = getProductById(productId);

  if (!product) {
    throw new Error("Produk tidak ditemukan");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Jumlah harus bilangan bulat positif");
  }

  const existingItem = cart.find(item => item.id === product.id);
  const newQuantity = (existingItem?.quantity || 0) + quantity;

  if (newQuantity > product.stock) {
    throw new Error("Stok produk tidak mencukupi");
  }

  if (existingItem) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
  }

  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    }
  ];
}

function checkout(cart) {
  if (!cart.length) {
    throw new Error("Keranjang masih kosong");
  }

  return {
    items: cart,
    total: calculateTotal(cart),
    status: "Pesanan dibuat"
  };
}

module.exports = {
  getProducts,
  getProductById,
  calculateTotal,
  addToCart,
  checkout
};
