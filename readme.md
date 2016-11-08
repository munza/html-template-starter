# HTML Template Starter

This is a starter kit for building HTML templates. It includes the following plugins.
- Gulp
- Autoprefixer
- SCSS
- JavaScript Concatenation
- CSS Minification
- JavaScript Uglifier
- Image Minifier
- Nunjucks Template
- Browser Sync (Live Reload)
- Bootstrap SASS
- jQuery

## Installation
- `git clone git@github.com:munza/html-template-starter.git` or `git clone https://github.com/munza/html-template-starter.git`
- `cd html-template-starter`
- `yarn` or `npm install`
- `cp config.sample.json config.json`

## Usage

### Build
- `gulp build` or `gulp`
- Find built code in `dist` directory.

### Watch
- `gulp`
- `gulp watch`
- SCSS, JS, Nunjucks, Fonts, Images will be auto compiled on change.

### Development (with Live Reload Server)
- `gulp`
- `gulp serve`
- Browser will auto load `localhost:3000` and continue auto reloading on file change.

### Production
- `gulp`
- `gulp production`
- Minified code will be found in `dist` directory along with their respective unminified file.

### Clean
- `gulp clean`
- `dist` directory will be cleaned.

## Customization
- Edit `config.json` file for customizing `src` and `dest` path for CSS, JS, Fonts, Images, Autoprefixer, BrowserSync, Nunjucks.
- You can directly copy files in the `dist` folder by adding them under `copy` key.

## Issues
Please create issues in if anyone find any bug or have a suggestion.

## License
MIT License
