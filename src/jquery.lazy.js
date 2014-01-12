/**
 * Lazy - jquery.lazy.js
 * Lazy-loaded images
 *
 * @author neemzy <tom.panier@free.fr>
 * @see https://github.com/dddware/jquery.lazy.js
 * @see http://www.zaibatsu.fr
 * @thx victordarras
 */

(function($)
{
    $.fn.extend({
        lazy: function() {
            var that = this,
                $win = $(window),

                Lazy = {
                    selector: that.selector,

                    getTargets: function() {
                        return $(Lazy.selector);
                    },

                    prepareTargets: function() {
                        var $targets = Lazy.getTargets(),
                            length = $targets.length,
                            $result;

                        $targets.attr('data-src', function () {
                            return $(this).attr('src');
                        }).removeAttr('src').css('opacity', 0);

                        return $targets;
                    },

                    init: function() {
                        var $targets = Lazy.prepareTargets();

                        $win
                            .on('load.lazy', function () {
                                // Fade loaded images in
                                $targets.on('load.lazy', function () {
                                    var $img = $(this);

                                    $img.animate({ opacity: 1 }, 'fast', 'linear', function () {
                                        $img.off('.lazy');
                                    });
                                });

                                // Trigger loading on scroll
                                $targets.on('scrolledTo.lazy', function () {
                                    var $img = $(this);

                                    $img.attr('src', function () {
                                        return $img.data('src');
                                    });
                                });

                                Lazy.update($targets);
                            })

                            .on('scroll.lazy resize.lazy', function () {
                                Lazy.update();
                            });
                    },

                    update: function($targets) {
                        $targets = $targets || Lazy.getTargets();

                        if ($targets.length) {
                            // Check each image's scroll-relative position
                            // and trigger its loading if we reached it

                            $targets.each(function () {
                                var $img = $(this);

                                if ($img.offset().top - $win.height() <= window.pageYOffset) {
                                    $img.trigger('scrolledTo.lazy');
                                }
                            });
                        } else {
                            // There is nothing left to do
                            $win.off('.lazy');
                        }
                    }
                };

            Lazy.init();
        }
    });
})
(jQuery);