<template>
  <footer class="text-grey text-sm leading-normal flex flex-wrap justify-between container mx-auto max-w-lg px-6 sm:px-12">
    <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
      <p><a href="https://github.com/imansugirman" class="text-grey-dark hover:text-grey-darkest no-underline font-sans transition-color">Iman Sugirman</a> powered by <a href="https://bogordesain.com" class="text-grey-dark font-sans hover:text-grey-darkest no-underline transition-color">@bogordesain.com</a></p>
      <p>Built with <a href="https://gridsome.org" class="text-grey-dark font-sans hover:text-grey-darkest no-underline transition-color">Gridsome</a>.</p>
    </div>
    <div class="w-full sm:w-1/2">
      <nav>
        <ul class="list-reset flex sm:justify-end -mx-2 font-sans">
          <li class="px-2">
            <g-link to="/" class="text-grey-dark hover:text-grey-darkest no-underline transition-color">Home</g-link>
          </li>
          <li class="px-2">
            <g-link to="/about/" class="text-grey-dark hover:text-grey-darkest no-underline transition-color">About</g-link>
          </li>
          <li class="px-2">
            <a href="/sitemap.xml" class="text-grey-dark hover:text-grey-darkest no-underline transition-color">Sitemap</a>
          </li>
          <li class="px-2">
            <a href="/feed.xml" class="text-grey-dark hover:text-grey-darkest no-underline transition-color">RSS Feed</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
}
</script>
