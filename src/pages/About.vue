<template>
  <Layout>
    <main>
      <header class="container max-w-lg mx-auto text-center px-6 pt-24">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">About</h1>
        <p class="text-grey-dark text-lg sm:text-3xl">Lorem ipsum dolor &hellip;</p>
      </header>
      <nav class="absolute pin-t pin-l z-20 mt-6 ml-6">
        <g-link to="/" class="text-grey-darkest border-grey-dark text-sm border opacity-75 hover:opacity-100 rounded-full no-underline px-4 py-2 transition-opacity">&larr; Home</g-link>
      </nav>
      <article class="container mx-auto max-w-lg px-6 sm:px-12 pt-16 border-b border-grey-lighter pb-10 mb-16">
        <div class="markdown text-lg leading-normal text-grey-darkest">
          <p>This is your about page, say something about you or this blog.</p>
          <p>You can edit this page in <code class="shiki-inline">src/pages/About.vue</code></p>
          <hr>
          <p>Web Design & Dveloper khusus untuk pengembangan Wordpress dan Woocommerce. Customization Website menggunakan Wordpress lebih menyenangkan :wave:, Server Optimization, Installation menggunakan Ubuntu :muscle:, Menggunakan MacOs High Sierra :computer:</p>
          <p>Paling suka pake Cloud Server Digitalocean :cloud: kalo mau promo code Cloud Server dari Digitalocean bisa klik</p>
          <h2>Communication is not possible</h2>
          <p>Selalu Explore Hal Baru untuk dunia Digital Marketing, [Web Design](https://bogordesain.com/web-desain), dan Optimisasi</p>
          <p>Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies. Resistance is futile. Recommend we adjust shield harmonics to the upper EM band when proceeding. These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions. Increase deflector modulation to upper frequency band.</p>
          <h2>Deflector power at maximum</h2>
          <p>Unidentified vessel travelling at sub warp speed, bearing 235.7. Fluctuations in energy readings from it, Captain. All transporters off. A strange set-up, but I'd say the graviton generator is depolarized. The dark colourings of the scrapes are the leavings of natural rubber, a type of non-conductive sole used by researchers experimenting with electricity. The molecules must have been partly de-phased by the anyon beam.</p>
          <p>Sensors indicate human life forms 30 meters below the planet's surface. Stellar flares are increasing in magnitude and frequency. Set course for Rhomboid Dronegar 006, warp seven. There's no evidence of an advanced communication network. Total guidance system failure, with less than 24 hours' reserve power. Shield effectiveness has been reduced 12 percent. We have covered the area in a spherical pattern which a ship without warp drive could cross in the given time.</p>
          <p>It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy. Any device like that would produce high levels of triolic waves. These walls have undergone some kind of selective molecular polarization. I haven't determined if our phaser energy can generate a stable field. We could alter the photons with phase discriminators.</p>
          <p>I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.</p>
          <p>Resistance is futile.</p>
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
          content: 'Introduction to the Bleda blog starter for Gridsome.'
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: 'Introduction to the Bleda blog starter for Gridsome.' },
        { name: "twitter:title", content: 'About' },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:image", content: '/images/bleda-card.png' },
        { name: "twitter:creator", content: "@cossssmin" },
        { property: "og:image", content: '/images/bleda-card.png' },
      ],
    }
  },
}
</script>
