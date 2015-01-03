/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    build_dir: 'build',
    compile_dir: 'dist',

    app_files: {
        js: [ 'src/**/*.js' ],
        external: [ 'external/**/*.js' ],
        i18n: [ 'i18n/**/*.js' ],
        less: 'less/grid.less',
        jsunit: [ 'test/**/*.js' ]
    },

    doc_files: {
        content: [ './**/*.md' ],
        contentdir: 'docs/content',
        template: [ 'docs/template/**/*' ],
        helpers: [ 'docs/template/helpers/*.js' ],
        layoutdir: 'docs/template/layout',
        layout: 'default.hbs',
        less: 'docs/template/less/docs.less',
        js: 'docs/template/*.js',
        partials: 'docs/template/partials/*.hbs'
    },

    test_files: {
        js: []
    },

    vendor_files: {
        js: [
            'vendor/jquery/dist/jquery.min.js'
        ],
        css: [],
        assets: []
    }
};