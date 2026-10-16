
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");
});

test("E2E-001: halaman toko tampil", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "SQA Store" })).toBeVisible();
});

test("E2E-002: produk tersedia untuk dipilih", async ({ page }) => {
  await expect(page.locator("#product option")).toHaveCount(3);
});

test("E2E-003: produk berhasil ditambahkan", async ({ page }) => {
  await page.getByRole("button", { name: "Tambah ke Keranjang" }).click();
  await expect(page.locator("#cart")).toContainText("Laptop x 1");
});

test("E2E-004: total harga diperbarui", async ({ page }) => {
  await page.getByRole("button", { name: "Tambah ke Keranjang" }).click();
  await expect(page.locator("#total")).toHaveText("7.500.000");
});

test("E2E-005: checkout berhasil", async ({ page }) => {
  await page.getByRole("button", { name: "Tambah ke Keranjang" }).click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.locator("#message")).toHaveText("Pesanan berhasil dibuat");
});
