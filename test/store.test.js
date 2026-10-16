
const {
  getProducts,
  getProductById,
  calculateTotal,
  addToCart,
  checkout
} = require("../src/store");

describe("Pengujian Sistem Toko Online", () => {
  test("TC-001: menampilkan daftar produk", () => {
    expect(getProducts().length).toBe(3);
  });

  test("TC-002: produk memiliki nama dan harga", () => {
    expect(getProducts()[0]).toHaveProperty("name");
    expect(getProducts()[0].price).toBeGreaterThan(0);
  });

  test("TC-003: mencari produk berdasarkan ID", () => {
    expect(getProductById(1).name).toBe("Laptop");
  });

  test("TC-004: ID produk tidak ditemukan", () => {
    expect(getProductById(99)).toBeNull();
  });

  test("TC-005: menghitung total belanja", () => {
    expect(calculateTotal([
      { price: 10000, quantity: 2 },
      { price: 5000, quantity: 1 }
    ])).toBe(25000);
  });

  test("TC-006: menambahkan produk ke keranjang", () => {
    const cart = addToCart([], 2, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe("Mouse");
  });

  test("TC-007: menambahkan jumlah produk yang sama", () => {
    const cart = addToCart([{ id: 2, name: "Mouse", price: 150000, quantity: 1 }], 2, 2);
    expect(cart[0].quantity).toBe(3);
  });

  test("TC-008: menolak jumlah nol", () => {
    expect(() => addToCart([], 1, 0)).toThrow(
      "Jumlah harus bilangan bulat positif"
    );
  });

  test("TC-009: menolak jumlah melebihi stok", () => {
    expect(() => addToCart([], 1, 6)).toThrow(
      "Stok produk tidak mencukupi"
    );
  });

  test("TC-010: checkout menghasilkan pesanan", () => {
    const result = checkout([
      { id: 2, name: "Mouse", price: 150000, quantity: 2 }
    ]);
    expect(result.total).toBe(300000);
    expect(result.status).toBe("Pesanan dibuat");
  });

  test("TC-011: menolak checkout keranjang kosong", () => {
    expect(() => checkout([])).toThrow("Keranjang masih kosong");
  });

  test("TC-012: menolak produk yang tidak tersedia", () => {
    expect(() => addToCart([], 99, 1)).toThrow(
      "Produk tidak ditemukan"
    );
  });
});
