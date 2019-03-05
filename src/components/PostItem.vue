<template>
  <article>
    <div class="container mx-auto">
      <div class="flex flex-wrap mb-4 justify-center">
        <div class="lg:flex w-4/5">
          <div class="h-full lg:h-full lg:w-1/2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img :src="post.cover" :alt="post.title">
          </div>
          <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
              <p class="text-sm text-grey-dark flex items-center">
                <span v-if="post.tags && post.tags.length > 0"> in <g-link :to="`${post.tags[0].path}/`" class="text-grey-darker capitalize no-underline border-b border-transparent hover:border-grey transition-border-color">{{ titleCase(post.tags[0].title) }}</g-link></span>
              </p>
              <div class="text-indigo font-bold text-xl mb-2"><g-link :to="`${post.path}/`" class="text-black no-underline">{{ post.title }}</g-link></div>
              <p class="text-grey-darker text-base" v-html="excerpt(post, 180, ' ...')"></p>
            </div>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="https://tailwindcss.com/img/jonathan.jpg" alt="Avatar of Jonathan Reinink">

              <!-- Oke -->
              <div class="text-sm">
                <p class="text-black leading-none"><span v-if="post.author">by <g-link :to="`${post.author.path}/`" class="text-grey-darker capitalize no-underline border-b border-transparent hover:border-grey transition-border-color" v-if="post.author">{{ titleCase(post.author.title) }}</g-link></span></p>
                <p class="text-grey-dark"><time :datetime="post.datetime" class="text-grey text-xs mb-2">{{ formatPublishDate(post.datetime) }}</time></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment'

export default {
  props: ['post'],
  computed: {
    formattedPublishDate() {
      return moment(this.post.datetime).format('DD MMMM, YYYY');
    },
  },
  methods: {
    formatPublishDate(date) {
      return moment(date).format('DD MMMM, YYYY');
    },
    excerpt(post, length, clamp) {
      if (post.excerpt) {
        return post.excerpt
      }

      length = length || 280
      clamp = clamp || ' ...'
      let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

      return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
    },
    titleCase(str) {
      return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
    }
  },
}
</script>
