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

Yay! Sekarang kita telah menginstal dependensi kita, kita dapat mulai menginstal Ruby.
Pilih versi Ruby yang ingin Anda instal:

Selanjutnya kita akan menginstal Ruby menggunakan mmanager versi Ruby yang disebut rbenv. Ini adalah pilihan termudah dan paling sederhana, ditambah lagi dengan beberapa plugin praktis untuk memudahkan kita mengelola variabel lingkungan dalam produksi.

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
git clone https://github.com/rbenv/rbenv-vars.git ~/.rbenv/plugins/rbenv-vars
exec $SHELL
rbenv install 2.6.1
rbenv global 2.6.1
ruby -v
# ruby 2.6.1
```
Langkah terakhir adalah menginstal Bundler:

```bash
# This installs the latest Bundler, currently 2.x.
gem install bundler
# For older apps that require Bundler 1.x, you can install it as well.
gem install bundler -v 1.17.3
# Test and make sure bundler is installed correctly, you should see a version number.
bundle -v
# Bundler version 2.0
```
Jika ia memberi tahu Anda bundel tidak ditemukan, jalankan `rbenv rehash` dan coba lagi.

### Step 3

Kereta api tidak akan hidup sendiri dalam produksi. Di depan Rails, kami akan memasang NGINX untuk menangani SSL dan melayani file statis karena jauh lebih cepat daripada Ruby.

Untuk menjalankan aplikasi Rails kami, kami akan memasang modul Penumpang untuk NGINX untuk meneruskan permintaan ke Rails.

#### Install Web Server Nginx
Untuk produksi, kami akan menggunakan NGINX sebagai server web kami untuk menerima permintaan HTTP. Permintaan tersebut kemudian akan diserahkan kepada Penumpang yang akan menjalankan aplikasi Ruby kami.

Memasang Penumpang cukup mudah. Kami akan menambahkan repositori mereka dan kemudian menginstal dan mengkonfigurasi paket mereka.

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger bionic main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update
sudo apt-get install -y nginx-extras libnginx-mod-http-passenger
if [ ! -f /etc/nginx/modules-enabled/50-mod-http-passenger.conf ]; then sudo ln -s /usr/share/nginx/modules-available/mod-http-passenger.load /etc/nginx/modules-enabled/50-mod-http-passenger.conf ; fi
sudo ls /etc/nginx/conf.d/mod-http-passenger.conf
```

Sekarang kita telah menginstal NGINX dan Penumpang, kita perlu mengarahkan Penumpang ke versi Ruby yang benar.

Kami akan mulai dengan membuka file konfigurasi Penumpang di editor favorit Anda, `nano` atau `vim`

```bash
# If you want to use the Nano for editing
sudo nano /etc/nginx/conf.d/mod-http-passenger.conf
# If you want to use the Vim for editing
sudo vim /etc/nginx/conf.d/mod-http-passenger.conf
```

Kami hanya ingin mengubah jalur `passenger_ruby` agar sesuai dengan yang berikut:
```bash
passenger_ruby /home/deploy/.rbenv/shims/ruby;
```

Simpan file ini dan kami akan mulai `NGINX`.

```bash
sudo service nginx start
```

Anda dapat memeriksa dan memastikan NGINX berjalan dengan mengunjungi alamat IP publik server Anda di browser Anda dan Anda akan disambut dengan pesan `"Selamat datang di NGINX"`.

Selanjutnya kita akan menghapus server NGINX default ini dan menambahkannya untuk aplikasi kita.

```bash
sudo rm /etc/nginx/sites-enabled/default
# If you want to use the Nano for editing
sudo nano /etc/nginx/sites-enabled/myapp
# If you want to use the Vim for editing
sudo vim /etc/nginx/sites-enabled/myapp
```

Kami ingin konten situs NGINX kami terlihat seperti berikut ini.

Ubah `myapp` ke nama aplikasi Anda. Kami akan menggunakan folder yang sama nanti ketika menentukan folder Capistrano `deploy_to` kami.

```bash
server {
  listen 80;
  listen [::]:80;

  server_name _;
  root /home/deploy/myapp/current/public;

  passenger_enabled on;
  passenger_app_env production;

  location /cable {
    passenger_app_group_name myapp_websocket;
    passenger_force_max_concurrent_requests_per_process 0;
  }

  # Allow uploads up to 100MB in size
  client_max_body_size 100m;

  location ~ ^/(assets|packs) {
    expires max;
    gzip_static on;
  }
}
```

Simpan file dan kemudian kami akan memuat ulang NGINX untuk memuat file server baru.

```bash
sudo service nginx reload
```


Untuk produksi, kita perlu membuat database baru untuk semua catatan produksi kita.

Kami merekomendasikan menjalankan `PostgreSQL`, tetapi kami juga akan menyertakan `MySQL` untuk Anda yang lebih mengenalnya.


Kami merekomendasikan `PostgreSQL` untuk database produksi Anda, tetapi jangan ragu untuk menggunakan `MySQL`. Cukup ikuti instruksi untuk database yang ingin Anda gunakan dan lewati ke bagian selanjutnya setelah Anda selesai.

### Membuat Database PostgreSQL

Untuk Postgres, kita akan mulai dengan menginstal server Postgres dan libpq yang memungkinkan kita untuk mengkompilasi pg rubygem.

Kemudian, kita akan menjadi pengguna linux `postgres` yang memiliki akses penuh ke database dan menggunakan akun itu untuk membuat pengguna basis data baru untuk aplikasi kita. Kami akan memanggil pengguna yang digunakan.

Dan akhirnya, perintah terakhir akan membuat database bernama `myapp` dan membuat pemilik pengguna `deploy`.

Pastikan untuk mengubah `myapp` dengan nama aplikasi Anda.

```bash
sudo apt-get install postgresql postgresql-contrib libpq-dev
sudo su - postgres
createuser --pwprompt deploy
createdb -O deploy myapp
exit
```
Anda dapat secara manual terhubung ke database Anda kapan saja dengan menjalankan `psql -U deploy -W -h 127.0.0.1 -d` myapp. Pastikan untuk menggunakan `127.0.0.1` saat menghubungkan ke database bukan localhost.

### Deploy Kode


Setelah semuanya di server kami terkonfigurasi dan siap digunakan, kami membutuhkan cara untuk mengunggah kode kami ke produksi.

Capistrano adalah alat untuk membuat salinan repositori Anda dalam produksi dan kemudian dengan mudah membuat rilis baru.

### Menyiapkan Capistrano

Kembali ke mesin lokal kami, kami dapat menginstal Capistrano di aplikasi Rails kami.

Kami perlu menambahkan permata berikut ke Gemfile kami:

```bash
gem 'capistrano', '~> 3.11'
gem 'capistrano-rails', '~> 1.4'
gem 'capistrano-passenger', '~> 0.2.0'
gem 'capistrano-rbenv', '~> 2.1', '>= 2.1.4'
```
Setelah ditambahkan, kita dapat menjalankan yang berikut untuk menginstal permata dan meminta Capistrano menginstal file konfigasinya:

```bash
bundle
cap install STAGES=production
```

Ini menghasilkan beberapa file untuk kami:

`Capfile`
`config/deploy.rb`
`config/deploy/production.rb`

Kami perlu mengedit Capfile dan menambahkan baris berikut:

```bash
require 'capistrano/rails'
require 'capistrano/passenger'
require 'capistrano/rbenv'

set :rbenv_type, :user
set :rbenv_ruby, '2.6.1'
```

Kemudian kita bisa memodifikasi `config/deploy.rb` untuk mendefinisikan aplikasi kita dan detail git repo.

```bash
set :application, "myapp"
set :repo_url, "git@github.com:username/myapp.git"

# Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads'

# Only keep the last 5 releases to save disk space
set :keep_releases, 5

# Optionally, you can symlink your database.yml and/or secrets.yml file from the shared directory during deploy
# This is useful if you don't want to use ENV variables
# append :linked_files, 'config/database.yml', 'config/secrets.yml'
```

Sekarang kita perlu memodifikasi `config/deploy/production.rb` untuk menunjuk ke alamat IP server kami untuk penyebaran produksi. Pastikan untuk mengganti `1.2.3.4` dengan IP publik server Anda.

```bash
server '1.2.3.4', user: 'deploy', roles: %w{app db web}
```

Sebelum kita dapat menggunakan aplikasi kita untuk produksi, kita perlu SSH ke server untuk terakhir kalinya dan menambahkan variabel lingkungan kita.

```bash
ssh deploy@1.2.3.4
mkdir /home/deploy/myapp
nano /home/deploy/myapp/.rbenv-vars
```
Tambahkan variabel lingkungan apa pun yang Anda perlukan untuk produksi ke file ini.

```bash
# For Postgres
DATABASE_URL=postgresql://deploy:PASSWORD@127.0.0.1/myapp

# For MySQL
DATABASE_URL=mysql2://deploy:$omeFancyPassword123@localhost/myapp

RAILS_MASTER_KEY=ohai
SECRET_KEY_BASE=1234567890

STRIPE_PUBLIC_KEY=x
STRIPE_PRIVATE_KEY=y
# etc...
```


Simpan file ini dan variabel lingkungan ini akan dimuat secara otomatis setiap kali Anda menjalankan perintah Ruby di dalam direktori aplikasi Anda di server.

Dengan menggunakan metode ini, kita dapat memiliki variabel env terpisah untuk setiap aplikasi yang kita gunakan ke server ini.

Sekarang kita dapat menggunakan aplikasi kita untuk produksi:

```bash
cap production deploy
```
Buka IP server Anda di browser Anda dan Anda akan disambut dengan aplikasi Rails Anda.

Jika Anda melihat kesalahan, Anda bisa SSH ke server dan melihat file log untuk melihat apa yang salah.

```bash
# To view the Rails logs
less /home/deploy/myapp/current/log/production.log
# To view the NGINX and Passenger logs
sudo less /var/log/nginx/error.log
```

Setelah Anda menemukan kesalahan Anda (sering kali variabel lingkungan yang hilang atau konfigurasi untuk produksi), Anda dapat memperbaikinya dan memulai kembali atau memindahkan aplikasi Anda.
