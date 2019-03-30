---
title: "Docker Rails Starter"
slug:
description: ""
date: 2019-03-30 18:29:25
author: iman-sugirman
tags:
  - Docker
  - Rails
cover: /images/posts/docker.png
fullscreen: false
---
Mulailah dengan mengatur file yang diperlukan untuk membangun aplikasi. Aplikasi akan berjalan di dalam wadah Docker yang berisi dependensinya. Menentukan dependensi dilakukan menggunakan file yang disebut Dockerfile. Untuk mulai dengan, Dockerfile terdiri dari:

```bash
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

Itu akan menempatkan kode aplikasi Anda di dalam gambar yang membangun wadah dengan Ruby, `Bundler` dan semua dependensi Anda di dalamnya. Untuk informasi lebih lanjut tentang cara menulis `Dockerfiles`, lihat panduan pengguna `Docker` dan referensi `Dockerfile`.

Selanjutnya, buat Bootstrap `Gemfile` yang hanya memuat `Rails`. Ini akan ditimpa dalam beberapa saat dengan kereta baru.

```bash
source 'https://rubygems.org'
gem 'rails', '~>5'
```
Buat `Gemfile.lock` kosong untuk membangun `Dockerfile` kami.

```bash
touch Gemfile.lock
```

Selanjutnya, berikan skrip entri untuk memperbaiki masalah khusus `Rails` yang mencegah server dari restart ketika file `server.pid` tertentu sudah ada sebelumnya. `Script` ini akan dieksekusi setiap kali container dimulai. entrypoint.sh terdiri dari:

```bash
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Akhirnya, `docker-compose.yml` adalah tempat keajaiban terjadi. File ini menjelaskan layanan yang terdiri dari aplikasi Anda (database dan aplikasi web), cara mendapatkan gambar Docker masing-masing (database hanya berjalan pada gambar PostgreSQL yang sudah dibuat sebelumnya, dan aplikasi web dibangun dari direktori saat ini), dan konfigurasi yang diperlukan untuk menghubungkan mereka bersama dan mengekspos port aplikasi web.

```bash
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```

**Tip: You can use either a `.yml` or `.yaml` extension for this file.**

### Build the project

Dengan file-file itu di tempat, Anda sekarang dapat membuat aplikasi kerangka Rails menggunakan run `dock-compose`:

```bash
docker-compose run web rails new . --force --no-deps --database=postgresql
```
Pertama, Compose membuat gambar untuk layanan `web` menggunakan `Dockerfile`. Kemudian menjalankan `rails new` di dalam wadah baru, menggunakan gambar itu. Setelah selesai, Anda harus membuat aplikasi baru.

```bash
$ ls -l
total 64
-rw-r--r--   1 vmb  staff   222 Jun  7 12:05 Dockerfile
-rw-r--r--   1 vmb  staff  1738 Jun  7 12:09 Gemfile
-rw-r--r--   1 vmb  staff  4297 Jun  7 12:09 Gemfile.lock
-rw-r--r--   1 vmb  staff   374 Jun  7 12:09 README.md
-rw-r--r--   1 vmb  staff   227 Jun  7 12:09 Rakefile
drwxr-xr-x  10 vmb  staff   340 Jun  7 12:09 app
drwxr-xr-x   8 vmb  staff   272 Jun  7 12:09 bin
drwxr-xr-x  14 vmb  staff   476 Jun  7 12:09 config
-rw-r--r--   1 vmb  staff   130 Jun  7 12:09 config.ru
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 db
-rw-r--r--   1 vmb  staff   211 Jun  7 12:06 docker-compose.yml
-rw-r--r--   1 vmb  staff   184 Jun  7 12:08 entrypoint.sh
drwxr-xr-x   4 vmb  staff   136 Jun  7 12:09 lib
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 log
-rw-r--r--   1 vmb  staff    63 Jun  7 12:09 package.json
drwxr-xr-x   9 vmb  staff   306 Jun  7 12:09 public
drwxr-xr-x   9 vmb  staff   306 Jun  7 12:09 test
drwxr-xr-x   4 vmb  staff   136 Jun  7 12:09 tmp
drwxr-xr-x   3 vmb  staff   102 Jun  7 12:09 vendor
```

Jika Anda menjalankan Docker di Linux, `rails new` dibuat dimiliki oleh root. Ini terjadi karena wadah berjalan sebagai pengguna root. Jika demikian, ubah kepemilikan file baru.

```bash
sudo chown -R $USER:$USER .
```

Jika Anda menjalankan Docker di Mac atau Windows, Anda seharusnya sudah memiliki kepemilikan atas semua file, termasuk yang dihasilkan oleh rails baru.

Sekarang Anda memiliki `Gemfile` baru, Anda perlu membuat gambar lagi. (Ini, dan perubahan pada `Gemfile` atau Dockerfile, harus menjadi satu-satunya saat Anda perlu membangun kembali.)

```bash
docker-compose build
```
### Hubungkan Database

Aplikasi ini sekarang dapat di-boot, tetapi Anda belum cukup di sana. Secara default, Rails mengharapkan database untuk berjalan di `localhost` - jadi Anda perlu mengarahkannya ke wadah `db`. Anda juga perlu mengubah database dan nama pengguna untuk menyelaraskan dengan default yang ditetapkan oleh gambar `postgres`.

Ganti konten config / database.yml dengan yang berikut ini:

```bash
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: myapp_development


test:
  <<: *default
  database: myapp_test
```
