// gulp.init.js
const gulp          = require('gulp')
const { task, src, dest, watch, series, parallel } = gulp
const path          = require('path')
const untildify     = require('untildify');
const babel         = require('gulp-babel')
const sass          = require('gulp-sass')
const autoprefixer  = require('autoprefixer')
const postcss       = require('gulp-postcss')
const uglify        = require('gulp-uglify');
const cssnano       = require('cssnano');
const zip           = require('gulp-zip')
const del           = require('del')
const pump          = require('pump')
const browsersync   = require('browser-sync').create()
const awspublish    = require('gulp-awspublish');
const log           = (event = '', path = '') => console.log('%s %s', path, event)
const msg           = {
  complete: '*******************************************************\n ***** Build Complete: Files are in /dist/ folder. *****\n *******************************************************',
  awsCredentialsMissing: '******************************************************************\n\n  AWS Authentication Error:\n\n  One or more of your Amazon AWS credentials are missing.\n\n******************************************************************',
}
/*
  Feedback:
    This gulp configuration is always improving and evolving.
    If you have any suggestions or find errors please send them to
    support.

    Ticket:        https://devwax.freshdesk.com/
    Email:         support@devwax.com
    Social Media:  https://devwax.com
*/

// AWS Credentials Loader
const aws = {};
/*
 METHOD 1: Using individual environment variables at command line:
 Command:
   ACCESS_KEY_ID="env-key-id" SECRET_ACCESS_KEY="env-key-secret" npm run publish-aws
*/
if (process.env.ACCESS_KEY_ID || process.env.SECRET_ACCESS_KEY) {
  aws.ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
  aws.SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
  aws.BUCKET_NAME = process.env.BUCKET_NAME;
  aws.REGION = process.env.REGION || 'us-east-1';
  aws.SOURCE_DIR = process.env.SOURCE_DIR || './dist/**/*';
}

/*
METHOD 2: Loading config file:
Command:
  AWS_CREDENTIALS_FILE="./.aws-credentials.js" npm run publish-aws
*/
// if (!aws.ACCESS_KEY_ID || !aws.SECRET_ACCESS_KEY) {
if (process.env.AWS_CREDENTIALS_FILE) {
  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME, REGION, SOURCE_DIR } = require(path.resolve(untildify(process.env.AWS_CREDENTIALS_FILE)));
  if (ACCESS_KEY_ID && SECRET_ACCESS_KEY) {
    aws.ACCESS_KEY_ID = ACCESS_KEY_ID;
    aws.SECRET_ACCESS_KEY = SECRET_ACCESS_KEY;
    aws.BUCKET_NAME = BUCKET_NAME;
    aws.REGION = REGION || 'us-east-1';
    aws.SOURCE_DIR = SOURCE_DIR || './dist/**/*';
    // if (!aws.BUCKET_NAME) {
    //   console.log('***** Missing BUCKET_NAME environment variable *****');
    // }
  } else {
    console.log('****** Missing ACCESS_KEY_ID and/or SECRET_ACCESS_KEY in '+process.env.AWS_CREDENTIALS_FILE+' ******');
  }
} else {
  // No AWS_CREDENTIALS_FILE env variable provided at command line
}

// End: AWS Credentials Loader

// Not used in gulpfile.js
// const sourcemaps    = require('gulp-sourcemaps')
// const uncss         = require('postcss-uncss');

module.exports = {
  gulp,
  task, src, dest, watch, series, parallel,
  babel,
  sass,
  autoprefixer,
  postcss,
  zip,
  del,
  pump,
  browsersync,
  awspublish,
  log,
  msg,
  aws,
  uglify,
  cssnano
}
