if (window.magnum.getFlags().indexOf('headlineBalancer') > 0) {

    window.magnum.headlineBalancer = (function () {
        // which type of section/tone we are in
        var TYPE;

        // all the different types of fonts
        // and styles based off of tone and seciton
        var headlineTypes = {
            'news' : {
                fontName   : 'nyt-cheltenham',
                fontStyle  : 'italic',
                fontWeight : 700
            },
            'opinion' : {
                fontName   : 'nyt-cheltenham',
                fontStyle  : 'normal',
                fontWeight : 500
            },
            'feature' : {
                fontName   : 'nyt-cheltenham',
                fontStyle  : 'normal',
                fontWeight : 200
            },
            'magazine' : {
                fontName   : 'nyt-mag-slab',
                fontStyle  : 'normal',
                fontWeight : 'bold'
            },
            'tMagFeature' : {
                fontName   : 'schnyder-scond-normal-600',
                fontStyle  : 'normal',
                fontWeight : 600
            },
            'tMagNews' : {
                fontName   : 'graphik-xcond-normal-600',
                fontStyle  : 'normal',
                fontWeight : 600
            },
            'upshot' : {
                fontName   : 'nyt-franklin',
                fontStyle  : 'normal',
                fontWeight : 300
            },
            'informal' : {
                fontName   : 'nyt-cheltenham',
                fontStyle  : 'normal',
                fontWeight : 700
            }
        };

        // At this point the font will not have loaded.
        // so we keep hide it, pick the correct font in that
        // hasTone() if else block, then we load the font
        // then once it has loaded, we check to see if it
        // is multiple lines, and if it is, we balance the living seek out of it
        var initialize = function () {
            var headlineType;
            var font;

            // hide headline becuase the font hasnt loaded
            document.getElementById('headline').style.visibility = 'hidden';

            // figure out which font we are looking for
            // this is based off of tone and section
            if (hasTone('section-magazine')) {
                TYPE = 'magazine';
            } else if (hasTone('section-upshot')) {
                TYPE = 'upshot';
            } else if (hasTone('section-t-magazine') && hasTone('tone-feature')) {
                TYPE = 'tMagFeature';
            } else if (hasTone('section-t-magazine') && hasTone('tone-news')) {
                TYPE = 'tMagNews';
            } else if (hasTone('tone-news')) {
                TYPE = 'news';
            } else if (hasTone('tone-opinion')) {
                TYPE = 'opinion';
            } else if (hasTone('tone-feature')) {
                TYPE = 'feature';
            } else {
                // FALL BACK TO NEWS TONE IF THERE IS NONE
                TYPE = 'news';
            }

            // set the font based off of the tone and section
            headlineType = headlineTypes[TYPE];

            // FontFaceObserver tells us when the font has loaded.
            // It returns a promise

            font = new window.FontFaceObserver(headlineType.fontName, {
                style: headlineType.fontStyle,
                weight: headlineType.fontWeight
            });

            // Here is the promise
            // Once it loads, we check to see if
            // it is multiple lines. If it is, we
            // balance it, if it isnt we dont balance it
            //
            // PS: we have to set it visible regardless if the
            // font shows or not.
            font.load().then(function () {
                if (headlineIsMultipleLines()) {
                    balanceHeadline();
                }
                document.getElementById('headline').style.visibility = 'visible';
            }, function () {
                // set it to be visible even if it fails
                document.getElementById('headline').style.visibility = 'visible';
            });
        }

        function rebalanceHeadline() {
            document.getElementById('headline').style.visibility = 'hidden';
            if (headlineIsMultipleLines()) {
                balanceHeadline();
            }
            document.getElementById('headline').style.visibility = 'visible';
        }

        // HELPER FUNCTION -- initializes recursive binary search
        // algorithm to "balance that horsed headline"
        function balanceHeadline() {
            var headline = document.getElementById('headline');
            headline.style.maxWidth = '';
            squeezeContainer(headline, headline.clientHeight, 0, headline.clientWidth);
        }

        // Make the headline element as narrow as possible while maintaining its current height (number of lines). Binary search.
        function squeezeContainer(headline, originalHeight, bottomRange, topRange) {
            var mid;
            if (bottomRange >= topRange) {
                headline.style.maxWidth = topRange + 'px';
                return;
            }
            mid = (bottomRange + topRange) / 2;
            headline.style.maxWidth = mid + 'px';

            if (headline.clientHeight > originalHeight) {
                // we've squoze too far and headline has spilled onto an additional line; recurse on wider range
                squeezeContainer(headline, originalHeight, mid+1, topRange);
            } else {
                // headline has not wrapped to another line; keep squeezing!
                squeezeContainer(headline, originalHeight, bottomRange+1, mid);
            }
        }

        // Takes a string
        // Checks to see if that class is on the head HTML element
        function hasTone(tone) {
            return document.documentElement.className.indexOf(tone) > 0;
        }

        // function to see if a headline is multiple lines
        // we only want to break if the headline is multiple lines
        //
        // We achieve this by turning the first word into a span
        // and then we compare the height of that span to the height
        // of the entire headline. If the headline is bigger than the
        // span by 10px we balance the headline.
        function headlineIsMultipleLines() {
            var firstWordHeight;
            var headlineHeight;
            var HEIGHT_OFFSET;
            var headlineWords;
            var firstWord;
            var headline;
            var ORIGINAL_HEADLINE_TEXT;

            headline = document.getElementById('headline');
            ORIGINAL_HEADLINE_TEXT = headline.innerHTML;

            // usually there is around a 5px discrepency between
            // the first word and the height of the whole headline
            // so subtract the height of the headline by 10 px and
            // we should be good
            HEIGHT_OFFSET = 10;

            // get all the words in the headline as
            // an array -- will include punctuation
            //
            // this is used to put the headline back together
            headlineWords = headline.innerHTML.split(' ');

            // make span for first word and give it an id
            // so we can access it in le dom
            firstWord = document.createElement('span');
            firstWord.id = 'headline-first-word';
            firstWord.innerHTML = headlineWords[0];

            // this is the entire headline
            // as an array except for first word
            //
            // we will append it to the headline after the span
            headlineWords = headlineWords.slice(1);

            // empty the headline and append the span to it
            headline.innerHTML = '';
            headline.appendChild(firstWord);

            // add the rest of the headline back to it
            headline.innerHTML += ' ' + headlineWords.join(' ');

            // update the first word variable in the dom
            firstWord = document.getElementById('headline-first-word');

            firstWordHeight = firstWord.offsetHeight;
            headlineHeight = headline.offsetHeight;
            // restore the original headline text
            headline.innerHTML = ORIGINAL_HEADLINE_TEXT;

            // compare the height of the headline and the height of the first word
            return headlineHeight - HEIGHT_OFFSET > firstWordHeight;

        } // end headlineIsMultipleLines

        // returns true or false if we
        // are in either the us, world
        // or the politics section
        function sectionIsOnWhitelist() {
            var topLevelSectionMetaTag;

            if (window.magnum.getFlags().indexOf('headlineBalancerEverywhere') > 0) {
                return true;
            } else {
                // first we check all the meta tags to see if
                // we are in the world section. NOTE: world is a
                // 'top level section' which means we have to check
                // via the meta tags
                topLevelSectionMetaTag = document.querySelector('meta[property="article:top-level-section"]');
                if (topLevelSectionMetaTag && topLevelSectionMetaTag.getAttribute('content') === 'world') {
                    return true;
                }

                // if we arent in world, return true or false if
                // we are in either the us or the politics section
                //
                // ALSO: sometimes it's just straight up the world section
                // so we have to check it on the top html element
                return hasTone('section-us') || hasTone('section-politics') || hasTone('section-world');
            }
        }

        // A vanilla article is a plain old nyt5
        // article that does not use, full bleed,
        // full bleed cover, vertical full bleed,
        // or the pro topper
        function isVanillaArticle() {
            var storyClasses = document.getElementById('story').className;
            var articlePageType = document.querySelector('meta[name="PT"]');
            var fullBleedTypes = [
                'has-headline-image-topper',
                'has-vertical-full-bleed',
                'has-full-bleed-image-lede',
                'has-full-bleed-cover'
            ];
            var i;

            // dont run on an oak article
            if (articlePageType && articlePageType.getAttribute('content') === 'oak') {
                return false;
            }

            // return false if one of these classes are
            // on the story element
            for (i = 0; i < fullBleedTypes.length; i += 1) {
                if (storyClasses && storyClasses.indexOf(fullBleedTypes[i]) > 0) {
                    return false;
                }
            }

            return true;
        }

        function shouldRun() {
            return sectionIsOnWhitelist() && isVanillaArticle();
        }

        return {
            initialize: initialize,
            rebalanceHeadline: rebalanceHeadline,
            shouldRun: shouldRun
        };

    })(); // end magnum headlineBalancer

} // end 4F if block