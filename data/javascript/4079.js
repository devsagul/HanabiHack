'use strict';

module.exports.mainNav = function (page) {
    console.log(this.options.env);
    console.log(page);
    // this.context === page
    // console.log(this.context);
    // var fs = require('fs'),
    // template, data = {},
    // pages = options.collections.inMenu.items[0].pages;



    // data.menuItems = pages.map(function (menuPage) {
    //     var current = menuPage.isCurrentPage;

    //     if (! current && page.post  && options.pageCategory(page.categories) === menuPage.slug) {
    //         current = true;
    //     }
    //     return {
    //         currentPage: current,
    //         link: Handlebars.helpers['url'](menuPage.dest),
    //         name: menuPage.data.shortTitle
    //     };
    // });

    // template = Handlebars.compile(fs.readFileSync('src/bonnet/partials/main-nav.hbs', 'utf8'));
    // return new Handlebars.SafeString(template(data));
};
