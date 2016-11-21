# www-v2


##Setting up local environment for dev
The website is based upon Jekyll, so follow the instructions for installing that first [Jekyll](https://jekyllrb.com/docs/installation/).

The deployment uses [bundler](http://bundler.io/), so best install that too.
```bash
gem install bundler
```

Then you can run bundler to get all the gems setup.

```bash
bundle install
```

## Building
The project uses [jekyll multi-site](https://github.com/sumdog/jekyll-multisite) to create the groups 4 branded sites.  Mutlisite enables the sitemap to be generated correctly and also enables pages to be built with filtering for particular brands.

This means that the stanard Jekyll Build / Serve doesn't show the acutal output.

The commands are:

####Bicton College Site
```bash
jekyll build --config _config.yml,_site_bicton_ac_uk.yml
```

####Cornwall College Site
```bash
jekyll build --config _config.yml,_site_cornwall_ac_uk.yml
```

####Duchy College Site
```bash
jekyll build --config _config.yml,_site_duchy_ac_uk.yml
```

####Falmouth Marine School Site
```bash
jekyll build --config _config.yml,_site_falmouthmarineschool_ac_uk.yml
```

To view the sites local swap build for serve.

ps. there is an issue with multi-site, if the folder _site isn't already there it will error, so that needs to be created.

