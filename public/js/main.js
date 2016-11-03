(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *  Functions
 */

'use strict';

function isIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return false;
}

var usingIE = isIE();
var is_safari = navigator.userAgent.indexOf("Safari") > -1;

if (usingIE) {
    $('body').addClass('ie');
}

if (is_safari) {
    $('body').addClass('safari');
}

function removeActiveCity() {
    $('[data-pin-city]').removeClass('active city');
}

function removeActiveModal() {
    $('body').removeClass('modal');
    $('[data-modal]').removeClass('active');
}

function removeActiveGalleryButton() {
    $('[data-gallery-button]').removeClass('active');
    $('[data-gallery-block]').removeClass('active');
}

function galleryOpenAction(galleryType) {
    removeActiveGalleryButton();
    $('[data-gallery-button="' + galleryType + '"]').addClass('active');
    $('[data-gallery-block="' + galleryType + '"]').addClass('active');
}

function removeActiveComments(container) {
    container.find('[data-page-slider-comment]').removeClass('active');
}

function drawPath(path, options) {
    options = options || {};
    var duration = options.duration || 5000;
    var easing = options.easing || 'ease-in-out';
    var reverse = options.reverse || false;
    var undraw = options.undraw || false;
    var callback = options.callback || function () {};
    var length = options.length || path.getTotalLength();

    var dashOffsetStates = [length, 0];
    if (reverse) {
        dashOffsetStates = [length, 2 * length];
    }
    if (undraw) {
        dashOffsetStates.reverse();
    }

    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition = 'none';

    var dashArray = path.style.strokeDasharray || path.getAttribute("stroke-dasharray");

    if (dashArray != '') {
        var dashLength = dashArray.split(/[\s,]/).map(function (a) {
            return parseFloat(a) || 0;
        }).reduce(function (a, b) {
            return a + b;
        });
        var dashCount = length / dashLength + 1;
        var a = new Array(Math.ceil(dashCount)).join(dashArray + " ");
        path.style.strokeDasharray = a + '0' + ' ' + length;
    } else {
        path.style.strokeDasharray = length + ' ' + length;
    }
    path.style.strokeDashoffset = dashOffsetStates[0];
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + duration + 'ms ' + easing;
    path.style.strokeDashoffset = dashOffsetStates[1];
    setTimeout(function () {
        path.style.strokeDasharray = dashArray;
        callback();
    }, duration);
}

/*
 *  START Click Events
 */

$('[data-pin="click"]').click(function () {
    var $this = $(this);
    var $city = $this.closest('[data-pin-city]');
    removeActiveCity();
    $city.addClass('active big');
    $('[data-pin-city="jurmala"]').removeClass('big').addClass('active');

    var reverse = false;
    if ($city.attr('data-pin-city') == 'paris' || $city.attr('data-pin-city') == 'madrid') {
        reverse = true;
    }

    if (!usingIE) {
        drawPath($city.find('path')[0], {
            duration: 2000,
            reverse: reverse
        });
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).parents().is('[data-pin-city]')) {
        removeActiveCity();
    }
});

$('[data-modal-open]').click(function () {
    var $this = $(this);
    var modal = $this.attr('data-modal-open');
    removeActiveModal();
    $('[data-modal="' + modal + '"]').addClass('active');
    if (modal == 'gallery') {
        var galleryType = $this.attr('data-gallery');
        galleryOpenAction(galleryType);
    }
    $('body').addClass('modal');
});

$('[data-modal-close]').click(function () {
    removeActiveModal();
});

$('[data-gallery-button]').click(function () {
    var $this = $(this);
    var galleryType = $this.attr('data-gallery-button');
    galleryOpenAction(galleryType);
});

$('[data-modal]').click(function () {
    removeActiveModal();
});

$('[data-modal-inner]').click(function (e) {
    e.stopPropagation();
});

/*
 *  END Click Events
 */

/*
 *  START Slider Gallery
 */


    $('[data-gallery-block]').each(function() {
        var $this = $(this);
        var galleryType = $this.attr('data-gallery-block');

        var gallery = new Swiper('[data-gallery-block="'+ galleryType +'"]', {
            loop: true,
            nextButton: '[data-button-gallery="next"]',
            prevButton: '[data-button-gallery="prev"]',
            onClick: function onClick(swiper) {
                gallery.slideNext();
            }
        });
    });
//
// var vrGallery = new Swiper('[data-gallery-block="3"]', {
//     loop: true,
//     nextButton: '[data-button-gallery="next"]',
//     prevButton: '[data-button-gallery="prev"]',
//     onClick: function onClick(swiper) {
//         vrGallery.slideNext();
//     }
// });
//
// var photoGallery = new Swiper('[data-gallery-block="4"]', {
//     loop: true,
//     nextButton: '[data-button-gallery="next"]',
//     prevButton: '[data-button-gallery="prev"]',
//     onClick: function onClick(swiper) {
//         photoGallery.slideNext();
//     }
// });
//
// var videoGallery = new Swiper('[data-gallery-block="5"]', {
//     loop: true,
//     nextButton: '[data-button-gallery="next"]',
//     prevButton: '[data-button-gallery="prev"]',
//     onClick: function onClick(swiper) {
//         videoGallery.slideNext();
//     }
// });
//
// var demoGallery = new Swiper('[data-gallery-block="6"]', {
//     loop: true,
//     nextButton: '[data-button-gallery="next"]',
//     prevButton: '[data-button-gallery="prev"]',
//     onClick: function onClick(swiper) {
//         demoGallery.slideNext();
//     }
// });

//===========================================================================================

$('[data-page-slider]').each(function () {
    var $this = $(this);
    var $galleryContainer = $this.find('[data-page-slider-container]');
    var $nextButton = $this.find('[data-page-slider-button-next]');
    var $prevButton = $this.find('[data-page-slider-button-prev]');
    var pageGallery = new Swiper($galleryContainer, {
        loop: true,
        nextButton: $nextButton,
        prevButton: $prevButton,
        onSlideChangeStart: function onSlideChangeStart(swiper) {
            var $activeSlider = $galleryContainer.find('[data-swiper-slide-index].swiper-slide-active').attr('data-swiper-slide-index');
            var $activeComment = $this.find('[data-page-slider-comment="' + $activeSlider + '"]');
            removeActiveComments($this);
            $activeComment.addClass('active');
        }
    });
});

/*
 *  END Slider Gallery
 */

window.sr = ScrollReveal();
sr.reveal('.content', { viewFactor: 0.1 });
sr.reveal('.room-show', { viewFactor: 0.8 });

var sorting = {
    sortList: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]],
    headers: {
        7: {
            sorter: false
        },
        8: {
            sorter: false
        }
    }
}
    $("[data-sort-table]").tablesorter(sorting);

// AJAX add table content
// $(window).bind('scroll', function() {
//     if($(window).scrollTop() >= $('[data-sort-table]').offset().top + $('[data-sort-table]').outerHeight() - window.innerHeight) {
//         $.get($("[data-sort-table]").attr('data-url'), function(html) {
//             $("table tbody").append(html);
//             $("[data-sort-table]").trigger("update");
//             var sorting = [[2,1],[0,0]];
//             $("[data-sort-table]").trigger("sorton",[sorting]);
//         });
//     }
// });


    /*
     *  START Table Plans FILTERS
     */


    $('[data-table-filter-clear]').click(function() {
        $('[data-table-filters] select').each(function() {
            var $this = $(this);
            $this[0].selectedIndex = 0;
        });
        sendSelectFilters();
    });

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var GETparams = getSearchParameters();
    if (GETparams.house) {
        $('[data-table-filters] select[name="house"]').val(GETparams.house);
        sendSelectFilters();
    }

    $('[data-table-filters] select').change(function() {
        sendSelectFilters();
    });

    $('[data-render-filter]').click(function() {
        var $this = $(this);
        var house = $this.attr('data-render-filter');
        $('[data-table-filters] select[name="house"]').val(house);
        sendSelectFilters();
    });

    if ($('[data-table-change-by-filters]').length > -1) {
        sendSelectFilters();
    }

    function sendSelectFilters() {
        var filterData = '';
        $('[data-table-filters] select').each(function() {
            var $this = $(this);
            var thisName = $this.attr('name');
            filterData += thisName;
            filterData += '=';
            filterData += $this.val();
            filterData += '&';
        });
        
        $('[data-loader="loader"]').addClass('active');
        $.ajax({
            url: 'http://'+ location.hostname +'/public/ajax/getplans',
            type: 'POST',
            data: filterData,
            dataType: 'html',
            success: function (response, err) {
                $('[data-loader="loader"]').removeClass('active');
                $('[data-table-change-by-filters]').find('[data-remove-this-plz]').remove();
                $(response).insertAfter('[data-table-change-by-filters] [data-insert-here-plz]');
                sr.reveal('.room-show', { viewFactor: 0.8 });
                $("[data-sort-table]").trigger("update");
            },
            error: function (response, err) {
                console.log(response);
                console.log(err);
            }
        });
    }
    /*
     *  END Table Plans FILTERS
     */


if ($('[data-pin-city="moskva"]').length > 0) {
    $('[data-pin-city="moskva"]').find('[data-pin="click"]').trigger('click');
}

$(document).ready(function (e) {
    $.fn.maphilight.defaults = {
        fill: true,
        fillColor: '000000',
        fillOpacity: 0.3,
        stroke: false,
        strokeColor: 'transparent',
        strokeOpacity: 1,
        strokeWidth: 1,
        fade: true,
        alwaysOn: false,
        neverOn: false,
        groupBy: false,
        wrapClass: 'image-wrap',
        shadow: false,
        shadowX: 0,
        shadowY: 0,
        shadowRadius: 6,
        shadowColor: '000000',
        shadowOpacity: 0.8,
        shadowPosition: 'outside',
        shadowFrom: false
    };

    $('img[usemap]').rwdImageMaps();
    $('img[usemap]').maphilight();

    $('map#render area').each(function () {
        var $area = $(this),
            $currentHouse = $('[data-house="' + $area.data('section') + '"]');

        $area.on('mouseover', function () {
            $currentHouse[0].classList.add('active');
        });

        $area.on('mouseout', function () {
            $currentHouse[0].classList.remove('active');
        });

        $currentHouse.on('mouseover', function () {
            $area.trigger('mouseover', $(this));
        });

        $currentHouse.on('mouseout', function () {
            $area.trigger('mouseout', $(this));
        });
    });
});

$(window).bind('resize', function () {
    $(window).resize(function () {
        $('img[usemap]').maphilight();
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zZXJnL0Rvd25sb2Fkcy9JbnYxcy1kay0wYmY2ODcwMzAwZWQvYXBwL3NyYy9qcy9hcHAuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDSUEsU0FBUyxJQUFJLEdBQUc7QUFDWixRQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzs7QUFFcEMsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixRQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7QUFDVixlQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0RTs7QUFFRCxRQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLFFBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtBQUNiLFlBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsZUFBTyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbEU7O0FBRUQsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixRQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7QUFDVixlQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVB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QVEsRUFBRSxZQUFXO0FBQ2hDLEtBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFDakI7QUFDSSxTQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDakMsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiAgRnVuY3Rpb25zXG4gKi9cblxuZnVuY3Rpb24gaXNJRSgpIHtcbiAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcbiAgICBpZiAobXNpZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgIH1cblxuICAgIHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcbiAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgdmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcocnYgKyAzLCB1YS5pbmRleE9mKCcuJywgcnYpKSwgMTApO1xuICAgIH1cblxuICAgIHZhciBlZGdlID0gdWEuaW5kZXhPZignRWRnZS8nKTtcbiAgICBpZiAoZWRnZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhlZGdlICsgNSwgdWEuaW5kZXhPZignLicsIGVkZ2UpKSwgMTApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIHVzaW5nSUUgPSBpc0lFKCk7XG52YXIgaXNfc2FmYXJpID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpID4gLTE7XG5cbmlmICh1c2luZ0lFKSB7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdpZScpO1xufVxuXG5pZiAoaXNfc2FmYXJpKSB7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdzYWZhcmknKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlQ2l0eSgpIHtcbiAgICAkKCdbZGF0YS1waW4tY2l0eV0nKS5yZW1vdmVDbGFzcygnYWN0aXZlIGNpdHknKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlTW9kYWwoKSB7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbCcpO1xuICAgICQoJ1tkYXRhLW1vZGFsXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlR2FsbGVyeUJ1dHRvbigpIHtcbiAgICAkKCdbZGF0YS1nYWxsZXJ5LWJ1dHRvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnW2RhdGEtZ2FsbGVyeS1ibG9ja10nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGdhbGxlcnlPcGVuQWN0aW9uKGdhbGxlcnlUeXBlKSB7XG4gICAgcmVtb3ZlQWN0aXZlR2FsbGVyeUJ1dHRvbigpO1xuICAgICQoJ1tkYXRhLWdhbGxlcnktYnV0dG9uPVwiJyArIGdhbGxlcnlUeXBlICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCdbZGF0YS1nYWxsZXJ5LWJsb2NrPVwiJyArIGdhbGxlcnlUeXBlICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlQ29tbWVudHMoY29udGFpbmVyKSB7XG4gICAgY29udGFpbmVyLmZpbmQoJ1tkYXRhLXBhZ2Utc2xpZGVyLWNvbW1lbnRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBkcmF3UGF0aChwYXRoLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCA1MDAwO1xuICAgIHZhciBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCAnZWFzZS1pbi1vdXQnO1xuICAgIHZhciByZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlIHx8IGZhbHNlO1xuICAgIHZhciB1bmRyYXcgPSBvcHRpb25zLnVuZHJhdyB8fCBmYWxzZTtcbiAgICB2YXIgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgIHZhciBsZW5ndGggPSBvcHRpb25zLmxlbmd0aCB8fCBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cbiAgICB2YXIgZGFzaE9mZnNldFN0YXRlcyA9IFtsZW5ndGgsIDBdO1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgIGRhc2hPZmZzZXRTdGF0ZXMgPSBbbGVuZ3RoLCAyICogbGVuZ3RoXVxuICAgIH1cbiAgICBpZiAodW5kcmF3KSB7XG4gICAgICAgIGRhc2hPZmZzZXRTdGF0ZXMucmV2ZXJzZSgpXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgYW55IHByZXZpb3VzIHRyYW5zaXRpb25cbiAgICBwYXRoLnN0eWxlLnRyYW5zaXRpb24gPSBwYXRoLnN0eWxlLldlYmtpdFRyYW5zaXRpb24gPSAnbm9uZSc7XG5cbiAgICB2YXIgZGFzaEFycmF5ID0gcGF0aC5zdHlsZS5zdHJva2VEYXNoYXJyYXkgfHwgcGF0aC5nZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIpO1xuXG4gICAgaWYgKGRhc2hBcnJheSAhPSAnJykge1xuICAgICAgICB2YXIgZGFzaExlbmd0aCA9IGRhc2hBcnJheS5zcGxpdCgvW1xccyxdLykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChhKSB8fCAwXG4gICAgICAgIH0pLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgKyBiXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBkYXNoQ291bnQgPSBsZW5ndGggLyBkYXNoTGVuZ3RoICsgMTtcbiAgICAgICAgdmFyIGEgPSBuZXcgQXJyYXkoTWF0aC5jZWlsKGRhc2hDb3VudCkpLmpvaW4oZGFzaEFycmF5ICsgXCIgXCIpO1xuICAgICAgICBwYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGEgKyAnMCcgKyAnICcgKyBsZW5ndGhcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGxlbmd0aCArICcgJyArIGxlbmd0aDtcbiAgICB9XG4gICAgcGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gZGFzaE9mZnNldFN0YXRlc1swXTtcbiAgICBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHBhdGguc3R5bGUudHJhbnNpdGlvbiA9IHBhdGguc3R5bGUuV2Via2l0VHJhbnNpdGlvbiA9XG4gICAgICAgICdzdHJva2UtZGFzaG9mZnNldCAnICsgZHVyYXRpb24gKyAnbXMgJyArIGVhc2luZztcbiAgICBwYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBkYXNoT2Zmc2V0U3RhdGVzWzFdO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdGguc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gZGFzaEFycmF5O1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgfSwgZHVyYXRpb24pXG59XG5cbi8qXG4gKiAgU1RBUlQgQ2xpY2sgRXZlbnRzXG4gKi9cblxuJCgnW2RhdGEtcGluPVwiY2xpY2tcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciAkY2l0eSA9ICR0aGlzLmNsb3Nlc3QoJ1tkYXRhLXBpbi1jaXR5XScpO1xuICAgIHJlbW92ZUFjdGl2ZUNpdHkoKTtcbiAgICAkY2l0eS5hZGRDbGFzcygnYWN0aXZlIGJpZycpO1xuICAgICQoJ1tkYXRhLXBpbi1jaXR5PVwianVybWFsYVwiXScpLnJlbW92ZUNsYXNzKCdiaWcnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICB2YXIgcmV2ZXJzZSA9IGZhbHNlO1xuICAgIGlmICgkY2l0eS5hdHRyKCdkYXRhLXBpbi1jaXR5JykgPT0gJ3BhcmlzJyB8fCAkY2l0eS5hdHRyKCdkYXRhLXBpbi1jaXR5JykgPT0gJ21hZHJpZCcpIHtcbiAgICAgICAgcmV2ZXJzZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF1c2luZ0lFKSB7XG4gICAgICAgIGRyYXdQYXRoKCRjaXR5LmZpbmQoJ3BhdGgnKVswXSwge1xuICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgICByZXZlcnNlOiByZXZlcnNlXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoISQoZS50YXJnZXQpLnBhcmVudHMoKS5pcygnW2RhdGEtcGluLWNpdHldJykpIHtcbiAgICAgICAgcmVtb3ZlQWN0aXZlQ2l0eSgpO1xuICAgIH1cbn0pO1xuXG5cbiQoJ1tkYXRhLW1vZGFsLW9wZW5dJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICB2YXIgbW9kYWwgPSAkdGhpcy5hdHRyKCdkYXRhLW1vZGFsLW9wZW4nKTtcbiAgICByZW1vdmVBY3RpdmVNb2RhbCgpO1xuICAgICQoJ1tkYXRhLW1vZGFsPVwiJyArIG1vZGFsICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBpZiAobW9kYWwgPT0gJ2dhbGxlcnknKSB7XG4gICAgICAgIHZhciBnYWxsZXJ5VHlwZSA9ICR0aGlzLmF0dHIoJ2RhdGEtZ2FsbGVyeScpO1xuICAgICAgICBnYWxsZXJ5T3BlbkFjdGlvbihnYWxsZXJ5VHlwZSk7XG4gICAgfVxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwnKTtcbn0pO1xuXG4kKCdbZGF0YS1tb2RhbC1jbG9zZV0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICByZW1vdmVBY3RpdmVNb2RhbCgpO1xufSk7XG5cbiQoJ1tkYXRhLWdhbGxlcnktYnV0dG9uXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGdhbGxlcnlUeXBlID0gJHRoaXMuYXR0cignZGF0YS1nYWxsZXJ5LWJ1dHRvbicpO1xuICAgIGdhbGxlcnlPcGVuQWN0aW9uKGdhbGxlcnlUeXBlKTtcbn0pO1xuXG4kKCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHJlbW92ZUFjdGl2ZU1vZGFsKCk7XG59KTtcblxuJCgnW2RhdGEtbW9kYWwtaW5uZXJdJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbn0pO1xuXG4vKlxuICogIEVORCBDbGljayBFdmVudHNcbiAqL1xuXG4vKlxuICogIFNUQVJUIFNsaWRlciBHYWxsZXJ5XG4gKi9cblxudmFyIHZyR2FsbGVyeSA9IG5ldyBTd2lwZXIoJ1tkYXRhLWdhbGxlcnktYmxvY2s9XCJ2clwiXScsIHtcbiAgICBsb29wOiB0cnVlLFxuICAgIG5leHRCdXR0b246ICdbZGF0YS1idXR0b24tZ2FsbGVyeT1cIm5leHRcIl0nLFxuICAgIHByZXZCdXR0b246ICdbZGF0YS1idXR0b24tZ2FsbGVyeT1cInByZXZcIl0nLFxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKHN3aXBlcikge1xuICAgICAgICB2ckdhbGxlcnkuc2xpZGVOZXh0KCk7XG4gICAgfVxufSk7XG5cbnZhciBwaG90b0dhbGxlcnkgPSBuZXcgU3dpcGVyKCdbZGF0YS1nYWxsZXJ5LWJsb2NrPVwicGhvdG9cIl0nLCB7XG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuZXh0QnV0dG9uOiAnW2RhdGEtYnV0dG9uLWdhbGxlcnk9XCJuZXh0XCJdJyxcbiAgICBwcmV2QnV0dG9uOiAnW2RhdGEtYnV0dG9uLWdhbGxlcnk9XCJwcmV2XCJdJyxcbiAgICBvbkNsaWNrOiBmdW5jdGlvbihzd2lwZXIpIHtcbiAgICAgICAgcGhvdG9HYWxsZXJ5LnNsaWRlTmV4dCgpO1xuICAgIH1cbn0pO1xuXG52YXIgdmlkZW9HYWxsZXJ5ID0gbmV3IFN3aXBlcignW2RhdGEtZ2FsbGVyeS1ibG9jaz1cInZpZGVvXCJdJywge1xuICAgIGxvb3A6IHRydWUsXG4gICAgbmV4dEJ1dHRvbjogJ1tkYXRhLWJ1dHRvbi1nYWxsZXJ5PVwibmV4dFwiXScsXG4gICAgcHJldkJ1dHRvbjogJ1tkYXRhLWJ1dHRvbi1nYWxsZXJ5PVwicHJldlwiXScsXG4gICAgb25DbGljazogZnVuY3Rpb24oc3dpcGVyKSB7XG4gICAgICAgIHZpZGVvR2FsbGVyeS5zbGlkZU5leHQoKTtcbiAgICB9XG59KTtcblxudmFyIGRlbW9HYWxsZXJ5ID0gbmV3IFN3aXBlcignW2RhdGEtZ2FsbGVyeS1ibG9jaz1cImRlbW9cIl0nLCB7XG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuZXh0QnV0dG9uOiAnW2RhdGEtYnV0dG9uLWdhbGxlcnk9XCJuZXh0XCJdJyxcbiAgICBwcmV2QnV0dG9uOiAnW2RhdGEtYnV0dG9uLWdhbGxlcnk9XCJwcmV2XCJdJyxcbiAgICBvbkNsaWNrOiBmdW5jdGlvbihzd2lwZXIpIHtcbiAgICAgICAgZGVtb0dhbGxlcnkuc2xpZGVOZXh0KCk7XG4gICAgfVxufSk7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kKCdbZGF0YS1wYWdlLXNsaWRlcl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyICRnYWxsZXJ5Q29udGFpbmVyID0gJHRoaXMuZmluZCgnW2RhdGEtcGFnZS1zbGlkZXItY29udGFpbmVyXScpO1xuICAgIHZhciAkbmV4dEJ1dHRvbiA9ICR0aGlzLmZpbmQoJ1tkYXRhLXBhZ2Utc2xpZGVyLWJ1dHRvbi1uZXh0XScpO1xuICAgIHZhciAkcHJldkJ1dHRvbiA9ICR0aGlzLmZpbmQoJ1tkYXRhLXBhZ2Utc2xpZGVyLWJ1dHRvbi1wcmV2XScpO1xuICAgIHZhciBwYWdlR2FsbGVyeSA9IG5ldyBTd2lwZXIoJGdhbGxlcnlDb250YWluZXIsIHtcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgbmV4dEJ1dHRvbjogJG5leHRCdXR0b24sXG4gICAgICAgIHByZXZCdXR0b246ICRwcmV2QnV0dG9uLFxuICAgICAgICBvblNsaWRlQ2hhbmdlU3RhcnQ6IGZ1bmN0aW9uIChzd2lwZXIpIHtcbiAgICAgICAgICAgIHZhciAkYWN0aXZlU2xpZGVyID0gJGdhbGxlcnlDb250YWluZXIuZmluZCgnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4XS5zd2lwZXItc2xpZGUtYWN0aXZlJykuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgICAgICAgIHZhciAkYWN0aXZlQ29tbWVudCA9ICR0aGlzLmZpbmQoJ1tkYXRhLXBhZ2Utc2xpZGVyLWNvbW1lbnQ9XCInKyAkYWN0aXZlU2xpZGVyICsnXCJdJyk7XG4gICAgICAgICAgICByZW1vdmVBY3RpdmVDb21tZW50cygkdGhpcyk7XG4gICAgICAgICAgICAkYWN0aXZlQ29tbWVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vKlxuICogIEVORCBTbGlkZXIgR2FsbGVyeVxuICovXG5cblxud2luZG93LnNyID0gU2Nyb2xsUmV2ZWFsKCk7XG5zci5yZXZlYWwoJy5jb250ZW50Jywge3ZpZXdGYWN0b3I6IDAuMX0pO1xuXG5cbiQoXCJbZGF0YS1zb3J0LXRhYmxlXVwiKS50YWJsZXNvcnRlcih7XG4gICAgc29ydExpc3Q6IFtbMCwwXSxbMSwwXSxbMiwwXSxbMywwXSxbNCwwXSxbNSwwXSxbNiwwXV0sXG4gICAgaGVhZGVyczoge1xuICAgICAgICA3OiB7XG4gICAgICAgICAgICBzb3J0ZXI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIDg6IHtcbiAgICAgICAgICAgIHNvcnRlcjogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vLyBBSkFYIGFkZCB0YWJsZSBjb250ZW50XG4vLyAkKHdpbmRvdykuYmluZCgnc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4vLyAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID49ICQoJ1tkYXRhLXNvcnQtdGFibGVdJykub2Zmc2V0KCkudG9wICsgJCgnW2RhdGEtc29ydC10YWJsZV0nKS5vdXRlckhlaWdodCgpIC0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4vLyAgICAgICAgICQuZ2V0KCQoXCJbZGF0YS1zb3J0LXRhYmxlXVwiKS5hdHRyKCdkYXRhLXVybCcpLCBmdW5jdGlvbihodG1sKSB7XG4vLyAgICAgICAgICAgICAkKFwidGFibGUgdGJvZHlcIikuYXBwZW5kKGh0bWwpO1xuLy8gICAgICAgICAgICAgJChcIltkYXRhLXNvcnQtdGFibGVdXCIpLnRyaWdnZXIoXCJ1cGRhdGVcIik7XG4vLyAgICAgICAgICAgICB2YXIgc29ydGluZyA9IFtbMiwxXSxbMCwwXV07XG4vLyAgICAgICAgICAgICAkKFwiW2RhdGEtc29ydC10YWJsZV1cIikudHJpZ2dlcihcInNvcnRvblwiLFtzb3J0aW5nXSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vIH0pO1xuXG5pZiAoJCgnW2RhdGEtcGluLWNpdHk9XCJtb3NrdmFcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgJCgnW2RhdGEtcGluLWNpdHk9XCJtb3NrdmFcIl0nKS5maW5kKCdbZGF0YS1waW49XCJjbGlja1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG59XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oZSkge1xuICAgICQuZm4ubWFwaGlsaWdodC5kZWZhdWx0cyA9IHtcbiAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgZmlsbENvbG9yOiAnMDAwMDAwJyxcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMyxcbiAgICAgICAgc3Ryb2tlOiBmYWxzZSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBhbHdheXNPbjogZmFsc2UsXG4gICAgICAgIG5ldmVyT246IGZhbHNlLFxuICAgICAgICBncm91cEJ5OiBmYWxzZSxcbiAgICAgICAgd3JhcENsYXNzOiAnaW1hZ2Utd3JhcCcsXG4gICAgICAgIHNoYWRvdzogZmFsc2UsXG4gICAgICAgIHNoYWRvd1g6IDAsXG4gICAgICAgIHNoYWRvd1k6IDAsXG4gICAgICAgIHNoYWRvd1JhZGl1czogNixcbiAgICAgICAgc2hhZG93Q29sb3I6ICcwMDAwMDAnLFxuICAgICAgICBzaGFkb3dPcGFjaXR5OiAwLjgsXG4gICAgICAgIHNoYWRvd1Bvc2l0aW9uOiAnb3V0c2lkZScsXG4gICAgICAgIHNoYWRvd0Zyb206IGZhbHNlXG4gICAgfTtcblxuICAgICQoJ2ltZ1t1c2VtYXBdJykucndkSW1hZ2VNYXBzKCk7XG4gICAgJCgnaW1nW3VzZW1hcF0nKS5tYXBoaWxpZ2h0KCk7XG5cbiAgICAkKCdtYXAjcmVuZGVyIGFyZWEnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkYXJlYSA9ICQodGhpcyksXG4gICAgICAgICAgICAkY3VycmVudEhvdXNlID0gJCgnW2RhdGEtaG91c2U9XCInKyAkYXJlYS5kYXRhKCdzZWN0aW9uJykgKydcIl0nKTtcblxuICAgICAgICAkYXJlYS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkY3VycmVudEhvdXNlWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkYXJlYS5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRjdXJyZW50SG91c2VbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjdXJyZW50SG91c2Uub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGFyZWEudHJpZ2dlcignbW91c2VvdmVyJywgJCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjdXJyZW50SG91c2Uub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkYXJlYS50cmlnZ2VyKCdtb3VzZW91dCcsICQodGhpcykpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7XG5cbiQod2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKClcbiAgICB7XG4gICAgICAgICQoJ2ltZ1t1c2VtYXBdJykubWFwaGlsaWdodCgpO1xuICAgIH0pO1xufSk7XG4iXX0=
