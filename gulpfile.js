// See bottom of file and docs for usage instructions. // See gulp.init.js for module loading.
const {
  task, src, dest, watch, series, parallel, babel, sass, autoprefixer, postcss, zip, del, pump, browsersync, awspublish, log, msg, aws, uglify, cssnano
} = init = require('./gulp.init.js')

task('publish-aws-task', () => {
  // Example terminal command to publish to S3 bucket
  // AWS_CREDENTIALS_FILE="~/.aws-credentials.js" npm run publish-aws

  aws.BUCKET_NAME = 'demo.sitename.com';
  aws.REGION      = 'us-east-1';
  aws.SOURCE_DIR  = './dist/**/*';
  // console.log(aws);
  if (!aws.ACCESS_KEY_ID || !aws.SECRET_ACCESS_KEY) { console.log(msg.awsCredentialsMissing); return; }

  var publisher = awspublish.create({
    region: aws.REGION,
    params: {
      Bucket: aws.BUCKET_NAME
    },
    "credentials": {
      "accessKeyId": aws.ACCESS_KEY_ID,
      "secretAccessKey": aws.SECRET_ACCESS_KEY,
      "signatureVersion": "v3"
    }
  });

  // define custom headers
  // var headers = {
  //   'Cache-Control': 'max-age=315360000, no-transform, public'
  // };

  // return src('./dist/**/*')
  return src(aws.SOURCE_DIR)
  // return src('./public/*.html')
    .pipe(publisher.publish())
    .pipe(publisher.sync())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    // .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
})

task('sass', () => // Compile Sass
  src([
    'src/assets/scss/*.+(scss|css)',
    // 'node_modules/fluidbox/src/css/fluidbox.scss'
  ])
  // .pipe( sourcemaps.init() )
  .pipe( sass({includePaths: ['node_modules/bootstrap/scss/']}) )
  .pipe( postcss([
    autoprefixer({ browsers: ['last 2 versions'], cascade: false }),
  ]))
  // .pipe( sourcemaps.write('.') )
  .pipe( dest('dist/assets/css') )
  .pipe( browsersync.stream() )
)

task('sass-build', () => // Compile minified Sass
  src([
    'src/assets/scss/*.+(scss|css)',
    'node_modules/fluidbox/src/css/fluidbox.scss'
  ])
  .pipe( sass({includePaths: ['node_modules/bootstrap/scss/']}) )
  .pipe( postcss([
    autoprefixer({ browsers: ['last 2 versions'], cascade: false }),
    cssnano()
  ]))
  .pipe( dest('dist/assets/css') )
  .pipe( browsersync.stream() )
)

task('js-build', cb => // Optimize and compile js
  pump([
    src([
      'src/assets/js/utils.js',
      'src/assets/js/theme.js',
      'src/assets/js/custom.js'
    ])
    .pipe( babel({ presets: ['env'] }) ),
    uglify(),
    dest('dist/assets/js'),
    browsersync.stream()
  ], cb)
)

task('js-dev', () => // Compile js
  src([
    'src/assets/js/utils.js',
    'src/assets/js/theme.js',
    'src/assets/js/custom.js'
  ])
  .pipe( babel({ presets: ['env'] }) )
  .pipe( dest('dist/assets/js') )
  .pipe( browsersync.stream() )
)

task('fa-css', () => // Copy FontAwesome to dist
  src([
    'node_modules/@fortawesome/fontawesome-free-webfonts/css/*.css'
  ])
  .pipe( dest('dist/assets/fa/css') )
  )

task('fa-webfonts', () => // Copy Webfonts files to dist
  src([
    'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*.*',
  ])
  .pipe( dest('dist/assets/fa/webfonts') )
)

task('images', () => // Copy images to dist
  src([
    'src/assets/img/**/*',
  ])
  .pipe( dest('dist/assets/img') )
)

task('video', () => // Copy images to dist
  src([
    'src/assets/video/**/*'
  ])
  .pipe( dest('dist/assets/video') )
)

task('html', () => // Copy html files to dist
  src([
    'src/*.html',
    '!src/**/_*/'
  ])
  .pipe( dest('dist') )
  .pipe( browsersync.stream() )
)

task('favicons', () => // Copy html files to dist
  src([
    'src/assets/favicons/*.+(png|ico|svg|webmanifest|xml)'
  ])
  .pipe( dest('dist/assets/favicons') )
  .pipe( browsersync.stream() )
)

task('vendor-js', () => // Copy third-party vendor js to dist
  src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/gsap/src/minified/TweenLite.min.js',
    'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js',
    'node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js',
    'node_modules/jarallax/dist/jarallax.min.js',
    'node_modules/aos/dist/aos.js',
    'node_modules/fluidbox/dist/js/jquery.fluidbox.min.js',
    'node_modules/owl.carousel/dist/owl.carousel.min.js',
    'src/assets/vendor/js/*.js'
  ])
  .pipe( dest('dist/assets/vendor/js') )
)

task('vendor-css', () =>
  src([
    'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
    'node_modules/owl.carousel/dist/assets/owl.theme.default.css',
    'node_modules/aos/dist/aos.css'
  ])
  .pipe( dest('dist/assets/vendor/css') )
)

task('watch', () => { // Watch files for changes & update browser during development
  browsersync.init({
    server: './dist',
    notify: false
  });

  const watcher = {
    sass: watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/assets/scss/*.scss',
        'src/assets/vendor/css/*.scss'
      ], parallel('sass')),

    html: watch('src/**/*.html', parallel('html')),
    js:   watch('src/assets/js/*.js', parallel('js-dev')),
    img:   watch('src/assets/img/**/*', parallel('images'))
  }

  watcher.sass.on('all', log)
  watcher.html.on('all', log)
  watcher.js.on  ('all', log)
  watcher.img.on ('all', log)
})

task('clean',  () => del('dist/**/*')) // Delete files in dist/ folder recursively before generating new files

task('clean-static-html',  () => del('../html/**/*', { force: true })) // Delete files in dist/ folder recursively before generating new files

task('static-html', cb => {
  src(['dist/**/*'])
  .pipe( dest('../html') )
  cb();
})

task('zip-dist', cb => {
  src(['dist/**/*'])
  .pipe(zip('static-html.zip'))
  .pipe( dest('../') )
  cb();
})

task('notify', cb => { log(msg.complete); cb(); })

// Common tasks that run in parallel
// const common_tasks = parallel('vendor-css', 'fa-css', 'fa-webfonts', 'html', 'vendor-js', 'images', 'favicons')
const common_tasks = parallel('fa-css', 'fa-webfonts', 'html', 'images', 'favicons')

// Main Build Tasks
task('build',       series('clean', common_tasks, 'sass-build', 'js-build', 'notify'))
task('dev',         series('clean', common_tasks, 'sass', 'js-dev', 'watch', 'notify'))
task('static',      series('clean-static-html', 'build', 'static-html'))
task('zip',         series('build', 'zip-dist'))
task('publish-aws', series('build', 'publish-aws-task'))
task('default',     series('dev'))
/**
    How to use:
    (run commands in console / terminal)

    Via NPM Scripts (* recommended *)
      npm run dev
      npm run build
      npm run static
      npm run zip

    Via Gulp CLI (* requires gulp-cli installed globally *)
      gulp dev
      gulp build
      gulp static
      gulp zip

    dev: is the development server with live browser reload as you edit files in /src/.

  build: is the final optimized production build. (no dev server)
         Use this when you have finished editing
         and want to optimize the css and js files.
         The dev output will work too, though,
         if you need non-minified versions of the files.

         In other words, you can use the files generated by both 'dev' and 'build'
         in your website. The difference is that 'build' optimizes your css and js files.

static: Copies all files in /gulp/dist/ to /html/

    zip: Zips all files in /gulp/dist/ into /static-html.zip

   Note: If you attempt to use the gulp command directly,
         i.e. 'gulp dev' instead of 'npm run dev',
         you will need to have gulp-cli installed globally.
         To install it use this command: npm i -g gulp-cli

*/
