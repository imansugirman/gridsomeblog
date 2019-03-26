<template>
  <article>
    <div class="container mx-auto">
      <div class="flex flex-wrap mb-4 justify-center">
        <div class="lg:flex w-4/5">
          <div class="h-full lg:h-full lg:w-1/2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img :src="post.cover" :alt="post.title">
          </div>
          <div class="lg:border-grey-light bg-white lg:w-1/2 rounded-b lg:rounded-b-none lg:rounded-r px-4 py-2 flex flex-col leading-normal">
            <div class="mb-8">
              <p class="text-sm text-grey-dark flex items-center">
                <span v-if="post.tags && post.tags.length > 0"> <g-link :to="`${post.tags[0].path}/`" class="inline-block text-orange hover:text-white hover:bg-orange font-sans font-bold text-xs sm:text-xs border border-orange px-4 py-1 mr-4 mb-2 rounded-full no-underline transition-color transition-bg">{{ titleCase(post.tags[0].title) }}</g-link></span>
              </p>
              <div class="text-indigo font-bold text-xl mb-2"><g-link :to="`${post.path}/`" class="text-indigo no-underline font-medium font-sans text-xl tracking-tight">{{ post.title }}</g-link></div>
              <p class="text-grey-darker font-serif" v-html="excerpt(post, 200, ' ...')"></p>
            </div>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/images/authors/iman-sugirman.png" alt="Iman Sugirman">

              <div class="text-sm">
                <p class="text-black leading-none"><span v-if="post.author">Topic <g-link :to="`${post.author.path}/`" class="text-indigo text-bold capitalize no-underline border-b border-transparent hover:border-grey transition-border-color" v-if="post.author">{{ titleCase(post.author.title) }}</g-link></span></p>
                <p class="text-grey-black"><time :datetime="post.datetime" class="text-grey-black text-xs mb-2">{{ formatPublishDate(post.datetime) }}</time></p>

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
      return moment(this.post.datetime).format('YYYY MM DD');
    },
  },
  methods: {
    formatPublishDate(date) {
      return moment(date).format('YYYY MM DD');
    },
    imageLoadError (e) {
      e.target.src = `/images/authors/default.png`
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

  // computed: {
  //   avatar() {
  //     return `/images/authors/${this.$page.post.author.id}.png`
  //   },
  //   postIsOlderThanOneYear() {
  //     let postDate = moment(this.$page.post.datetime)
  //     return moment().diff(postDate, 'years') > 0 ? true : false
  //   }
  // },
}
</script>
