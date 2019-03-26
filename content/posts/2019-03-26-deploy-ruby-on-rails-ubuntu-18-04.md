---
title: "Deploy Ruby On Rails Ubuntu 18.04"
slug:
description: ""
date: 2019-03-26 13:40:58
author: iman-sugirman
tags:
  - Rails
  - Ubuntu
cover: /images/posts/ruby.png
fullscreen: false
---
Jika Anda pernah bertanya-tanya bagaimana cara memperbaiki Ruby on Rails untuk produksi di server Anda sendiri, Anda telah datang ke tempat yang tepat.

Saya menulis panduan ini untuk mencakup proses Seluruh dari memilih server, menginstal dependensi, mengkonfigurasi `Nginx`, mengatur database Anda, dan membuat penyebaran pertama Anda menggunakan Capistrano.

Jadi jika Anda ingin meningkatkan permainan Ruby on Rails Anda tahun ini, Anda akan menyukai panduan ini.

### Pertimbangan Server untuk Aplikasi Rails Anda

Virtual Private Server (VPS) adalah tempat aplikasi Rails kami dan semua layanan yang relevan akan hidup.

Kami memiliki banyak opsi berbeda untuk ini, jadi kami akan membahas di mana menemukan VPS yang bagus dan seberapa besar server yang harus Anda pilih.

Ada banyak, banyak pilihan ketika datang ke penyedia hosting. Ini adalah tempat-tempat yang memiliki server di pusat data dan akan menyewakannya kepada Anda setiap bulan.

Sangat penting untuk membeli server di tempat seperti ini karena mereka akan menangani masalah dengan kegagalan perangkat keras dan memberi Anda koneksi internet super cepat yang sangat penting untuk menjalankan apa pun dalam produksi di internet.

Abaikan penyedia hosting yang dikelola. Mereka tidak memberikan kontrol yang cukup atas server Anda untuk mengatur berbagai hal dan mereka biasanya sangat ketinggalan jaman.

### Rekomendasi Virtual Private Server

Saya merekomendasikan DigitalOcean karena sangat murah, sangat cepat, dan paling mudah digunakan sejauh ini. Anda akan menghemat sejumlah uang dengan menggunakannya dan mereka terus menawarkan banyak produk baru.

Plus, jika Anda menggunakan tautan DigitalOcean saya, Anda akan mendapatkan $ 100 dalam kredit gratis untuk menghabiskan lebih dari 60 hari! Itu cara yang sempurna untuk mencoba berbagai hal dan melihat bagaimana hasilnya tanpa mengeluarkan uang sepeser pun.

### Mulai Membuat Server

#### 1. Pilih OS Kesukaan Anda

Kami ingin menggunakan Ubuntu 18.04 untuk sistem operasi server kami. Ini adalah rilis dukungan jangka panjang (LTS) yang berarti akan menerima pembaruan keamanan selama beberapa tahun dari biasanya. Ini penting untuk produksi.

Pilih `Ubuntu 18.04` dari dropdown di bagian Choose an image.

#### 2. Setup

Silakan dan pilih ukuran server di bawah Pilih ukuran berdasarkan pada apa yang Anda rasa nyaman.

Tidak yakin ukuran apa yang digunakan? Mulai saja dengan server RAM 2GB. Anda selalu dapat mengubah ukuran server ke ukuran yang lebih besar nanti tanpa kehilangan data apa pun jika diinginkan. Itulah bagian yang bagus dari server "virtual" ini. Mereka bukan server nyata, sehingga Anda dengan mudah menambahkan lebih banyak RAM atau CPU ke server Anda kapan saja.

### Login dengan Akun SSH dan Setup

```bash
ssh root@1.2.3.4
```
Dan Buat akun deployer :

```bash
adduser deploy
adduser deploy sudo
exit
```

Dan Copy ssh dari Root ke akun Deployer :
```bash
ssh-copy-id root@1.2.3.4
ssh-copy-id deploy@1.2.3.4
```

Dan Setup dengan mengikuti :

```bash
# Adding Node.js 10 repository
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# Adding Yarn repository
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo add-apt-repository ppa:chris-lea/redis-server
# Refresh our packages list with the new repositories
sudo apt-get update
# Install our dependencies for compiiling Ruby along with Node.js and Yarn
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev dirmngr gnupg apt-transport-https ca-certificates redis-server redis-tools nodejs yarn
```
