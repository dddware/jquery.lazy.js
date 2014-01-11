/**
 * Tao - jquery.lazy.js
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
                        var $targets = this.getTargets(),
                            length = $targets.length,
                            $result;

                        // Put images to lazyload into containers
                        $targets.each(function (index) {
                            var $img = $(this),
                                display = $img.css('display');

                            // Unset source to prevent loading
                            $img.attr('data-src', function () {
                                return $(this).attr('src');
                            });

                            $img.removeAttr('src');

                            if (display == 'inline') {
                                display = 'inline-block';
                            }

                            // Hide image to be able to fade it in later
                            $img.css('opacity', 0);

                            // Give the container the image's dimensions, a correct display value
                            // and a loading spinner as a background
                            $div = $('<div></div>')
                                .width($img.width())
                                .height($img.height())
                                .css('display', display)
                                .css('background', 'url("http://www.labosante.com/components/ajaxWishList/images/loading.gif") no-repeat center center');

                            // Indiana Jones
                            $img.clone().appendTo($div);
                            $img.replaceWith($div);

                            if (index == length - 1) {
                                $result = Lazy.getTargets();
                            }
                        });

                        return $result;
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