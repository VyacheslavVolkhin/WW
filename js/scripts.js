$(document).ready(function(){


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.mx-popup-outer-box').removeClass('mx-active');
        $('body').addClass('mx-popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.mx-popup-outer-box[id="' + popupCurrent + '"]').addClass('mx-active');
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('mx-popup-open');
        $('.mx-popup-outer-box').removeClass('mx-active');
        return false;
    })
    
    //steps
    $('.mx-popup-outer-box .js-popup-back').on('click', function() {
        if ($(this).parents('.mx-popup-outer-box').hasClass('mx-popup-step02')) {
            $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step02').addClass('mx-popup-step01');
        }
        if ($(this).parents('.mx-popup-outer-box').hasClass('mx-popup-step03')) {
            $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step03').addClass('mx-popup-step02');
        }
        return false;
    })
    $('.mx-popup-step-box[data-step="step01"] .js-popup-step-next').on('click', function() {
        $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step01').addClass('mx-popup-step02');
        return false;
    })
    $('.mx-popup-step-box[data-step="step02"] .js-popup-step-next').on('click', function() {
        $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step02').addClass('mx-popup-step03');
        return false;
    })
    $('.mx-popup-step-box[data-step="step03"] .js-popup-step-next').on('click', function() {
        $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step03').addClass('mx-popup-step04');
        return false;
    })
    $('.mx-popup-step-box[data-step="step04"] .js-popup-step-next').on('click', function() {
        $(this).parents('.mx-popup-outer-box').removeClass('mx-popup-step04').addClass('mx-popup-step01');
        $('body').removeClass('mx-popup-open');
        $('.mx-popup-outer-box').removeClass('mx-active');
        return false;
    })


    
    
    
    //popup
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('mx-active')) {
            $(this).removeClass('mx-active');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('mx-active');
            $(this).addClass('mx-active');
        }
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('mx-active');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            if ($(this).find('.js-popup-block').find('.mx-active').length>0) {
                $(this).find('.js-btn-toggle').addClass('mx-selected');
                var currentSelect = $(this).find('.js-popup-block').find('.mx-active').html();
                $(this).find('.js-btn-toggle').children('.mx-button-title').html(currentSelect);
            } else {
                $(this).find('.js-btn-toggle').removeClass('mx-selected');
            }
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('mx-active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.mx-active').removeClass('mx-active');
            $(this).addClass('mx-active');
            $('.js-tab-block').removeClass('mx-active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.mx-active').attr('data-tab')+'"]').addClass('mx-active');
            })
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.mx-active').length>0) {
                    $(this).find('.js-btn-toggle').addClass('mx-selected');
                    var currentSelect = $(this).find('.js-popup-block').find('.mx-active').html();
                    $(this).find('.js-btn-toggle').children('.mx-button-title').html(currentSelect);
                } else {
                    $(this).find('.js-btn-toggle').removeClass('mx-selected');
                }
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('mx-active');
        return false;
    })
    
    
    
    //filter
    $('.mx-filter-button').on('click', function() {
        $('.mx-filter-box').toggleClass('mx-active');
        return false;
    })
    $('.mx-filter-box .mx-filter-title').on('click', function() {
        $(this).toggleClass('mx-active');
        return false;
    })
    $('.mx-filter-box .mx-action-button').on('click', function() {
        $(this).parents('.mx-filter-content').toggleClass('mx-show-all');
        return false;
    })


    //mx-catalog-box
    if (!!$('.mx-catalog-box').offset()) {
        $('.mx-catalog-box .mx-slider').slick({
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        infinite: false,
                        variableWidth: true,
                    }
                },
            ]
        });
    }
	
});


$(window).on('load', function () {
    

    //mx-slider-date-box
    if (!!$('.mx-slider-date-box').offset()) {
        let timesSlider = $('.mx-slider-date-box .mx-slider').slick({
            dots: false,
            slidesToShow: 7,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="mx-btn-action-ico mx-ico-arrow mx-ico-arrow-prev"></span>',
            nextArrow: '<span class="mx-btn-action-ico mx-ico-arrow mx-ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 8,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 4,
                    }
                },
            ]
        });
        $('.js-popup-open').on('click', function () {
            timesSlider.slick('refresh');
        })
    }

    


    //gallery slider
    if (!!$('.mx-photos-slider-box').offset()) {
        let pSlider = $('.mx-photos-slider-box .mx-slider-wrap .mx-slider').slick({
            dots: false,
            slidesToShow: 1,
            infinite: false,
            prevArrow: '<span class="mx-btn-action-ico mx-ico-arrow mx-ico-arrow-prev"></span>',
            nextArrow: '<span class="mx-btn-action-ico mx-ico-arrow mx-ico-arrow-next"></span>',
        });
        let pSliderPreview = $('.mx-photos-slider-box .mx-slider-preview-wrap .mx-slider').slick({
            dots: false,
            slidesToShow: 5,
            vertical: true,
            infinite: false,
            prevArrow: false,
            nextArrow: false,
            rows: 1,
            swipeToSlide: true,
            touchMove: false,
            swipe: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        vertical: false,
                        slidesToShow: 5,
                        prevArrow: false,
                        nextArrow: false,
                        touchMove: true,
                        swipe: true,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        vertical: false,
                        slidesToShow: 5,
                        prevArrow: false,
                        nextArrow: false,
                        touchMove: true,
                        swipe: true,
                    }
                },
            ]
        });
        //pSlider.slick('refresh');
        //pSliderPreview.slick('refresh');
        $('.mx-photos-slider-box .mx-slider-wrap .mx-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.mx-photos-slider-box .mx-slider-preview-wrap .mx-sl-wrap.mx-active').removeClass('mx-active');
            $('.mx-photos-slider-box .mx-slider-preview-wrap .mx-sl-wrap[data-slide="' + currentSlide + '"]').addClass('mx-active');
        });
        $('.mx-photos-slider-box .mx-slider-preview-wrap .mx-slider .mx-elm-photo').click(function () {
            let newSlide = $(this).parent().attr('data-slide');
            /*$('.mx-photos-slider-box .mx-slider-preview-wrap .mx-sl-wrap.mx-active').removeClass('mx-active');
            $(this).parent().addClass('mx-active');*/
            $('.mx-photos-slider-box .mx-slider-wrap .mx-slider').slick('slickGoTo', newSlide);
            return false;
        })
        $('.mx-photos-slider-box .mx-sl-wrap[data-slide="0"]').addClass('mx-active');
    }

    $(function() {
        $('.mx-zoom').zoom();
    });
    
    
    
});
$(window).on('resize', function () {
    if ($(window).innerWidth() < 1024) {
        $('.mx-zoom').trigger('zoom.destroy');
    }
});