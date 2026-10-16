
# SQA CI/CD Project

## 1. Deskripsi Proyek
Proyek ini merupakan praktikum Software Quality Assurance (SQA) yang menerapkan automated testing dan Continuous Integration (CI) menggunakan GitHub Actions. Proyek menggunakan aplikasi web sederhana bernama SQA Store sebagai objek pengujian.

## 2. Teknologi yang Digunakan
- Node.js
- Jest untuk unit testing
- Playwright untuk End-to-End (E2E) testing
- GitHub untuk repository kode
- GitHub Actions untuk menjalankan pipeline CI
- SonarQube Cloud untuk analisis kualitas kode dan Quality Gate

## 3. Struktur Proyek
- `src/store.js`: fungsi logika toko
- `test/store.test.js`: unit test
- `test/store.e2e.spec.js`: E2E test menggunakan Playwright
- `index.html`: halaman aplikasi SQA Store
- `server.js`: server lokal aplikasi
- `playwright.config.js`: konfigurasi Playwright
- `jest.config.js`: konfigurasi Jest
- `sonar-project.properties`: konfigurasi SonarQube Cloud
- `.github/workflows/quality-gate.yml`: konfigurasi CI GitHub Actions

## 4. Instalasi dan Menjalankan Pengujian
Pastikan Node.js sudah terpasang. Jalankan perintah berikut dari folder proyek.

```bash
npm ci
```

Menjalankan unit test:

```bash
npm test
```

Menjalankan unit test sekaligus menghasilkan coverage report:

```bash
npm run test:coverage
```

Menjalankan E2E test:

```bash
npm run test:e2e
```

## 5. Continuous Integration
GitHub Actions menjalankan pipeline ketika terdapat push ke branch `main` atau pull request menuju branch tersebut.

Tahapan pipeline:
1. Checkout repository.
2. Menyiapkan Node.js.
3. Menginstal dependency.
4. Menjalankan unit test dan menghasilkan coverage report.
5. Menginstal Chromium untuk Playwright.
6. Menjalankan E2E test.
7. Menjalankan analisis SonarQube Cloud.
8. Memeriksa hasil Quality Gate.

## 6. Hasil Pengujian
Berdasarkan hasil pengujian yang diperoleh:
- Unit test: 12 test berhasil.
- E2E test: 5 test berhasil.
- Statement coverage: 100%.
- Branch coverage: 89,47%.
- Function coverage: 100%.
- Line coverage: 100%.
- SonarQube Cloud Quality Gate: Passed.

Hasil tersebut menunjukkan bahwa pengujian unit dan E2E berhasil dijalankan serta analisis kualitas kode telah terintegrasi dengan pipeline CI.

## 7. Simulasi Kegagalan dan Perbaikan
Pada proses awal, pipeline mengalami kegagalan karena Jest ikut menjalankan file E2E Playwright. Perbaikan dilakukan dengan mengatur `jest.config.js` agar Jest hanya menjalankan file `*.test.js`, sehingga pengujian unit dan E2E berjalan secara terpisah.

Pipeline juga sempat gagal ketika Automatic Analysis dan analisis melalui GitHub Actions aktif bersamaan. Automatic Analysis kemudian dinonaktifkan agar analisis berjalan melalui CI.

Setelah perbaikan, pipeline terbaru berhasil berjalan dan Quality Gate SonarQube Cloud menunjukkan status Passed.

## 8. Repository
GitHub: https://github.com/dafajuliansyah12-rgb/sqa-ci-cd-project

SonarQube Cloud:
https://sonarcloud.io/summary/overall?id=dafajuliansyah12-rgb_sqa-ci-cd-project&branch=main

