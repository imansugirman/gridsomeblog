---
title: "Install Laravel di Mac OSX"
slug:
description: ""
date: 2019-03-05 01:36:02
author: bleda-gridsome
tags:
  - Blog
  - Laravel
cover: https://res.cloudinary.com/imans/image/upload/v1537838210/blog/hacklaravel.jpg
fullscreen: true
---
[Gridsome](https://gridsome.org) is a Vue.js-powered, modern site generator for building the fastest possible websites for any Headless CMS, APIs or Markdown-files. Gridsome makes it easy and fun for developers to create fast, beautiful websites without needing to become a performance expert.

```bash
composer global require laravel/installer
```

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

```php
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}

?>
```

```bash
yarn add tailwind-css
```
