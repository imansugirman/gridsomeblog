---
title: "Integrasi Laravel dengan DataTables"
slug:
description: ""
date: 2019-03-20 22:25:40
author: iman-sugirman
tags:
  - Laravel
  - DataTables
cover: /images/posts/laravellogo.png
fullscreen: false
---
Pada tutorial kali ini saya akan menjelaskan bagaimana cara mengintegrasikan Laravel dengan **DataTables** dengan menggunakan package dari [Yajra Box](https://github.com/yajra/laravel-datatables) dan akan kita integrasikan dengan Project Laravel yang kita buat.

### Install Menggunakan Composer
Masukan perintah :

```bash
composer require yajra/laravel-datatables
```
Itu untuk menginstall semua package dari Laravel Datatables dari **Yajrabox**, untuk mempublish package gunakan perintah :

#### Laravel DataTables

```bash
php artisan vendor:publish --tag=datatables
```
#### HTML Builder Plugin

```bash
php artisan vendor:publish --tag=datatables-html
```

#### Buttons Plugins
```bash
php artisan vendor:publish --tag=datatables-buttons
```
Untuk Membuat Class DataTables sekarang masukan perintah :

```bash
php artisan datatables:make UsersDataTable
```
Dan sekarang kita punya file di `App\DataTables\UsersDataTable` lalu anda akan melihat :

```php
<?php
namespace App\DataTables;

use Spatie\Permission\Models\Role;
use Yajra\DataTables\Services\DataTable;

class RolesDataTable extends DataTable
{

    public function dataTable($query)
    {
        return datatables($query)
            ->addColumn('action', 'rolesdatatable.action');
    }


    public function query(Role $model)
    {
        return $model->newQuery()->select('id', 'name', 'guard_name', 'created_at', 'updated_at');
    }


    public function html()
    {
        return $this->builder()
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    ->addAction(['width' => '80px'])
                    ->parameters($this->getBuilderParameters());
    }


    protected function getColumns()
    {
        return [
            'id',
            'name',
            'guard_name',
            'created_at',
            'updated_at'
        ];
    }


    protected function filename()
    {
        return 'roles_' . date('YmdHis');
    }
}

```

### Buat UserController

Lalu Buatlah Controller dengan memasukan perintah :

```bash
php artisan make:controller UserController
```
