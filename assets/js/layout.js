(function () {
    'use strict';

    var dataElement = document.getElementById('page-config-data');
    var pageConfig = dataElement ? JSON.parse(dataElement.innerHTML).pageconfig : {};
    var ledeMediaSize = pageConfig.ledeMediaSize;

    var pageLayout = Math.random() < 0.5 ? 'a' : 'b';
    var html = document.getElementsByTagName('html')[0];
    var articleToneTag = document.getElementById('article-tone');
    var articleTone = articleToneTag ? articleToneTag.getAttribute('content') : '';

    var featureFlags = window.magnum.getFlags();
    var onlyLayoutA = featureFlags.indexOf('onlyLayoutA') > -1;

    // CP-1: Pivot for article simplification
    if (featureFlags.indexOf('simple') > -1 && document.location.pathname.match(/\/story\//)) {
        // page layout is always 'a' now
        html.setAttribute('data-page-layout', 'a');

    } else {

        if (ledeMediaSize === 'none' || ledeMediaSize === 'small') {
            pageLayout = 'a';
        }

        if (ledeMediaSize === 'jumbo') {
            pageLayout = 'b';
        }

        if (articleTone === 'informal') { // always show page layout "a" if an article's tone has been marked "informal"
            pageLayout = 'a';
        }

        /**
         * https://jira.nyt.net/browse/CP-25: Force layout A.
         * This could resolve ad collisions.
         **/
        if (onlyLayoutA) {
            pageLayout = 'a';
        }

        /**
         * https://jira.nyt.net/browse/CP-124
         * This logic makes little sense.  Post article-simplification, we will no
         * longer need this since we have the concept of interruptors.
        **/
        if (ledeMediaSize === 'none' || ledeMediaSize === 'small' || ((ledeMediaSize === 'large' || ledeMediaSize === 'jumbo') && pageLayout === 'a')) {
            html.className += ' has-big-ad';
        }

        html.setAttribute('data-page-layout', pageLayout);
    }

    html.setAttribute('data-lede-media-size', ledeMediaSize);
    html.setAttribute('data-keywords', pageConfig.keywords);
})();