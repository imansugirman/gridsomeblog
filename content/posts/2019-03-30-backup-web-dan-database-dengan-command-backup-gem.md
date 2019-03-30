---
title: "Backup Web dan Database dengan Command Backup Gem"
slug:
description: ""
date: 2019-03-30 17:08:00
author: iman-sugirman
tags:
  - Ruby
  - Gem
  - Backup
cover: /images/posts/ruby.png
fullscreen: false
---
Banyak cara install untuk mem-`Backup` file website salah satunya dengan Ruby Gem ini. untuk cara installnya bisa memasukan perintah :

```bash
gem install backup
```
Untuk Sebelumnya bisa menginstall Ruby terlebih dahulu dan bisa menginstall menggunakan Homebrew untuk menginstallnya bisa ikuti tutorial :

[Install Ruby di Server Ubuntu](/tutorial-install-homebrew-di-mac-osx)

Atau kalo untuk install Gem Backup versi lain bisa memasukan perintah :

```bash
# Install version 4.1.0
$ gem install backup -v '4.1.0'

# Install the latest 4.1.x version
$ gem install backup -v '~> 4.1.0'

# Install the latest 4.x version
$ gem install backup -v '~> 4.0'
```
### Buat file untuk memberikan perintah Backup
Generate File Backup Performance dengan memasukan :
```bash
backup generate:model --trigger my_backup \
  --archives --storages='local' --compressor='gzip' --notifiers='mail'
```
Dan akan muncul / menggenerate file di lokasi `~/Backup/models/my_backup.rb`

Dan isi file configuration nya akan seperti ini :
```bash
##
# Backup Generated: my_backup
# Once configured, you can run the backup with the following command:
#
# $ backup perform -t my_backup [-c <path_to_configuration_file>]
#
# For more information about Backup's components, see the documentation at:
# http://meskyanichi.github.io/backup
#
Model.new(:my_backup, 'Description for my_backup') do
  ##
  # Archive [Archive]
  #
  # Adding a file or directory (including sub-directories):
  #   archive.add "/path/to/a/file.rb"
  #   archive.add "/path/to/a/directory/"
  #
  # Excluding a file or directory (including sub-directories):
  #   archive.exclude "/path/to/an/excluded_file.rb"
  #   archive.exclude "/path/to/an/excluded_directory
  #
  # By default, relative paths will be relative to the directory
  # where `backup perform` is executed, and they will be expanded
  # to the root of the filesystem when added to the archive.
  #
  # If a `root` path is set, relative paths will be relative to the
  # given `root` path and will not be expanded when added to the archive.
  #
  #   archive.root '/path/to/archive/root'
  #
  archive :my_archive do |archive|
    # Run the `tar` command using `sudo`
    # archive.use_sudo
    archive.add "/path/to/a/file.rb"
    archive.add "/path/to/a/folder/"
    archive.exclude "/path/to/a/excluded_file.rb"
    archive.exclude "/path/to/a/excluded_folder"
  end

  ##
  # Local (Copy) [Storage]
  #
  store_with Local do |local|
    local.path       = "~/backups/"
    local.keep       = 5
  end

  ##
  # Gzip [Compressor]
  #
  compress_with Gzip

  ##
  # Mail [Notifier]
  #
  # The default delivery method for Mail Notifiers is 'SMTP'.
  # See the documentation for other delivery options.
  #
  notify_by Mail do |mail|
    mail.on_success           = true
    mail.on_warning           = true
    mail.on_failure           = true

    mail.from                 = "sender@email.com"
    mail.to                   = "receiver@email.com"
    mail.address              = "smtp.gmail.com"
    mail.port                 = 587
    mail.domain               = "your.host.name"
    mail.user_name            = "sender@email.com"
    mail.password             = "my_password"
    mail.authentication       = "plain"
    mail.encryption           = :starttls
  end

end
```
Untuk mengecek validasi Konfigurasinya :

```bash
backup check
```
Outputnya akan seperti ini :
```bash
[info] Configuration Check Succeeded.
```
Dan untuk menjalankannya bisa dengan masukan perintah :

```bash
backup perform --trigger my_backup
```

### Pre Configuration

Cadangan menggunakan sejumlah utilitas baris perintah sistem. Utilitas seperti tar dan cat digunakan untuk setiap pekerjaan cadangan yang mencakup Arsip atau Basis Data (mis. Membutuhkan Penyimpanan). Lainnya digunakan tergantung pada komponen atau opsi yang dipilih.

Cadangan secara otomatis mendeteksi ini menggunakan panggilan perintah mana untuk menemukan utilitas yang diperlukan di `$PATH` sistem Anda. Namun, mungkin ada kasus di mana Anda perlu menggunakan utilitas yang tidak ada dalam `$PATH` sistem Anda. Atau, mungkin Anda perlu menggunakan versi tertentu dari utilitas yang berbeda dari yang dideteksi oleh Backup.

Dalam kasus ini, Anda dapat mengonfigurasi path lengkap ke utilitas yang diperlukan di config.rb Anda menggunakan yang berikut ini:

```bash
Utilities.configure do
  # General Utilites
  tar   '/path/to/tar'
  tar_dist :gnu   # or :bsd
  cat   '/path/to/cat'
  split '/path/to/split'
  sudo  '/path/to/sudo'
  chown '/path/to/chown'

  # Compressors
  gzip    '/path/to/gzip'
  bzip2   '/path/to/bzip2'

  # Database Utilities
  mongo       '/path/to/mongo'
  mongodump   '/path/to/mongodump'
  mysqldump   '/path/to/mysqldump'
  pg_dump     '/path/to/pg_dump'
  pg_dumpall  '/path/to/pg_dumpall'
  redis_cli   '/path/to/redis-cli'
  riak_admin  '/path/to/riak-admin'

  # Encryptors
  gpg     '/path/to/gpg'
  openssl '/path/to/openssl'

  # Syncer and Storage
  rsync   '/path/to/rsync'
  ssh     '/path/to/ssh'

  # Notifiers
  sendmail  '/path/to/sendmail'
  exim      '/path/to/exim'
end
```
#### Logger
Untuk konfigurasi `Logger` bisa menggunakan :

```bash
# Shown here with their default values
Logger.configure do
  # Console options:
  console.quiet = false

  # Logfile options:
  logfile.enabled   = true
  logfile.log_path  = 'log'
  logfile.max_bytes = 500_000

  # Syslog options:
  syslog.enabled  = false
  syslog.ident    = 'backup'
  syslog.options  = Syslog::LOG_PID
  syslog.facility = Syslog::LOG_LOCAL0
  syslog.info     = Syslog::LOG_INFO
  syslog.warn     = Syslog::LOG_WARNING
  syslog.error    = Syslog::LOG_ERR
end
```
#### Notifikasi Bisa Multi Channel

Buat Konfigurasi :
```bash
Notifier::Mail.defaults do |mail|
  mail.from                 = 'sender@email.com'
  mail.to                   = 'receiver@email.com'
  mail.address              = 'smtp.gmail.com'
  mail.port                 = 587
  mail.domain               = 'your.host.name'
  mail.user_name            = 'sender@email.com'
  mail.password             = 'my_password'
  mail.authentication       = 'plain'
  mail.encryption           = :starttls
end
```
#### Hook
```bash
Model.new(:my_backup, 'My Backup') do
  before do
    # your code
  end

  after do |exit_status|
    # your code
  end
end
```
