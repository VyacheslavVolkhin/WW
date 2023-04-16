$(document).ready(function(){
    
    
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


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.mx-popup-outer-box').removeClass('active');
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
	
});


$(window).on('load', function () {

    $(function() {
        $('.mx-zoom').zoom();
        $('.mx-thumb').on('click', 'a', function(e) {
            e.preventDefault();
            var thumb = $(e.delegateTarget);
            if (!thumb.hasClass('mx-active')) {
                thumb.addClass('mx-active').siblings().removeClass('mx-active');
                $('.mx-zoom')
                    .zoom({
                        url: this.href
                    })
                    .find('img').attr('src', this.href);
            }
            $('.mx-zoom').zoom();
        });
    });
    
});