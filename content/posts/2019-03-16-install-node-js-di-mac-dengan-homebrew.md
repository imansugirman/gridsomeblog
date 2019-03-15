---
title: "Install NodeJs di Mac dengan Homebrew"
slug:
description: ""
date: 2019-03-16 00:22:49
author: iman-sugirman
tags:
  - NodeJs
  - Mac
cover: /images/posts/nodejs.png
fullscreen: false
---
Jika Anda menginstal NodeJS melalui penginstal dari [Nodejs Website](https://nodejs.org) maka Anda harus menggunakan sudo untuk memastikan pemasangannya dengan benar


Homebrew adalah "Manajer paket yang hilang untuk macOS".

Buka terminal dan ketik perintah berikut.

``` bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Lalu ketik lagi :
```bash
brew -v
```
Dan akan Muncul :

```bash
Homebrew 1.7.1-72-gdce6b87
Homebrew/homebrew-core (git revision 92d5; last commit 2018-08-01)
```
#### Mengapa menggunakan Homebrew untuk menginstal NodeJS?

Jika Anda menginstal NodeJS melalui penginstal dari [Nodejs Website](https://nodejs.org) maka Anda harus menggunakan sudo untuk memastikan pemasangannya dengan benar. Setelah itu Anda harus membuat perubahan dalam sistem Anda `$PATH` dengan menambahkan jalur dari node yang dapat dieksekusi. Dan jika Anda ingin menghapus node, maka Anda telah melacak semua file yang dibuat dan menyingkirkannya. Singkatnya prosesnya yang panjang.

Itu sebabnya Homebrew digunakan. Itu membuat pekerjaan menjadi mudah. Ini akan menginstal / menghapus Node dengan mudah.

#### Langkah 2: Install Node via Homebrew

Di terminal ketik perintah berikut untuk menginstal Node.

``` bash
brew install node
```
Jika semuanya berhasil diinstal maka Anda dapat mengetikkan perintah berikut di terminal untuk memeriksa Node dan NPM versi.
``` bash
node -v
npm -v
```
