<template>
  <Layout>
    <main>
      <header class="container max-w-lg mx-auto text-center px-6 pt-24">
        <h1 class="text-1 sm:text-1 md:text-1 font-sans font-bold mb-1">Tentang Saya</h1>
        <p class="text-grey-dark text-lg sm:text-1xl">Little about Me</p>
      </header>
      <nav class="absolute pin-t pin-l z-20 mt-6 ml-6">
        <g-link to="/" class="text-grey-darkest border-grey-dark text-sm border opacity-75 hover:opacity-100 rounded-full no-underline px-4 py-2 transition-opacity">&larr; Home</g-link>
      </nav>
      <article class="container mx-auto max-w-lg px-6 sm:px-12 pt-16 border-b border-grey-lighter pb-10 mb-16">
        <div class="markdown text-lg leading-normal text-grey-darkest">
          <hr>
          <p>Web Design & Dveloper khusus untuk pengembangan Wordpress dan Woocommerce. Customization Website menggunakan Wordpress lebih menyenangkan :wave:, Server Optimization, Installation menggunakan Ubuntu :muscle:, Menggunakan MacOs High Sierra :computer:</p>
          <p>Paling suka pake Cloud Server Digitalocean :cloud: kalo mau promo code Cloud Server dari Digitalocean bisa klik </p>
          <h2>Explore and Share</h2>
          <p>Selalu Explore Hal Baru untuk dunia Digital Marketing, <a href="https://bogordesain.com/web-desain">Web Design</a>, dan Optimisasi</p>

        </div>
      </article>
      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import SiteFooter from '@/components/Footer'

export default {
  components: {
    SiteFooter
  },
  metaInfo () {
    return {
      title: 'About',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: 'Web Design & Dveloper khusus untuk pengembangan Wordpress dan Woocommerce. Customization Website menggunakan Wordpress lebih menyenangkan.'
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: 'Web Design & Dveloper khusus untuk pengembangan Wordpress dan Woocommerce. Customization Website menggunakan Wordpress lebih menyenangkan' },
        { name: "twitter:title", content: 'About' },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:image", content: '/images/iman-sugirman.png' },
        { name: "twitter:creator", content: "@cossssmin" },
        { property: "og:image", content: '/images/iman-sugirman.png' },
      ],
    }
  },
}
</script>
