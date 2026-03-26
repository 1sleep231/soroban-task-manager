# 🧾 Soroban Task Manager

## 📌 Deskripsi Aplikasi

Soroban Task Manager adalah aplikasi smart contract berbasis Soroban (Stellar) yang digunakan untuk mengelola task secara on-chain. Setiap task memiliki status yang dapat diperbarui sesuai progres pengerjaan.

Aplikasi ini merupakan pengembangan dari konsep Notes sederhana menjadi Task Manager dengan sistem status.

---

## 🚀 Fitur Utama

* ✅ Membuat task baru
* 📋 Melihat semua task
* 🔄 Mengubah status task (TODO, IN_PROGRESS, DONE)
* ❌ Menghapus task

---

## 🧠 Struktur Data

Setiap task memiliki:

* ID unik (random u64)
* Title
* Description
* Status

---

## ⚙️ Smart Contract

* Platform: Soroban (Stellar)
* Bahasa: Rust

### 📍 Contract ID (Testnet)

```
CBXI5MVKALJZPBRION6G3JQ72WOHYIZD2OQV7AD3M2KNBGNWQNG66VXO
```

---

## 🛠️ Cara Menjalankan

### 1. Build Contract

```
cargo build --target wasm32-unknown-unknown --release
```

### 2. Deploy ke Testnet

```
soroban contract deploy ...
```

### 3. Interaksi Contract

Contoh:

* create_task
* get_tasks
* update_status
* delete_task

---

## ✨ Pengembangan Selanjutnya

* Filtering task berdasarkan status
* Deadline task
* Integrasi frontend (web UI)
