// var slideIndex = 1;
// showDivs(slideIndex);
//
// function plusDivs(n) {
//     showDivs(slideIndex += n);
// }
//
// function showDivs(n) {
//     var i;
//     var x = document.getElementsByClassName("mySlides");
//     if (n > x.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = x.length} ;
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     x[slideIndex-1].style.display = "block";
// }
<!-- Yandex.Metrika counter -->
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter40646155 = new Ya.Metrika({
                id:40646155,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");

<!-- CarrotQuest BEGIN -->
(function(){
  function Build(name, args){return function(){window.carrotquestasync.push(name, arguments);} }
  if (typeof carrotquest === 'undefined') {
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = '//cdn.carrotquest.io/api.min.js';
    var x = document.getElementsByTagName('head')[0]; x.appendChild(s);
    window.carrotquest = {}; window.carrotquestasync = []; carrotquest.settings = {};
    var m = ['connect', 'track', 'identify', 'auth', 'open', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'];
    for (var i = 0; i < m.length; i++) carrotquest[m[i]] = Build(m[i]);
  }
})();
carrotquest.connect('6573-ab24bd60d2fcd86f48395bcd54c');

<!-- CarrotQuest END -->

<!-- Google analytics-->
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-71495228-1', 'auto');
ga('send', 'pageview');
