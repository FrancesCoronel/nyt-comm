window.magnum.getFlags().indexOf("headlineBalancer")>0&&(window.magnum.headlineBalancer=function(){function e(){document.getElementById("headline").style.visibility="hidden",o()&&t(),document.getElementById("headline").style.visibility="visible"}function t(){var e=document.getElementById("headline");e.style.maxWidth="",n(e,e.clientHeight,0,e.clientWidth)}function n(e,t,i,o){var a;return i>=o?void(e.style.maxWidth=o+"px"):(a=(i+o)/2,e.style.maxWidth=a+"px",void(e.clientHeight>t?n(e,t,a+1,o):n(e,t,i+1,a)))}function i(e){return document.documentElement.className.indexOf(e)>0}function o(){var e,t,n,i,o,a,l;return a=document.getElementById("headline"),l=a.innerHTML,n=10,i=a.innerHTML.split(" "),o=document.createElement("span"),o.id="headline-first-word",o.innerHTML=i[0],i=i.slice(1),a.innerHTML="",a.appendChild(o),a.innerHTML+=" "+i.join(" "),o=document.getElementById("headline-first-word"),e=o.offsetHeight,t=a.offsetHeight,a.innerHTML=l,t-n>e}function a(){var e;return window.magnum.getFlags().indexOf("headlineBalancerEverywhere")>0||(e=document.querySelector('meta[property="article:top-level-section"]'),!(!e||"world"!==e.getAttribute("content"))||(i("section-us")||i("section-politics")||i("section-world")))}function l(){var e=document.getElementById("story").className,t=document.querySelector('meta[name="PT"]'),n=["has-headline-image-topper","has-vertical-full-bleed","has-full-bleed-image-lede","has-full-bleed-cover"],i;if(t&&"oak"===t.getAttribute("content"))return!1;for(i=0;i<n.length;i+=1)if(e&&e.indexOf(n[i])>0)return!1;return!0}function r(){return a()&&l()}var d,m={news:{fontName:"nyt-cheltenham",fontStyle:"italic",fontWeight:700},opinion:{fontName:"nyt-cheltenham",fontStyle:"normal",fontWeight:500},feature:{fontName:"nyt-cheltenham",fontStyle:"normal",fontWeight:200},magazine:{fontName:"nyt-mag-slab",fontStyle:"normal",fontWeight:"bold"},tMagFeature:{fontName:"schnyder-scond-normal-600",fontStyle:"normal",fontWeight:600},tMagNews:{fontName:"graphik-xcond-normal-600",fontStyle:"normal",fontWeight:600},upshot:{fontName:"nyt-franklin",fontStyle:"normal",fontWeight:300},informal:{fontName:"nyt-cheltenham",fontStyle:"normal",fontWeight:700}},c=function(){var e,n;document.getElementById("headline").style.visibility="hidden",d=i("section-magazine")?"magazine":i("section-upshot")?"upshot":i("section-t-magazine")&&i("tone-feature")?"tMagFeature":i("section-t-magazine")&&i("tone-news")?"tMagNews":i("tone-news")?"news":i("tone-opinion")?"opinion":i("tone-feature")?"feature":"news",e=m[d],n=new window.FontFaceObserver(e.fontName,{style:e.fontStyle,weight:e.fontWeight}),n.load().then(function(){o()&&t(),document.getElementById("headline").style.visibility="visible"},function(){document.getElementById("headline").style.visibility="visible"})};return{initialize:c,rebalanceHeadline:e,shouldRun:r}}());