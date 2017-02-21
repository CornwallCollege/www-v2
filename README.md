[![Build Status](https://travis-ci.org/CornwallCollege/www-v2.svg?branch=master)](https://travis-ci.org/CornwallCollege/www-v2)

# www-v2


##Setting up local environment for dev
Firstly, clone this repo to your local machine.

The website is based upon Jekyll, so follow the instructions for installing that first [Jekyll](https://jekyllrb.com/docs/installation/).

Goto the root of this repository on your local machine.

The deployment uses [bundler](http://bundler.io/), so best install that too.
```bash
gem install bundler
```

Then you can run bundler to get all the gems setup.

```bash
bundle install
```

You will also need node.js and npm, download and install node from here [Nodejs](https://nodejs.org/en/). Once installed you can download the packages that the build depends upon.

```bash
npm install
```

## Building
The project uses [jekyll multi-site](https://github.com/sumdog/jekyll-multisite) to create the groups 4 branded sites.  Mutlisite enables the sitemap to be generated correctly and also enables pages to be built with filtering for particular brands.

This means that the stanard Jekyll Build / Serve doesn't show the acutal output.

To make the build and development process easier, [Gulp](https://www.npmjs.com/package/gulp) is used to build and serve the website.

The commands that are available are:

For standard development, with rebuilding on file change and auto-browser refreshing

```bash
gulp serve-bicton
```

```bash
gulp serve-cornwall
```

```bash
gulp serve-duchy
```

```bash
gulp serve-falmouth
```

It's quite possible that on Linux you will initial get an error due to the number of files that need to be watched by Jekyll and BrowserServe. To solve this and increase the limit run the following commands:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

To see how the final site looks, including minification and cleaning up css

```bash
gulp build-bicton
```

```bash
gulp build-cornwall
```

```bash
gulp build-duchy
```

```bash
gulp build-falmouth
```

