((function($){
  var currentNdx = 0;
  var rotations = 1;
  var HOLD_TIME = 600;
  var FADE_DURATION = 4500;

  var $splashStaging;
  var $splashDisplay;
  var splashes = [];

  function nextSplash() {
    ++rotations;
    var next = rotations % 3;
    splashes[next].fadeIn(FADE_DURATION);
    splashes[currentNdx].fadeOut(FADE_DURATION, function() {
      setTimeout(nextSplash, HOLD_TIME);
    });
    currentNdx = next;
  }

   $(document).ready(function() {
     $splashStaging = $('body.home .splash-staging');
     if ($splashStaging.length) {
       $splashDisplay = $('body.home .splash:first');

       $.each($splashStaging.find('.rotation'), function(i, splash) {
         $splashDisplay.append(splash);
         splashes.push($(splash));
       });

       $(window).load(function() {
         setTimeout(nextSplash, HOLD_TIME / 2);
       });
     }
   });

})(jQuery));
