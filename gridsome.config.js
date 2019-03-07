class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  siteName: 'Iman Sugirman Blog',
  siteDescription: "Blog Seputar Tutorial Coding, Cloud Server dan Pengalaman Web Developer Sehari-Hari",
  siteUrl: 'https://imans.me',
  titleTemplate: `%s | Hello`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'Material-Theme-Palenight'
        }]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        route: '/:slug',
        refs: {
          tags: {
            typeName: 'Tag',
            route: '/tag/:id',
            create: true
          },
          author: {
            typeName: 'Author',
            route: '/author/:id',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-64527992-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Iman Sugirman Blog',
          feed_url: 'https://imans.me/feed.xml',
          site_url: 'https://imans.me'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.fields.description,
          url: 'https://imans.me/' + node.slug,
          author: node.fields.author,
          date: node.fields.date
        }),
        output: {
          dir: './static',
          name: 'feed.xml'
        }
      }
    },
  ],

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss')('tailwind.js'),
        ])

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'src/**/*.vue',
                'src/**/*.js'
              ],
              extractors: [
                {
                  extractor: TailwindExtractor,
                  extensions: ['css', 'vue', 'js']
                }
              ],
              whitelistPatterns: [/shiki/]
            }),
          ])
        }

        return options
      })
  },
}
