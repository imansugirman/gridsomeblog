<template>
  <Layout class="bg-white">
    <main>
      <header>
        <div class="container xl:max-w-xl mx-auto text-center px-6 py-10 md:py-32 border-b border-grey-lighter">
        
          <h2 class="text-3xl sm:text-5xl font-sans font-black mb-1">
            <g-link to="/" class="text-black no-underline tracking-tight">Iman Sugirman</g-link>
          </h2>
          <h5 class="text-grey-dark sm:text-2xl font-sans">Tutorial Blog, Cloud Server, Laravel dan Wordpress</h5>
        </div>
      </header>
      <section>
        <post-item v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
      </section>
      <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
      <site-footer class="py-8 sm:py-16" />
    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import config from '~/.temp/config.js'
import SiteFooter from '@/components/Footer'
import PostItem from '@/components/PostItem'
import Pagination from '@/components/Pagination'

export default {
  components: {
    PostItem,
    Pagination,
    SiteFooter,
  },
  metaInfo () {
    return {
      title: this.config.siteName,
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: this.config.siteDescription },
        { name: "twitter:title", content: this.config.siteName },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:image", content: '/images/bleda-card.png' },
        { name: "twitter:creator", content: "@cossssmin" },
        { property: "og:image", content: '/images/bleda-card.png' },
      ],
    }
  },
  computed: {
    config () {
      return config
    },
  },
}
</script>

<page-query>
  query Home ($page: Int) {
    posts: allPost (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          datetime: date (format: "YYYY MM DD HH:mm:ss")
          content
          excerpt
          description
          path
          cover
          tags {
            id
            title
            path
          }
          author {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query>
