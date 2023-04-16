var newTimeZamer = new Date(), newTimeTimer = false;
$(function () {
	function showDiff() {
		var now = new Date();
		var diff = (now - newTimeZamer) / 1000;
		var diff = Math.abs(Math.floor(diff));

		var days = Math.floor(diff / (24 * 60 * 60));
		var leftSec = diff - days * 24 * 60 * 60;

		var hrs = Math.floor(leftSec / (60 * 60));
		var leftSec = leftSec - hrs * 60 * 60;

		var min = Math.floor(leftSec / (60));
		var leftSec = leftSec - min * 60;

		if (leftSec > 3) {
			//$('body').get(0).onload();
		} else {
			if (newTimeTimer) {
				clearInterval(newTimeTimer);
			}
			newTimeTimer = setTimeout(showDiff, 1000);
		}
	}
	$(window).on('load', function () {
		if (newTimeTimer) {
			clearInterval(newTimeTimer);
		}
	});
	showDiff();
});

var mackBalloonLayout, mackBalloonContentLayout;
window.thdata = {};
var prevsch = '';
var SlyFrames = [];
var frame = null;
function ObjectSize(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++;
		}
	}
	return size;
}

function metriks(type, data) {
    let target = '';
	if (type === 'order') {
		data = data.data;
		if (data.isplace) {
			if (data.id) {
				// прямая в площадку orderCompilationPlaceDirect
				ym(44538871, 'reachGoal', 'orderCompilationPlaceDirect');
                ym(44538871,'reachGoal','orderCompilationPlaceDirect4Lab')
                target = 'orderCompilationPlaceDirect';
			} else {
				// подборка площадок orderCompilationPlace
				ym(44538871, 'reachGoal', 'orderCompilationPlace');
                ym(44538871,'reachGoal','orderCompilationPlace4Lab')
                target = 'orderCompilationPlace';
			}
		}
        else
        {
			if (data.id) {
				// прямая исполнителю orderCompilationFaceDirect
				ym(44538871, 'reachGoal', 'orderCompilationFaceDirect');
                target = 'orderCompilationFaceDirect';
				if (data.spec === 'Ведущие' || data.spec === 6) {
					// orderCompilationFaceDirectVed
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectVed');
				} else if (data.spec === 'Фотографы' || data.spec === 0) {
					//orderCompilationFaceDirectPho
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectPho');
				} else if (data.spec === 'Видеографы' || data.spec === 1) {
					//orderCompilationFaceDirectVid
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectVid');
				} else if (data.spec === 'Оформление и декор' || data.spec === 2) {
					//orderCompilationFaceDirectDec
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectDec');
				} else if (data.spec === 'Стилисты' || data.spec === 3) {
					//orderCompilationFaceDirectSty
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectSty');
				} else if (data.spec === 'Шоу-программа' || data.spec === 4) {
					//orderCompilationFaceDirectSho
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectSho');
				} else if (data.spec === 'Музыкальные группы' || data.spec === 5) {
					//orderCompilationFaceDirectMus
					ym(44538871, 'reachGoal', 'orderCompilationFaceDirectMus');
				}
			} else {
				// подборка исполнителей orderCompilationFace
				ym(44538871, 'reachGoal', 'orderCompilationFace');
                target = 'orderCompilationFace';
			}
		}
	}

    if(target != '')
    {
        $.post('/api/metriks.php', {target:target},function (){});
    }
}

function parseDateRus(input) {
	var parts = /(\d+)/g;
	parts = input.match(parts);
	return new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
	// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
	//return addZeroToLen(parts[0], 2) + '.' + addZeroToLen(parts[1], 2) + '.' + parts[2];
}

function datePickerReInit() {
	if ($.datepicker || $('body').datepicker) {
		if ($('.pickerInit').length) {
			$('.pickerInit').datepicker('destroy');
		}
		$('.alone-call-hide:not(.half):not(.oneDate) .call-alone').addClass('zhopa').addClass('pickerInit').datepicker({
			language: 'ru',
			autoclose: true,
			maxViewMode: 5,
			multidate: true,
			multipleDates: true,
			autoClose: false,
			todayHighlight: true,
			onSelect: function (dateText, dateobj, inst) {
				if ($(inst).length) {
					$($(inst).get(0).el).parents('.date-call-alone').find('input').val(dateText).trigger('change');
//                    $('.alone-call-hide').hide().removeClass('act');
//                    $('.date-call-alone').removeClass('act');
				}
			}
		}).on('changeDate', function (inst) {
			$(inst.delegateTarget).parents('.date-call-alone').find('input').val(dateformatDP(inst)).trigger('change');
//        $('.alone-call-hide').hide().removeClass('act');
//        $('.date-call-alone').removeClass('act');
		}).find('.datepicker.datepicker-inline').css({
			position: 'static',
			opacity: 1,
			'box-shadow': 'none'
		});
		$('.alone-call-hide.oneDate:not(.half) .call-alone').addClass('pickerInit').datepicker({
			language: 'ru',
			autoclose: !0,
			maxViewMode: 5,
			multidate: !1,
			multipleDates: !1,
			autoClose: !0,
			todayHighlight: !0,
			onSelect: function (dateText, dateobj, inst) {
				if ($(inst).length) {
					$($(inst).get(0).el).parents('.date-call-alone').find('input').val(dateText).trigger('change');
					$('.modal-wrap:first').click();
				}
			}
		}).on('changeDate', function (inst) {
			$(inst.delegateTarget).parents('.date-call-alone').find('input').val(dateformatDP(inst)).trigger('change');
			$('.alone-call-hide').hide().removeClass('act');
			$('.date-call-alone').removeClass('act');
		}).find('.datepicker.datepicker-inline').css({
			position: 'static',
			opacity: 1,
			'box-shadow': 'none'
		});
		$('.alone-call-hide.half:not(.oneDate) .call-alone').addClass('pickerInit').datepicker({
			language: 'ru',
			autoclose: true,
			maxViewMode: 5,
			multidate: true,
			multipleDates: true,
			autoClose: false,
			todayHighlight: true,
			onSelect: function (dateText, dateobj, inst) {
				if ($(inst).length) {
					$($(inst).get(0).el).parents('.date-call-alone').find('input').val(dateText).trigger('change');
//                    $('.alone-call-hide').hide().removeClass('act');
//                    $('.date-call-alone').removeClass('act');
				}
			}
		}).on('changeDate', function (inst) {
			$(inst.delegateTarget).parents('.date-call-alone').find('input.inp-call').val(dateformatDP(inst)).trigger('change');
//        $('.alone-call-hide').hide().removeClass('act');
//        $('.date-call-alone').removeClass('act');
		}).find('.datepicker.datepicker-inline').css({
			position: 'static',
			opacity: 1,
			'box-shadow': 'none'
		});
	}
}

function addZeroToLen(str, len) {
	let tmp = '';
	if (str.toString().length < len) {
		for (let i = 0; i < len - str.toString().length; i++) {
			tmp = tmp + '0';
		}
		return tmp + str.toString();
	}
	return str;
}



function dateformatDP(instance) {
	if (instance.dates && instance.dates.length > 0) {
		for (let i = 0; i < instance.dates.length; i++) {
			instance.dates[i] = instance.dates[i].getDate() + '.' + addZeroToLen(instance.dates[i].getMonth() + 1, 2) + '.' + instance.dates[i].getFullYear();
		}
		return instance.dates.join(',');
	}
	return '';
}

function userToTHdata(mod, user) {
	var frm = mod.find('form');
	if (mod.find('*[name=user_id]').length === 0) {
		frm.append('<input name="user_id" type="hidden" />');
	}
	mod.find('*[name=user_id]').val(user.id);
	if (mod.find('*[name=is_place]').length === 0) {
		frm.append('<input name="is_place" type="hidden" />');
	}
	mod.find('*[name=is_place]').val(user.place ? 'true' : 'false');
	if (mod.find('*[name=is_pro]').length === 0) {
		frm.append('<input name="is_pro" type="hidden" />');
	}
	mod.find('*[name=is_pro]').val(user.tarif > 1 ? 'true' : 'false');
	if (mod.find('*[name=item_name]').length === 0) {
		frm.append('<input name="item_name" type="hidden" />');
	}
	mod.find('*[name=item_name]').val(user.nameOf);
	if (mod.find('*[name=item_mname]').length === 0) {
		frm.append('<input name="item_mname" type="hidden" />');
	}
	mod.find('*[name=item_mname]').val(user.name);
	if (mod.find('*[name=order_count]').length === 0) {
		frm.append('<input name="order_count" type="hidden" />');
	}
	mod.find('*[name=order_count]').val(user.formOrderCount);
	if (mod.find('*[name=ava]').length === 0) {
		frm.append('<input name="ava" type="hidden" />');
	}
	mod.find('*[name=ava]').val(user.place ? user.photo_manager : user.photo_logo);
}

function gen_links(links) {
	let str = [];
	if (links.length) {
		for (let i = 0; i < links.length; i++) {
			str[str.length] = '<a href="http://' + links[i] + '/" target="_blank">' + links[i] + '</a>';
		}
	}
	return str.join(', ');
}

function dataToThanks() {
	let mod = $('#thanksModal');
	mod.find('.for-place,.for-face,.for-none').hide();
    mod.removeClass('place_thanks');
    mod.removeClass('face_thanks');
	if (!thdata.user_id) {
		mod.find('.modal-manager').hide();
		mod.find('.for-none').show();
	} else {
		mod.find('.modal-manager').show();
		if (thdata.isplace) {
            mod.addClass('place_thanks');
			mod.find('.for-place').show();
			mod.find('.modal-manager-avatar').html('<span style="background-image: url(' + thdata.ava + '_1);"></span>\n\
<span style="background-image: url(' + thdata.ava + '_2);"></span>\n\
<span style="background-image: url(' + thdata.ava + '_3);"></span>\n\
<span style="background-image: url(' + thdata.ava + '_4);"></span>');
			mod.find('.modal-manager-job').html(thdata.mname);

            mod.find('.busy-tit').html(thdata.name);
            var avat = $('.place-info-logo img').prop('src')
            mod.find('.busy-thumb').html('<span style="background-image: url(' + avat + ');"></span>');

		}
        else
        {
            mod.addClass('face_thanks');
			mod.find('.for-face').show();
			mod.find('.modal-manager-avatar').html('<span class="ava_photo" style="background-image: url(' + thdata.ava + ');"></span>');
			mod.find('.modal-manager-job').html(thdata.name);
		}
		mod.find('.cont-place-client-descr span').html(thdata.orderCount);
		if (thdata.orderCount) {
			mod.find('.modal-manager-turned').show();
		} else {
			mod.find('.modal-manager-turned').hide();
		}
	}


        mod.toggleClass('noauth',!userauth)

    //
	// if (typeof Cookies.get('showSuccessBanketModal') === 'undefined' && thdata.isplace) {
	// 	mod.find('.modal-wrap-in').addClass('has-hint').find('.hint').show();
	// } else {
	// 	mod.find('.modal-wrap-in').removeClass('has-hint').find('.hint').hide();
	// }
	// Cookies.set('showSuccessBanketModal', 'shown', {expires: 30});
	mod.modal('show');
	setTimeout(function () {
		prevModal = false;
	}, 600);
}

function clear_slick(gal) {
	if (gal.hasClass('slick-initialized')) {
		gal.slick('destroy');
		gal.unbind('beforeChange');
		gal.unbind('afterChange');
		gal.unbind('init');
		gal.unbind('reInit');
	}
}

function reinit_gal_video(media, vid, gal, nav) {
	let html = '', html2 = '';
	clear_slick(gal);
	clear_slick(nav);
	for (var key in media) {
		html = html + '<div class="one-big-slide" data-slideid="' + media[key].id + '"><span class="videoLink" data-video="' + media[key].video + '" data-src="' + media[key].src + '"><i></i></span></div>';
		html2 = html2 + '<div class="one-min-slide" data-slideid="' + media[key].id + '"><span data-src="' + media[key].src + '"></span></div>';
	}
	gal.html(html).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.gall-slider-min'
	}).on('beforeChange afterChange init reInit', function () {
		setTimeout(function () {
			gal.find('.one-big-slide span').lazy();
		}, 400);
		gal.find('iframe').remove();
	});
	nav.html(html2).slick({
		slidesToShow: 9,
		slidesToScroll: 1,
		asNavFor: '.gall-slider-big',
		appendArrows: '.nav-of-slide',
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1
				}
			}
		]
	}).on('init reInit afterChange beforeChange', function (event, slick, currentSlide, nextSlide) {
		setTimeout(function () {
			nav.find('.one-min-slide span').lazy();
		}, 400);
		if (typeof slick === 'undefined') {
			slick = {
				slideCount: nav.find('.one-min-slide.slick-slide:not(.slick-cloned)').length
			};
		}
		if (slick.slideCount !== 1) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$('.number-of-slided').html('<span>' + i + '</span> <i>/ ' + slick.slideCount + '</i>');
		}
	});
	gal.find('.videoLink').click(function (e) {
		e.preventDefault();
		var iframe = '';
		var ythref = matchYoutubeUrl($(this).data('video'));
		var vmhref = matchVimeoUrl($(this).data('video'));
		var height = $(this).height();
		if (ythref) {
			iframe = '<iframe id="ytplayer" type="text/html" width="100%" height="' + parseInt(height) + '" src="https://www.youtube.com/embed/' + ythref + '?autoplay=1&origin=' + window.location.origin + '" frameborder="0"/>';
			$(this).append(iframe);
		} else if (vmhref) {
			iframe = '<iframe src="https://player.vimeo.com/video/' + vmhref + '?autoplay=1&color=ffffff&title=0&byline=0&portrait=0" style="background: #FFF;" width="100%" height="' + parseInt(height) + '" allow="autoplay; fullscreen" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />';
			$(this).append(iframe);
		}
	});
	nav.find('.one-min-slide[data-slideid=' + vid + ']');
	if (nav.find('.one-min-slide[data-slideid=' + vid + ']').length) {
		nav.slick('slickSetOption', {speed: 150});
		gal.slick('slickSetOption', {speed: 150});
		nav.find('.one-min-slide[data-slideid=' + vid + ']:first').click();
		nav.slick('slickSetOption', {speed: 300});
		gal.slick('slickSetOption', {speed: 300});
	}

	setTimeout(function () {
		gal.trigger('reInit');
		nav.trigger('reInit');
	}, 100);
}

function reinit_gal(photos, pid, gid, gal, nav) {
	let html = '', html2 = '';
	clear_slick(gal);
	clear_slick(nav);
	for (var key in photos) {
		html = html + '<div class="one-big-slide" data-slideid="' + photos[key].id + '"><span data-src="' + photos[key].src + '"></span></div>';
		html2 = html2 + '<div class="one-min-slide" data-slideid="' + photos[key].id + '"><span data-src="' + photos[key].thumb + '"></span></div>';
	}
	gal.html(html).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		//arrows: false,
		//fade: true,
		asNavFor: '.gall-slider-min'
	}).on('beforeChange afterChange init reInit', function () {
		setTimeout(function () {
			gal.find('.one-big-slide span').lazy();
		}, 400);
	});
	nav.html(html2).slick({
		slidesToShow: 9,
		slidesToScroll: 1,
		asNavFor: '.gall-slider-big',
		appendArrows: '.nav-of-slide',
		focusOnSelect: true,
		//arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1
				}
			}
		]
	}).on('init reInit afterChange beforeChange', function (event, slick, currentSlide, nextSlide) {
		setTimeout(function () {
			nav.find('.one-min-slide span').lazy();
		}, 400);
		if (typeof slick === 'undefined') {
			slick = {
				slideCount: nav.find('.one-min-slide.slick-slide:not(.slick-cloned)').length
			};
		}
		if (slick.slideCount !== 1) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$('.number-of-slided').html('<span>' + i + '</span> <i>/ ' + slick.slideCount + '</i>');
		}
	});
	nav.find('.one-min-slide[data-slideid=' + gid + '_' + pid + ']');
	if (nav.find('.one-min-slide[data-slideid=' + gid + '_' + pid + ']').length) {
		nav.slick('slickSetOption', {speed: 150});
		gal.slick('slickSetOption', {speed: 150});
		nav.find('.one-min-slide[data-slideid="' + gid + '_' + pid + '"]:first').click();
		nav.slick('slickSetOption', {speed: 300});
		gal.slick('slickSetOption', {speed: 300});
	}

	setTimeout(function () {
		gal.trigger('reInit');
		nav.trigger('reInit');
	}, 100);
}

function filter_gal(gid) {
	if (parseInt(gid) > 0) {
		let photos = [], ret = {}, tmp;
		for (var key in sbmedia.photos) {
			tmp = sbmedia.photos[key].id.split('_');
			tmp[0] = parseInt(tmp[0]);
			if (gid === tmp[0]) {
				photos[photos.length] = sbmedia.photos[key];
			}
		}
		ret = {
			photos: photos,
			albums: sbmedia.albums
		};
		return ret;
	}
	return sbmedia;
}
function likeInit() {
	$('.sblike:not(.processed)').addClass('processed').click(function (e) {

		e.preventDefault();
		e.stopPropagation();
		var u = $(this).data('id');
		if (userauth) {
			var ths = this, action = '';
			let link = '';
			if ($(this).hasClass('active')) {
				link = '/catalog/?id=' + u + '&action=delete&table=wishlist';
				action = 'delete';
			} else {
				link = '/catalog/?id=' + u + '&action=add&table=wishlist';
				action = 'add';
			}
			$.ajax({
				url: link,
				dataType: 'json',
				cache: false,
				success: function (data) {
					let count = $(ths).find('b').length ? $(ths).find('b') : $(ths).parent().find('span'), tmp = parseInt(count.text());
					if (data.status === 'Ok') {
						if (action === 'delete') {
							$('a.heartlink' + u).removeClass('active').attr('href', '/catalog/?id=' + u + '&action=add&table=wishlist');
							tmp--;
						}
						if (action === 'add') {
							$('a.heartlink' + u).addClass('active').attr('href', '/catalog/?id=' + u + '&action=delete&table=wishlist');
							tmp++;
						}
					} else {
						if (action === 'delete') {
							$('a.heartlink' + u).addClass('active').attr('href', '/catalog/?id=' + u + '&action=delete&table=wishlist');
						}
						if (action === 'add') {
							$('a.heartlink' + u).removeClass('active').attr('href', '/catalog/?id=' + u + '&action=add&table=wishlist');
						}
					}

                    if(action === 'add')
                    {
                        ym(44538871,'reachGoal','addToFav') // Добавил в избранное
                        ym(44538871,'reachGoal','addToFav4Lab')
                    }
					count.html(tmp);
				}
			});
		} else {
			if ($('.mfp-ready').length) {
				$('.mfp-close').click();
				setTimeout(function () {
					if ($('#regMod').length) {
						$('#regMod').modal('show');
					}
				}, 400);
			} else {
				if ($('#Idea:visible').length) {
					$('#Idea:visible .close-add').click();
					setTimeout(function () {
						if ($('#regMod').length) {
							$('#regMod').modal('show');
						}
					}, 400);
				} else {
					if ($('#regMod').length) {
						$('#regMod').modal('show');
					}
				}
			}
			saveThisByHref(this);
		}
	});
}

$('.lazy').Lazy({
    effect: "fadeIn",
    visibleOnly: true,
});
$(function () {
    $('#globalpreloader1').hide();
	window.ismob = $(window).width() < 992;
	$(window).resize(function () {
		window.ismob = $(window).width() < 992;
	});
	$('.other-place-carus .one-other-place-thumb').each(function () {
		$(this).slick();
	});
	$('.loadAllPhotosPlace').click(function (e) {
		e.preventDefault();
		let add = 20;
		if ($(window).width() < 992) {
			add = $('header .container .header').height() + 20;
		}
		let cont = $(this).parents('.photo-carus-wrap');
		$(this).remove();
		$('html, body').stop().animate({
			scrollTop: cont.offset().top - add
		}, 600);
		cont.find('.photo-carus-nav').remove();
		cont.find('.slick-initialized').slick('destroy');
	});
	$('.loadmorephotoFace').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('inprocess')) {
			return false;
		}
		let alb = $(this).data('g');
		var iszal = alb > 0;
		var cont;
		if (iszal) {
			cont = $(this).parents('.mas-min-slide-wrap-in');
		} else {
			cont = $(this).parents('.one-carus-tab').find('.mas-big-slide-wrap');
		}

		let uid = $(this).data('u');
		var next = $(this).data('p') + 1;
		var ths = this;
		$(this).addClass('inprocess');
		$.ajax({
			url: '/api/loadMorePhotos/',
			method: 'get',
			data: {
				uid: uid,
				alb: alb,
				page: next
			},
			dataType: 'json',
			cache: true,
			success: function (data) {
				html = '';
				$(ths).removeClass('inprocess').attr('data-p', next).data('p', next);
				if (data.status) {
					if (data.data.end) {
						$(ths).parent().remove();
					}
					let photos = data.data.photos;
					for (let i = 0; i < photos.length; i++) {
						html = html + '<div class="one-mas-big-photo">' +
								'<div class="one-mas-big-photo-in">' +
								'<a href="javascript:void(0);" class="sbphoto" tabindex="0" data-u="' + uid + '" data-g="' + (photos[i].aid ? photos[i].aid : '0') + '" data-p="' + photos[i].id + '" style="display: block; background-image: url(' + photos[i].src + ');"></a>' +
								'</div>' +
								'</div>';
					}
					if (iszal) {
						cont.find('.mas-min-slide-wrap-bt').before('<div class="more-photos-block">' + html + '</div>');
					} else {
						cont.append(html);
					}
				}
			}
		});
	});
	$('.modal-gallery .modal-gallery-in').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$('.close-modal-gall,.close-modal-overlay').click(function () {
		$('#modal-gal').fadeOut();
		$('#modal-gal iframe').remove();
		$('body').removeClass('modal-open');
	});
	$('.gall-drop-bt:not(.processed)').click(function (e) {
		e.preventDefault();
		if (!$(this).parent().hasClass('disabled')) {
			$(this).toggleClass('open');
			$('.gall-drop-list').slideToggle();
		}
	}).addClass('processed');
	$('.sbOrderForm').submit(function (e) {
        e.preventDefault();
        if(!$('body').hasClass('sending')) {
            var data = {};
            thdata = {};
            if ($(this).find('*[name=is_place]').length) {
                thdata.isplace = parseBool($(this).find('*[name=is_place]').val());
            }
            if ($(this).find('*[name=item_name]').length) {
                thdata.name = $(this).find('*[name=item_name]').val();
            }
            if ($(this).find('*[name=item_mname]').length) {
                thdata.mname = $(this).find('*[name=item_mname]').val();
            }
            if ($(this).find('*[name=user_id]').length) {
                thdata.user_id = parseInt($(this).find('*[name=user_id]').val());
            }
            if ($(this).find('*[name=order_count]').length) {
                thdata.orderCount = parseInt($(this).find('*[name=order_count]').val());
            }
            if ($(this).find('*[name=ava]').length) {
                thdata.ava = $(this).find('*[name=ava]').val();
            }
            if ($(this).find('*[name=is_pro]').length) {
                thdata.isPro = parseBool($(this).find('*[name=is_pro]').val());
            }
            if (validate_form(this)) {
                if ($(this).find('*[name=name]').length) {
                    data.name = $(this).find('*[name=name]').val();
                }
                if ($(this).find('*[name=email]').length) {
                    data.email = $(this).find('*[name=email]').val();
                }
                if ($(this).find('*[name=phone]').length) {
                    data.phone = $(this).find('*[name=phone]').val();
                }
                if ($(this).find('*[name=date]').length) {
                    data.date = $(this).find('*[name=date]').val();
                }
                if ($(this).find('*[name=qty]').length) {
                    data.qty = $(this).find('*[name=qty]').val();
                }
                if ($(this).find('*[name=text]').length) {
                    data.text = $(this).find('*[name=text]').val();
                }
                if ($(this).find('*[name=user_id]').length) {
                    data.user_id = $(this).find('*[name=user_id]').val();
                } else {
                    data.user_id = '0';
                }

                if ($(this).find('*[name=podbor]').length && $(this).find('*[name=podbor]').val() === 'face') {
                    data.podbor = 'face';
                }

                if ($(this).find('*[name=is_place]').length) {
                    data.isplace = $(this).find('*[name=is_place]').val();
                }

                $('body').addClass('sending')
                $.ajax({
                    url: '/api/orderCreate/',
                    method: 'post',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    success: function (json) {
                        $('body').removeClass('sending')
                        if (json && json.status) {
                            $('.sbOrderForm').each(function () {
                                this.reset();
                                datePickerReInit();
                                $(this).find('.quiz-one-wrap:first').show().next().hide();
                            });
                            dataToThanks();
                            metriks('order', json);
                        }
                    }
                });
            }
        }
	});
	$('.busy-btOne').click(function (e) {
		e.preventDefault();
		if ($(this).parents('.modal').find('.buzyOne').length && validate_form($(this).parents('.modal').find('.buzyOne').get(0))) {
			$(this).parents('.modal').find('.buzyOne').hide();
			$(this).parents('.modal').find('.buzyTwo').show();
		}
	});
	$('.customBtn').click(function (e) {
		e.preventDefault();
		if ($('#tmpLinkId').length === 0) {
			$('body').append('<a href="https://watbot.ru/w/hao" target="_blank" id="tmpLinkId"></a>');
		}
		$('#tmpLinkId').get(0).click();
	});
	$('.sbOrderFormModal').submit(function (e) {
		e.preventDefault();
        if(!$('body').hasClass('sending')) {
            var data = {};
            if ($(this).find('*[name=is_place]').length) {
                thdata.isplace = parseBool($(this).find('*[name=is_place]').val());
            }
            if ($(this).find('*[name=item_name]').length) {
                thdata.name = $(this).find('*[name=item_name]').val();
            }
            if ($(this).find('*[name=item_mname]').length) {
                thdata.mname = $(this).find('*[name=item_mname]').val();
            }
            if ($(this).find('*[name=user_id]').length) {
                thdata.user_id = parseInt($(this).find('*[name=user_id]').val());
            }
            if ($(this).find('*[name=order_count]').length) {
                thdata.orderCount = parseInt($(this).find('*[name=order_count]').val());
            }
            if ($(this).find('*[name=ava]').length) {
                thdata.ava = $(this).find('*[name=ava]').val();
            }
            if ($(this).find('*[name=is_pro]').length) {
                thdata.isPro = parseBool($(this).find('*[name=is_pro]').val());
            }
            if (validate_form(this)) {
                if ($(this).find('*[name=name]').length) {
                    data.name = $(this).find('*[name=name]').val();
                }
                if ($(this).find('*[name=email]').length) {
                    data.email = $(this).find('*[name=email]').val();
                }
                if ($(this).find('*[name=phone]').length) {
                    data.phone = $(this).find('*[name=phone]').val();
                }
                if ($(this).find('*[name=date]').length) {
                    data.date = $(this).find('*[name=date]').val();
                }
                if ($(this).find('*[name=qty]').length) {
                    data.qty = $(this).find('*[name=qty]').val();
                }
                if ($(this).find('*[name=text]').length) {
                    data.text = $(this).find('*[name=text]').val();
                }
                if ($(this).find('*[name=isIntagram]').length) {
                    data.isIntagram = $(this).find('*[name=isIntagram]').val();
                }
                if ($(this).find('*[name=user_id]').length) {
                    data.user_id = $(this).find('*[name=user_id]').val();
                } else {
                    data.user_id = '0';
                }
                $('body').addClass('sending')

                $.ajax({
                    url: '/api/orderCreate/',
                    method: 'post',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    success: function (json) {
                        if (json && json.status) {
                            $('.sbOrderFormModal').each(function () {
                                this.reset();
                                datePickerReInit();
                                $(this).find('.quiz-one-wrap:first').show().next().hide();
                            });
                            $('body').removeClass('sending')
                            dataToThanks();
                            metriks('order', json);
                        }
                    }
                });
            }
        }
	});
	$('.sbMorevideo').click(function (e) {
		e.preventDefault();
		$(this).parents('.prod-place-video-in').find('.one-place-video.d-none').removeClass('d-none');
		$(this).parent().remove();
	});
	$(document).on('click', '.videoLink', function (e) {
		e.preventDefault();
		var iframe = '';
		var ythref = matchYoutubeUrl($(this).data('video'));
		var vmhref = matchVimeoUrl($(this).data('video'));
		var height = $(this).height();
		if (ythref) {
			iframe = '<iframe id="ytplayer" type="text/html" width="100%" height="' + parseInt(height) + '" src="https://www.youtube.com/embed/' + ythref + '?autoplay=1&origin=' + window.location.origin + '" frameborder="0"/>';
			$(this).append(iframe);
		} else if (vmhref) {
			iframe = '<iframe src="https://player.vimeo.com/video/' + vmhref + '?autoplay=1&color=ffffff&title=0&byline=0&portrait=0" style="background: #FFF;" width="100%" height="' + parseInt(height) + '" allow="autoplay; fullscreen" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />';
			$(this).append(iframe);
		}
	});
	$(document).on('click', '.sbvideo', function (e) {
		e.preventDefault();
		var u = $(this).data('u');
		var v = $(this).data('v');
		var mod = $('#modal-gal');
		var gal = mod.find('.gall-slider-big').css({opacity: 0});
		var nav = mod.find('.gall-slider-min').css({opacity: 0});
		clear_slick(gal);
		clear_slick(nav);
		var list = mod.find('.gall-drop').hide();
		mod.fadeIn()//.addClass('loading');
		$('body').addClass('modal-open');
		$.ajax({
			url: '/api/loadVideo/?id=' + u,
			cache: true,
			dataType: 'json',
			success: function (data) {
				let user;
				let media;
				let tmp = '';
				window.sbgal = [];
				if (data.status) {
					user = data.data.user;
					media = data.data.media;
					reinit_gal_video(media, v, gal, nav);
					mod.find('.gall-top-mob-avat-in span').css({
						'background-image': user.photo_logo
					});
					mod.find('.mobile-top-gall-town span').html(user.city);
					mod.find('.sbOrderForm input[name=user_id]').val(user.id);
					mod.find('.sbOrderForm input[name=is_place]').val(user.place ? 'true' : 'false');
					mod.find('.sbOrderForm input[name=is_pro]').val(user.tarif > 1 ? 'true' : 'false');
					mod.find('.sbOrderForm input[name=item_name]').val(user.nameOf);
					mod.find('.sbOrderForm input[name=item_mname]').val(user.name);
					mod.find('.sbOrderForm input[name=ava]').val(user.place ? user.photo_manager : user.photo_logo);
					mod.find('.sbOrderForm input[name=order_count]').val(user.favcount);
					mod.find('.gall-top-mob-bot').html(user.nameOf);
					if (user.prices !== false) {
						mod.find('.mobile-top-gall-price').show();
						mod.find('.mobile-top-gall-price .mobile-top-gall-price-name').html(user.prices.name);
						mod.find('.mobile-top-gall-price .mobile-top-gall-val').html(user.prices.value);
					} else {
						mod.find('.mobile-top-gall-price').hide();
					}
					if (user.place) {
						mod.find('.manager-thumb').html('<span style="background-image: url(' + user.photo_manager + '_1);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_2);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_3);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_4);"></span>');
						mod.find('.manager-name').html(user.name);
						mod.find('.manager-job').show();
					} else {
						mod.find('.manager-thumb').html('<span class="ava_photo" style="background-image: url(' + user.photo_logo + ');"></span>');
						mod.find('.manager-name').html(user.nameOf);
						mod.find('.manager-job').hide();
					}
					if (user.formOrderCount > 0) {
						mod.find('.cont-place-client-descr').show();
						mod.find('.cont-place-client-descr span').html(user.formOrderCount);
					} else {
						mod.find('.cont-place-client-descr').hide();
					}
					tmp = '<li><a data-alb="0" class="active" href="javascript:void(0);">Все фотографии</a></li>';
					if (media.albums) {
						for (var key in media.albums) {
							tmp = tmp + '<li><a data-alb="' + key + '" href="javascript:void(0);">' + media.albums[key] + '</a></li>';
						}
					}
					mod.find('.quize-cont-show-num a').show();
					mod.find('.quize-cont-num').html(user.phone);
					mod.find('.quiz-title span').html('у ' + user.spec);
					mod.find('.gall-like a').attr('class', 'heartlink' + u).unbind('click').click(function (e) {
						e.preventDefault();
						var ths = this, action = '';
						let link = '';
						if ($(this).hasClass('active')) {
							link = '/catalog/?id=' + u + '&action=delete&table=wishlist';
							action = 'delete';
						} else {
							link = '/catalog/?id=' + u + '&action=add&table=wishlist';
							action = 'add';
						}
						$.ajax({
							url: link,
							dataType: 'json',
							cache: false,
							success: function (data) {
								let count = $(ths).find('b'), tmp = parseInt(count.text());
								if (data.status === 'Ok') {
									if (action === 'delete') {
										$('a.heartlink' + u).removeClass('active');
										tmp--;
									}
									if (action === 'add') {
										$('a.heartlink' + u).addClass('active');
										tmp++;
									}
								} else {
									if (action === 'delete') {
										$('a.heartlink' + u).addClass('active');
									}
									if (action === 'add') {
										$('a.heartlink' + u).removeClass('active');
									}
								}
								count.html(tmp);
							}
						});
					});
					if (user.infav) {
						mod.find('.gall-like a').addClass('active');
					}
					mod.find('.gall-like a b').html(user.favcount);
				}
				mod.removeClass('loading');
				setTimeout(function () {
					gal.css({opacity: 1});
					nav.css({opacity: 1});
				}, 5);
				setTimeout(function () {
					gal.find('.slick-current .videoLink').click();
				}, 250);
			},
			error: function () {

			}
		});
	});
	$(document).on('click', '.sbphoto', function (e) {
		e.preventDefault();
		if (!$(this).hasClass('disgal')) {
			var u = $(this).data('u');
			var g = $(this).data('g');
			var p = $(this).data('p');
			var mod = $('#modal-gal');
			var gal = mod.find('.gall-slider-big').css({opacity: 0});
			var nav = mod.find('.gall-slider-min').css({opacity: 0});
			clear_slick(gal);
			clear_slick(nav);
			var list = mod.find('.gall-drop').show();
			mod.fadeIn().addClass('loading');
			$('body').addClass('modal-open');
			$.ajax({
				url: '/api/loadPhoto/?id=' + u,
				cache: true,
				dataType: 'json',
				success: function (data) {
					let user;
					let media;
					let tmp = '';
					window.sbgal = [];
					if (data.status) {
						user = data.data.user;
						window.sbmedia = data.data.media;
						media = filter_gal(g);
						reinit_gal(media.photos, p, g, gal, nav);
						mod.find('.gall-top-mob-avat-in span').css({
							'background-image': user.photo_logo
						});
						mod.find('.mobile-top-gall-town span').html(user.city);
						if (user.revcount > 0) {
							mod.find('.allReviews').show().find('span i').html(user.revcount);
						} else {
							mod.find('.allReviews').hide();
						}
						mod.find('.sbOrderForm input[name=user_id]').val(user.id);
						mod.find('.sbOrderForm input[name=is_place]').val(user.place ? 'true' : 'false');
						mod.find('.sbOrderForm input[name=is_pro]').val(user.tarif > 1 && !user.place ? 'true' : 'false');
						mod.find('.sbOrderForm input[name=item_name]').val(user.nameOf);
						mod.find('.sbOrderForm input[name=ava]').val(user.place ? user.photo_manager : user.photo_logo);
						mod.find('.sbOrderForm input[name=order_count]').val(user.favcount);
						mod.find('.gall-top-mob-bot').html(user.nameOf);
						mod.find('.sborderBtn,.sbshowCont').attr('data-id', user.id).data('id', user.id);
						if (user.tarif > 1 && !user.place) {
							mod.find('.gall-top-mob-descr .gall-top-mob-tit-top').show();
						} else {
							mod.find('.gall-top-mob-descr .gall-top-mob-tit-top').hide();
						}
						if (user.prices !== false) {
							mod.find('.mobile-top-gall-price').show();
							mod.find('.mobile-top-gall-price .mobile-top-gall-price-name').html(user.prices.name);
							mod.find('.mobile-top-gall-price .mobile-top-gall-val').html(user.prices.value);
						} else {
							mod.find('.mobile-top-gall-price').hide();
						}
						if (user.place) {
							mod.find('.manager-thumb').html('<span style="background-image: url(' + user.photo_manager + '_1);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_2);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_3);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_4);"></span>');
							mod.find('.manager-name').html(user.name);
							mod.find('.manager-job').show();
						} else {
							mod.find('.manager-thumb').html('<span class="ava_photo" style="background-image: url(' + user.photo_logo + ');"></span>');
							mod.find('.manager-name').html(user.nameOf);
							mod.find('.manager-job').hide();
						}
						mod.find('.gall-top-mob-avat-in span').attr('style', 'background-image: url(' + user.photo_logo + ');');
						if (user.formOrderCount > 0) {
							mod.find('.cont-place-client-descr').show();
							mod.find('.cont-place-client-descr span').html(user.formOrderCount);
						} else {
							mod.find('.cont-place-client-descr').hide();
						}
						tmp = '<li><a data-alb="0" class="active" href="javascript:void(0);">Все фотографии</a></li>';
						if (media.albums) {
							for (var key in media.albums) {
								tmp = tmp + '<li><a data-alb="' + key + '" href="javascript:void(0);">' + media.albums[key] + '</a></li>';
							}
						}
						if (media.albums && ObjectSize(media.albums) > 0) {
							list.find('.gall-drop-bt').parent().removeClass('disabled');
						} else {
							list.find('.gall-drop-bt').parent().addClass('disabled');
						}
						list.find('.gall-drop-bt').html('Все фотографии');
						list.find('.gall-drop-list ul').html(tmp);
						list.find('.gall-drop-list ul li a.active').removeClass('active');
						list.find('.gall-drop-list ul li a[data-alb=' + g + ']').addClass('active');
						list.find('.gall-drop-bt').removeClass('open').html(list.find('.gall-drop-list ul li a[data-alb=' + g + ']').html());
						list.find('.gall-drop-list ul li a').click(function (e) {
							e.preventDefault();
							let media = filter_gal($(this).data('alb'));
							p = 0;
							reinit_gal(media.photos, p, g, gal, nav);
							list.find('.gall-drop-list').slideUp();
							list.find('.gall-drop-list ul li a.active').removeClass('active');
							$(this).addClass('active');
							list.find('.gall-drop-bt').removeClass('open').html($(this).html());
						});
						mod.find('.quize-cont-show-num a').show();
						mod.find('.quize-cont-num').html(user.sphone);
						mod.find('.quiz-title span').html('у ' + user.spec);
						mod.find('.gall-like a').attr('class', 'heartlink' + u).unbind('click').click(function (e) {
							e.preventDefault();
							var ths = this, action = '';
							let link = '';
							if ($(this).hasClass('active')) {
								link = '/catalog/?id=' + u + '&action=delete&table=wishlist';
								action = 'delete';
							} else {
								link = '/catalog/?id=' + u + '&action=add&table=wishlist';
								action = 'add';
							}
							$.ajax({
								url: link,
								dataType: 'json',
								cache: false,
								success: function (data) {
									let count = $(ths).find('b'), tmp = parseInt(count.text());
									if (data.status === 'Ok') {
										if (action === 'delete') {
											$('a.heartlink' + u).removeClass('active');
											tmp--;
										}
										if (action === 'add') {
											$('a.heartlink' + u).addClass('active');
											tmp++;
										}
									} else {
										if (action === 'delete') {
											$('a.heartlink' + u).addClass('active');
										}
										if (action === 'add') {
											$('a.heartlink' + u).removeClass('active');
										}
									}
									count.html(tmp);
								}
							});
						});
						if (user.infav) {
							mod.find('.gall-like a').addClass('active');
						}
						mod.find('.gall-like a b').html(user.favcount);
					}
					mod.removeClass('loading');
					setTimeout(function () {
						gal.css({opacity: 1});
						nav.css({opacity: 1});
					}, 5);
				},
				error: function () {

				}
			});
		}
	});
	$('.modal').on('hide.bs.modal', function () {
		$(this).find('.buzyOne').show();
		$(this).find('.buzyTwo').hide();
	});
	$('.modal').on('show.bs.modal', function () {
		$('.modal').not($(this)).each(function () {
			$(this).modal('hide');
		});
	});
	likeInit();
	datePickerReInit();
	$('.date-call-alone input[name=date], .date-call-alone input[name=datewedding]').focus(function () {
		$(this).parent().addClass('act');
		let val = this.value;
		let dates = val.split(',');
		let rdates = [];
		let tmp = '';
		if (dates.length) {
			for (let i = 0; i < dates.length; i++) {
				tmp = dates[i].toString().trim();
				if (tmp.split('.').length === 3) {
					rdates[rdates.length] = parseDateRus(tmp);
				}
			}
		}
		if ($.datepicker) {
// Bootstrap v3.3.5
			let picker = $(this).parent().find('.pickerInit');
			picker = picker.data('datepicker');
			if (picker) { // на всякий пожарный повторно проверяем существование календаря
				picker.setDates(rdates);
			}
		} else if ($('body').datepicker) {
// Air Datepicker v2.2.3
			let picker = $(this).parent().find('.pickerInit').datepicker('setDate', rdates.length > 0 ? rdates[0] : new Date());
			picker = picker.data('datepicker');
			if (picker) { // на всякий пожарный повторно проверяем существование календаря
				picker.selectDate(rdates);
			}
		}

		$('.call-alone .datepicker.datepicker-inline .datepicker.datepicker-inline').remove();
		$(this).parent().find('.alone-call-hide').show();
		$('input, select').trigger('refresh');
		$('.call-alone .datepicker.datepicker-inline .prev').html('<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>');
		$('.call-alone .datepicker.datepicker-inline .next').html('<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>');
		$('.call-alone .datepicker.datepicker-inline .next svg path,.call-alone .datepicker.datepicker-inline .prev svg path').css({fill: 'none', stroke: '#9c9c9c', 'stroke-width': '2px'});
	});
	$('a.scrollToLink').click(function (e) {
		e.preventDefault();
		let add = 20;
		if ($(window).width() < 992) {
			add = $('header .container .header').height() + 20;
		}
		if ($($(this).attr('href')).length) {
			$('html, body').stop().animate({
				scrollTop: $($(this).attr('href')).offset().top - add
			}, 2000);
		}
	});
	$(document).on("click", document, function (e) {
		if (!$(e.target).is('.date-call-alone, .date-call-alone *, .datepicker , .datepicker *, .datepicker--cell, .datepicker--nav-action') || $(e.target).is('input[name="qty"]')) {
			$('.alone-call-hide').hide().removeClass('act');
			$('.date-call-alone').removeClass('act');
		}
	});
	$('.quiz-one-bt button.toOne').click(function (e) {
		e.preventDefault();
		$(this).parents('.quiz-one-wrap').hide().prev().show();
	});
	$('.quiz-one-bt button.toTwo').click(function (e) {
		e.preventDefault();
		if (validate_form($(this).parents('.quiz-one-wrap').get(0))) {
			$(this).parents('.quiz-one-wrap').hide().next().show();
		}
	});
	$('.form-get-place-form button.toTwo').click(function (e) {
		e.preventDefault();
		if (validate_form($(this).parents('.form-get-place-form').get(0))) {
			$(this).parents('.form-get-place-form').hide().next().show();
		}
	});
	$('.place-single-form button.toTwo').click(function (e) {
		e.preventDefault();
		if (validate_form($(this).parents('.place-single-form').get(0))) {
			$(this).parents('.place-single-form').hide().next().show();
		}
	});
	if ($.datepicker || $('body').datepicker) {
		$('.date-cal').datepicker({
			multidate: true,
			multipleDates: true,
			autoClose: false
		});
	}

	$('.quize-cont-show-num a').click(function (e) {
        e.preventDefault();
        if($(this).parents('.gall-feed').length > 0)
            {

            var id = $(this).data('id');
            loadItem(id);
            }
        else
            {
		        $('.sbshowCont:first').click();
            }
	});

	$(document).on('click', '.sborderBtn', function (e) {
		e.preventDefault();
		var mod = $('#busy-photo').modal('show');
		var id = $(this).data('id');
		var isforall = $(this).data('empty') === true;
		if (isforall) {
			userToTHdata(mod, {id: 0});
			mod.find('.for-place').hide();
			mod.find('.for-face').show();
			mod.find('.busy-thumb').html('<span style="background-image: url(/theme/youwedme/landing3/images/logo.svg); background-size: contain; border: none; width: 173px;height: 55px; border-radius: 0;"></span>');
			mod.find('.busy-tit').html('Оставьте информацию о мероприятии');
		} else {
			$.ajax({
				url: '/api/loadItem/?ord=1&id=' + id,
				cache: true,
				dataType: 'json',
				success: function (data) {
					let user;
					let auth;
					if (data.status) {
						user = data.data.user;
						if (user.place) {
							// если площадка, показываем инфу о банкетном манажере
							mod.find('.for-place').show();
							mod.find('.for-face').hide();
							if (user.name) {
								mod.find('.modal-manager-name').html(user.name);
								mod.find('.modal-manager-avatar').html('<span style="background-image: url(' + user.photo_manager + '_1);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_2);"></span>\n\
<span style="background-image: url(' + user.photo_manager + '_3);"></span>\n\
						<span style="background-image: url(' + user.photo_manager + '_4);"></span>');
								if (user.formOrderCount > 0) {
									mod.find('.modal-manager-turned').show();
									mod.find('.modal-manager-turned .cont-place-client-descr span').html(user.formOrderCount);
								} else {
									mod.find('.modal-manager-turned').hide();
									mod.find('.modal-manager-turned .cont-place-client-descr span').html('');
								}

							} else {
								mod.find('.modal-manager').hide();
							}
						} else {
							mod.find('.for-face').show();
							mod.find('.for-place').hide();
						}
						user = data.data.user;
						auth = data.data.auth;
						userToTHdata(mod, user);
						mod.find('.busy-thumb').html('<span style="background-image: url(' + user.photo_logo + ');"></span>');
						mod.find('.busy-tit').html(user.nameOf);
					}
				}
			});
		}
	});


    function loadItem(id){
        var mod = $('#item-contact').modal('show');
        mod.find('.sborderBtn').attr('data-id', id).data('id', id);
        mod.toggleClass('noauth',!userauth)
        mod.removeClass('popup_place');
        mod.removeClass('popup_face');
        mod.find('.sites-photogr').removeClass('full-photogr')
        mod.find('.insta-photogr').removeClass('full-photogr')
        $.post('/api/metriks.php', {id:id},function (){});
        $.ajax({
            url: '/api/loadItem/?id=' + id,
            cache: true,
            dataType: 'json',
            success: function (data) {
                let user;
                let auth;
                if (data.status) {
                    user = data.data.user;
                    auth = data.data.auth;
                    userToTHdata(mod, user);
                    mod.find('.busy-thumb').html('<span style="background-image: url(' + user.photo_logo + ');"></span>');
                    mod.find('.busy-tit').html(user.nameOf);
                    mod.find('.contact-top-tit span').html('Совет от WEDWED')
                    if (user.place) {
                        mod.addClass('popup_place');
                        mod.find('.contact-top-tit span').html('Рекомендация')
                        mod.find('.for-place').show();
                        mod.find('.for-face').hide();
                        // для площадок всегда показываем контакты
                        mod.find('.phone-photogr').show().html('<div class="cont-caption">Контактная информация</div><a class="for-place" href="tel:' + tel_phone(user.phone) + '">' + format_phone(user.phone) + '</a>');
                        if (user.insta) {
                            mod.find('.insta-photogr').show().html('<a target="_blank" href="https://instagram.com/' + user.insta + '/">@' + user.insta + '</a>');
                        } else {
                            mod.find('.insta-photogr').hide().html('');
                        }
                        if (user.sites.length > 0) {
                            mod.find('.sites-photogr').show().html('' + gen_links(user.sites));
                        } else {
                            mod.find('.sites-photogr').hide().html('');
                        }
                        // костыль
                        mod.find('.sites-photogr').hide().html('');
                        mod.find('.insta-photogr').hide().html('');
                        mod.find('.sborderBtn').show();
                        mod.find('.regBtn').hide();
                        mod.find('.contact-info').show();
                        mod.find('.contact-top-text').html('Оставьте ваш запрос и я пришлю вам наше банкетное предложение в ближайшее время');

                        if (user.name) {
                            mod.find('.modal-manager-name').html(user.name);
                            mod.find('.modal-manager-avatar').html('<span style="background-image: url(' + user.photo_manager + '_1);"></span>\n\
                        <span style="background-image: url(' + user.photo_manager + '_2);"></span>\n\
                        <span style="background-image: url(' + user.photo_manager + '_3);"></span>\n\
						<span style="background-image: url(' + user.photo_manager + '_4);"></span>');

                            if (user.formOrderCount > 0) {
                                mod.find('.modal-manager-turned').show();
                                mod.find('.modal-manager-turned .cont-place-client-descr span').html(user.formOrderCount);
                            } else {
                                mod.find('.modal-manager-turned').hide();
                                mod.find('.modal-manager-turned .cont-place-client-descr span').html('');
                            }
                        }
                        else
                        {
                            mod.find('.modal-manager').hide();
                        }
                        ym(44538871, 'reachGoal', 'showContactsPlace');
                    }
                    else
                    {
                        // для исполнителей показываем контакты только авторизованным
                        mod.find('.for-face').show();
                        mod.find('.for-place').hide();
                        if (auth || user.tarif > 1) {
                            mod.find('.phone-photogr').show().html('<a href="tel:' + user.phone + '">' + format_phone(user.phone) + '</a>');
                            if (user.insta) {
                                mod.find('.insta-photogr').show().html('<a target="_blank" href="https://instagram.com/' + user.insta + '/">@' + user.insta + '</a>');
                            } else {
                                mod.find('.insta-photogr').hide().html('');
                                mod.find('.sites-photogr').addClass('full-photogr')
                            }

                            if (user.sites.length > 0) {
                                mod.find('.sites-photogr').show().html('' + gen_links(user.sites));
                            } else {
                                mod.find('.sites-photogr').hide().html('');
                                mod.find('.insta-photogr').addClass('full-photogr')
                            }
                            mod.find('.sborderBtn').show();
                            mod.find('.regBtn').hide();
                            mod.find('.contact-info').show();
                            // потом поменять на show(), когда появится мессагер
                            // mod.find('.contact-top-text').html('Мы рекомендуем вести общение с исполнителями посредством личных сообщений на WedWed. <br />Только в этом случае мы сможем помочь вам при возникновении каких-либо проблем и разногласий.');
                            mod.find('.contact-top-text').html('Мы рекомендуем запрашивать информацию о стоимости с помощью кнопки «Отправить запрос». Таким образом, подрядчик будет знать, что вы нашли его на нашем сайте wedwed.ru и с удовольствием <b>предоставит вам ту скидку, которую он указал в своем профиле</b>.');
                        } else {
                            mod.addClass('popup_face');
                            mod.find('.insta-photogr,.sites-photogr').hide().html('');
                            mod.find('.phone-photogr').show().html( user.sphone );
                            mod.find('.sborderBtn').hide();
                            mod.find('.regBtn').show();
                            mod.find('.contact-info').show();
                            var skid = $('.photo-carus-info-sale span')

                            if(skid.length > 0)
                            {
                                skid = skid.html().split('кидка ');
                                if(skid.length > 0)
                                {
                                    skid = skid[1];
                                }
                            }
                            else
                            {
                                skid = '10%';
                            }
                            mod.find('.contact-top-text').html('Чтобы посмотреть мои контакты и получить от меня<br><b class="grad">скидку ' + skid + '</b>, пройдите быструю регистрацию');

                        }
                        ym(44538871, 'reachGoal', 'showContactsFace');
                    }
                    ym(44538871, 'reachGoal', 'showContacts');
                }
            }
        });
    }
	$(document).on('click', '.sbshowCont', function (e) {
		e.preventDefault();

		var mod = $('#item-contact').modal('show');
		var id = $(this).data('id');
	    loadItem(id)
	});
	$('.see-more-comm a.border-sec-bt').click(function (e) {
		e.preventDefault();
		var ths = this;
		let page = 0;
		let data = {
			id: $(this).data('id'),
			page: 2,
			loadreviews: 1
		};
		if ($(this).data('page')) {
			data.page = $(this).data('page');
		}
		$(this).data('page', data.page + 1);
		$(this).attr('data-page', (data.page + 1).toString());
		$.ajax({
			url: '/api/loadReviews/',
			method: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				if (data.status) {
					data = data.data;
					$(ths).detach();
					$('#reviewid .place-comm-wrap').append(data.html);
					$('#reviewid .see-more-comm').append(ths);
					if (data.nextcount < 1) {
						$(ths).parent().remove();
					}
				} else {
					$(ths).parent().remove();
				}
			}
		});
	});
	$(document).on("click", ".showhidereview", function (e) {
		e.preventDefault();
		let cont = $(this).parents('.showlesscontent');
		let full = cont.find('.fulltext').html();
		cont.html(full);
	});
	$('.addreviewshowBtn').click(function (e) {
		e.preventDefault();
		$('#add-comm-form').modal('show');
	});
	$('#choose-avat').change(function () {
		var formData = new FormData();
		var that = this;
		formData.append('image', that.files[0]);
		$.ajax({
			url: $(this).parents('form').attr('action'),
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function (data) {
				if (data) {
					$(that).parents('form').find('.your-avat').css({
						'background-image': 'url(' + data + ')'
					}).removeClass('no-avat');
				}
			}
		});
	});
	$('#sbAddReviewForm').submit(function (e) {
		e.preventDefault();
		var ths = this;
		if (validate_form(this)) {
			let data = $(this).serializeArray();
			$.ajax({
				url: $(this).attr("action"),
				type: "POST",
				data: data,
				dataType: "json",
				success: function (json) {
					if (json.status === 'Ok') {
						clearForm('sbAddReviewForm');
						$(".comm-thumb span").addClass('no-avat').css({'background-image': 'url(/theme/youwedme/v2/images/comm-no-avat.svg)'});
						$(ths).find('.one-modal-message').html('');
						datePickerReInit();
						$('#ths-comm').modal('show');
						setTimeout(function () {
							prevModal = false;
						}, 600);
					} else {
						$(ths).find('.one-modal-message').html(json.message);
					}
				}
			});
		}
	});
	$('.LiveSearch').keyup(function () {
		var cont = $(this).parent();
		if ($(this).val().length >= 3) {
			if (prevsch !== $(this).val()) {
				prevsch = $(this).val();
				cont.find('.filt-search').stop().fadeIn().html('Уже ищу!');
				$.get(window.location.href.split('?')[0], {'action': 'livesearch', 'id': 1, 'q': $(this).val()},
						function (data) {
							if (data) {
								cont.find('.filt-search').html(data);
								$('.filt-search .lazy').Lazy();
							} else {
								cont.find('.filt-search').stop().hide();
								prevsch = '';
							}
						}
				);
			}
		} else {
			cont.find('.filt-search').stop().hide();
			prevsch = '';
		}
	}).focus(function () {
		var cont = $(this).parent();
		if ($(this).val().length >= 3) {
			if (prevsch !== $(this).val()) {
				prevsch = $(this).val();
				cont.find('.filt-search').stop().fadeIn().html('Уже ищу!');
				$.get(window.location.href.split('?')[0], {
					action: 'livesearch',
					id: 1,
					q: $(this).val()
				},
						function (data) {
							if (data) {
								cont.find('.filt-search').html(data);
							} else {
								cont.find('.filt-search').stop().hide();
								prevsch = '';
							}
						}
				);
			}
		} else {
			cont.find('.filt-search').stop().hide();
			prevsch = '';
		}
	});
	$(document).mouseup(function (e) {
		var div = $(".cat-filter:not(.d-none) .filter-search");
		if (!$(e.target).hasClass('filt-search') && div.has(e.target).length === 0) {
			div.find('.filt-search').stop().hide();
			prevsch = '';
		}
	});
	$('.clearItCat').click(function (e) {
		e.preventDefault();
		$(this).parents('.one-filt-sel-drop').find('input[type="checkbox"]').each(function () {
			this.checked = false;
		});
	});
// filter open dropdown
	$('.one-filt-sel-bt:not(.processed)').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			//$('.one-filt-sel-drop').slideUp();
			$(this).next('.one-filt-sel-drop').slideUp();
		} else {
			if ($(window).width() > 991) {
				$('.one-filt-sel-drop').slideUp();
				$('.one-filt-sel-bt').removeClass('open');
			}

			$(this).addClass('open').next('.one-filt-sel-drop').slideDown();
		}
	}).addClass('processed');
	$(document).click(function (e) {
		if (!$(e.target).is('.one-filt-sel-bt, .one-filt-sel-bt *, .one-filt-sel-drop, .one-filt-sel-drop *')) {
			$('.one-filt-sel-drop').slideUp();
			$('.one-filt-sel-bt').removeClass('open');
		}
	});
// show hide map
	$('.close-map, .hide-map a').click(function (e) {
		e.preventDefault();
		if ($(window).width() > 991) {
			$('.hide-map').hide();
			$('.viewonmap').fadeIn();
			$('.sidebar').removeClass('open');
			$('.content-wrap').removeClass('shown-map');
			setTimeout(function () {
				SlyReload();
			}, 500);
		} else {
			$('.side-map').fadeOut();
		}

	});
	/* sly sliders */


	$('#add-comm').scroll(() => {
		const datepicker = $('#add-comm .date-inp').data('datepicker');
		if (datepicker.visible) {
			datepicker.setPosition(datepicker.opts.position);
		}
	});
	$('#sale-modal').scroll(() => {
		const datepicker = $('#sale-modal .date-inp').data('datepicker');
		if (datepicker.visible) {
			datepicker.setPosition(datepicker.opts.position);
		}
	});
	$('#busy-photo').scroll(() => {
		const datepicker = $('#busy-photo .date-inp').data('datepicker');
		if (datepicker && datepicker.visible) {
			datepicker.setPosition(datepicker.opts.position);
		}
	});
// Place sindle carousel
    if($('.place-cont .general-descr').length > 0)
    {
        if ($(window).width() < 768) {

            $('body').addClass('thin');

            if(hiddenstringdesc !== '') {
                $('.place-cont .general-descr').html(hiddenstringdesc);
            }

            let spheight = (14*1.74*5);
            let inheight = $('.place-cont .general-descr').height();
            if(inheight > spheight)
            {
                $('.place-cont .general-descr').attr('data-inheight',inheight).attr('data-spheight',spheight);
                $('.place-cont .general-descr').addClass('needspoiler').height(spheight);
                $('.needspoiler').click(function(){
                    $(this).toggleClass('active');
                    console.log($(this).hasClass('active') ? $(this).data('inheight') : $(this).data('spheight'))
                    $(this).height($(this).hasClass('active') ? $(this).data('inheight') : $(this).data('spheight'));
                })
            }
        }
    }

	$('.place-carus-init:not(.slick-initialized)').each(function () {
		if ($(this).find('.one-slide-place').length) {
			var appendPlace;
			if ($(window).width() > 768) {
				appendPlace = $(this).parents('.photo-carus-wrap').find('.photo-carus-nav');
			} else {
				appendPlace = null;
			}
			$(this).on('init reInit afterChange', function (event, slick, currentSlide) {
//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
				if ($(this).find('.slick-slide').length !== 1) {
					var i = (currentSlide ? currentSlide : 0) + 1;
					//var iTwo = i+1;
					$(this).parents('.photo-carus-wrap').find('.photo-carus-num').html('<span>' + i + '</span> <i>/ ' + $(this).find('.slick-slide').length + '</i>');
				}
			});
			$(this).slick({
//dots: true,
				arrows: true,
				infinite: false,
				speed: 300,
				appendArrows: appendPlace,
				rows: 2,
				slidesPerRow: 3,
				slides: '.one-slide-place',
				//slidesToShow: 4,
				//slidesToScroll: 4,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							rows: 2,
							slidesPerRow: 1,
							variableWidth: true
						}
					}
					//   {
					//     breakpoint: 600,
					//     settings: {
					//       slidesToShow: 2,
					//       slidesToScroll: 2
					//     }
					//   },
					//   {
					//     breakpoint: 480,
					//     settings: {
					//       slidesToShow: 1,
					//       slidesToScroll: 1
					//     }
					//   }
					// You can unslick at a given breakpoint now by adding:
					// settings: "unslick"
					// instead of a settings object
				]
			});
		}
	});
// stiky sidebar
	if ($(".side-place").length && $(window).width() > 992) {
		$(".side-place").stick_in_parent();
	}

	$(document).click(function (e) {
		if (!$(e.target).is('.gall-drop-bt, .gall-drop-list, .gall-drop-list *')) {
			$('.gall-drop-list').slideUp();
		}
	});
	$(".js-disable-slider").click(function (e) {
		e.preventDefault();
		$(this).parents('.photo-carus-wrap').find('.slick-slider').slick('unslick');
		$(this).parent().remove();
	});
	$(".js-disable-vslider").click(function (e) {
		e.preventDefault();
		if ($(this).parents('.prod-place-block').find('.slick-slider').length) {
			$(this).parents('.prod-place-block').find('.slick-slider').slick('unslick');
		}
		$(this).parent().remove();
	});
// modal in modal fix
	$(document).on('hidden.bs.modal', function (event) {
		if ($('.modal:visible').length) {
			$('body').addClass('modal-open');
		}
	});
// show number
	$('.order-cont-show-num a').click(function (e) {
		e.preventDefault();
		$(this).fadeOut(0);
		$('.order-cont-num span').text($('.order-cont-num span').attr('data-real'));
		let nn =  $('.order-cont-num').text();
        $('.order-cont-num').html('<a href="tel:'+nn+'">'+nn+'</a>');
	});
// photographer single carousel
// Place sindle carousel 
	$('.photogr-carus-init').each(function (index) {

		$('.photogr-carus-init').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			if (slick.slideCount !== 1) {
				var i = (currentSlide ? currentSlide : 0) + 1;
				//var iTwo = i+1;
				$(this).parents('.one-carus-tab').find('.photo-carus-num').html('<span>' + i + '</span> <i>/ ' + slick.slideCount + '</i>');
			}
		});
		$(this).slick({
//dots: true,
			infinite: false,
			speed: 300,
			appendArrows: $(this).parents('.one-carus-tab').find('.photo-carus-nav'),
			slidesToShow: 1,
			slidesToScroll: 1
		});
	});
	$('.tabs-photos ul').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active')
				.parents('.photo-carus-wrap').find('.one-carus-tab').fadeOut(0).eq($(this).index()).fadeIn();
		$('.photogr-carus-init').slick('setPosition');
	});
	if ($('.other-place-carus').length) {
		$('.other-place-carus').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			appendArrows: '.other-place-nav',
			dots: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						variableWidth: true
					}
				}
			]
		}).on('afterChange', function (event, slick, currentSlide) {
			if ($(slick.$list.context).hasClass('other-place-carus')) {
				$('.other-place-carus .one-other-place-thumb').each(function () {
					var html = '';
					if ($(this).hasClass('slick-initialized')) {
						$(this).find('.one-other-place-slider:not(.slick-cloned)').each(function () {
							html += '<div class="one-other-place-slider">' + $(this).html() + '</div>';
							// восстанавливаем исходное содержимое
						});
					}
// чистим от обработчиков событий и другого мусора
					$(this).unbind('*').removeClass('slick-initialized').removeClass('slick-slider').html(html);
					// повторно инициализируем
					$(this).slick();
				});
			}
		});
	}

	if ($('.one-rec-prof-thumb-slider').length) {
		$('.one-rec-prof-thumb-slider').slick({
//appendArrows: '.carousel-nav',
			infinite: false,
			//arrows: false,
			dots: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: false,
						swipe: false,
						touchMove: false
					}
				}
			]
		});
	}

// check box mobile fiter active
	$(".one-place-filter input[type=checkbox]").change(function () {
		if (this.checked) {
			$(this).parents('.one-place-filter').addClass('checked');
		} else {
			$(this).parents('.one-place-filter').removeClass('checked');
		}


	});

// show mobile filter 
	if ($('.bg-filter').length) {
		$('.bg-filter').remove();
		$('body').prepend('<div class="bg-filter"></div>');
	} else {
		$('body').prepend('<div class="bg-filter"></div>');
	}

	$('.mob-filter-bt a').click(function (e) {
		e.preventDefault();
		$('.bg-filter').fadeIn();
		$('.cat-filter').fadeIn();
		$('body').addClass('open-filter');
	});
	$('.filter-mob-close').click(function (e) {
		e.preventDefault();
		$('.bg-filter').fadeOut();
		$('.cat-filter').fadeOut();
		$('body').removeClass('open-filter');
	});
	$('.bg-filter').click(function (e) {
		e.preventDefault();
		$('.bg-filter').fadeOut();
		$('.cat-filter').fadeOut();
		$('body').removeClass('open-filter');
	});
// filter mobile top open dropdown
	$('.mob-top-bt a').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			//$('.one-filt-sel-drop').slideUp();
			$('.top-mobile-drop').slideUp();
		} else {
			if ($(window).width() > 991) {
				$('.top-mobile-drop').slideUp();
				$('.mob-top-bt a').removeClass('open');
			}

			$(this).addClass('open');
			$('.top-mobile-drop').slideDown();
		}
	});
	$(document).click(function (e) {
		if (!$(e.target).is('.mob-top-bt, .mob-top-bt *, .top-mobile-drop, .top-mobile-drop *')) {
			$('.top-mobile-drop').slideUp();
			$('.mob-top-bt a').removeClass('open');
		}
	});
//// show hide mob map
//$('.mob-map-bt a').click(function (e) {
//e.preventDefault();
//$('.side-map').fadeIn();
//    $('.mob-map-carus-in').slick('setPosition');
//});
//
//// map mob slider
//$('.mob-map-carus-in').slick({
//    dots: false,
//    arrows: false,
//    infinite: true,
//    speed: 300,
//    slidesToShow: 1,
//    centerMode: true,
//    variableWidth: true
//}); 
	if ($(window).width() < 768 && $('.photos-place').length) {
		$('.photos-place').slick({
			dots: false,
			arrows: true,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			centerMode: false,
			variableWidth: false,
			slickFilter: '.big-photo,.min-photo'
		});
	}

	if ($(window).width() < 768 && $('.prod-place-video-in').length) {
		$('.prod-place-video-in .vidsContainer .one-place-video.d-none').removeClass('d-none');
		$('.prod-place-video-in .sbMorevideo').parent().remove();
		$('.prod-place-video-in .vidsContainer').slick({
			dots: false,
			arrows: true,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			centerMode: false,
			variableWidth: true
		});
	}


// filter mobile top open dropdown
	$('.mob-time-bt a').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			//$('.one-filt-sel-drop').slideUp();
			$('.time-mobile-drop').slideUp();
		} else {
			if ($(window).width() > 991) {
				$('.time-mobile-drop').slideUp();
				$('.mob-time-bt a').removeClass('open');
			}

			$(this).addClass('open');
			$('.time-mobile-drop').slideDown();
		}
	});
	$(document).click(function (e) {
		if (!$(e.target).is('.mob-time-bt, .mob-time-bt *, .time-mobile-drop, .time-mobile-drop *')) {
			$('.time-mobile-drop').slideUp();
			$('.mob-time-bt a').removeClass('open');
		}
	});
	$(document).on('click', '.go-to-comm', function (event) {
		event.preventDefault();
		let add = 20;
		if ($(window).width() < 992) {
			add = $('header .container .header').height() + 20;
		}
		$('html, body').animate({
			scrollTop: $('.prod-place-comm').offset().top - add}, 1000);
	});
	$('.general-descr a').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('show');
		$(this).parents('.general-descr').find('.other-hide-text').toggleClass('show');
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > $('header').height()) {
			$('.mob-fix-block').addClass('show');
		} else {
			$('.mob-fix-block').removeClass('show');
		}
	});

    function clearForm(id) {
        $(':input[type=text], :input[type=password], :input[type=email], :input[type=number], textarea', '#' + id)
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');

        $(':input[type=radio], :input[type=checkbox]', '#' + id)
            .not(':button, :submit, :reset, :hidden')
            .removeAttr('checked')
            .removeAttr('selected');
    }
	// if ($('#mack-map').length) {
	// 	if (!window.mockMap) {
	// 		ymaps.ready(function () {
	// 			window.mockMap = new ymaps.Map('mack-map', {
	// 				center: ccoo,
	// 				zoom: 11,
	// 				controls: []
	// 			}, {
	// 				searchControlProvider: 'yandex#search'
	// 			});
	// 			window.fullscreenControl = new ymaps.control.FullscreenControl({
	// 				options: {
	// 					float: 'left'
	// 				}
	// 			});
	// 			mockMap.controls.add(fullscreenControl);
	// 			window.zoomControl = new ymaps.control.ZoomControl();
	// 			mockMap.controls.add(zoomControl);
	// 			mackBalloonLayout = ymaps.templateLayoutFactory.createClass(
	// 					'<div class="popover top sb-popover">' +
	// 					'<a class="close" href="#">&times;</a>' +
	// 					'<div class="arrow"></div>' +
	// 					'<div class="popover-inner">' +
	// 					'$[[options.contentLayout observeSize minWidth=284 maxWidth=284 minHeight=268]]' +
	// 					'</div>' +
	// 					'</div>', {
	// 						/**
	// 						 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
	// 						 * @function
	// 						 * @name build
	// 						 */
	// 						build: function () {
	// 							this.constructor.superclass.build.call(this);
	// 							this._$element = $('.popover', this.getParentElement());
	// 							this.applyElementOffset();
	// 							this._$element.find('.close')
	// 									.on('click', $.proxy(this.onCloseClick, this));
	// 						},
	// 						/**
	// 						 * Удаляет содержимое макета из DOM.
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
	// 						 * @function
	// 						 * @name clear
	// 						 */
	// 						clear: function () {
	// 							this._$element.find('.close')
	// 									.off('click');
	// 							this.constructor.superclass.clear.call(this);
	// 						},
	// 						/**
	// 						 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
	// 						 * @function
	// 						 * @name onSublayoutSizeChange
	// 						 */
	// 						onSublayoutSizeChange: function () {
	// 							mackBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
	// 							if (!this._isElement(this._$element)) {
	// 								return;
	// 							}
    //
	// 							this.applyElementOffset();
	// 							this.events.fire('shapechange');
	// 						},
	// 						/**
	// 						 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
	// 						 * @function
	// 						 * @name applyElementOffset
	// 						 */
	// 						applyElementOffset: function () {
	// 							this._$element.css({
	// 								left: -(this._$element[0].offsetWidth / 2),
	// 								top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
	// 							});
	// 						},
	// 						/**
	// 						 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
	// 						 * @function
	// 						 * @name onCloseClick
	// 						 */
	// 						onCloseClick: function (e) {
	// 							e.preventDefault();
	// 							this.events.fire('userclose');
	// 						},
	// 						/**
	// 						 * Используется для автопозиционирования (balloonAutoPan).
	// 						 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
	// 						 * @function
	// 						 * @name getClientBounds
	// 						 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
	// 						 */
	// 						getShape: function () {
	// 							if (!this._isElement(this._$element)) {
	// 								return mackBalloonLayout.superclass.getShape.call(this);
	// 							}
    //
	// 							var position = this._$element.position();
	// 							return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
	// 								[position.left, position.top], [
	// 									position.left + this._$element[0].offsetWidth,
	// 									position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
	// 								]
	// 							]));
	// 						},
	// 						/**
	// 						 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
	// 						 * @function
	// 						 * @private
	// 						 * @name _isElement
	// 						 * @param {jQuery} [element] Элемент.
	// 						 * @returns {Boolean} Флаг наличия.
	// 						 */
	// 						_isElement: function (element) {
	// 							return element && element[0] && element.find('.arrow')[0];
	// 						}
	// 					});
	// 			mackBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
	// 					'<div class="popover-image" style="background-image: url(\'$[properties.balloonImage]\')"></div>' +
	// 					'<div class="popover-logo" style="background-image: url(\'$[properties.balloonLogo]\')"></div>' +
	// 					'<a href="$[properties.balloonLink]" target="_blank"><h3 class="popover-title">$[properties.balloonHeader]</h3></a>' +
	// 					'<div class="popover-address">$[properties.balloonAddress]</div>' +
	// 					'<div class="popover-content">$[properties.balloonContent]</div>');
	// 			var myPlacemark = new ymaps.Placemark(
	// 					ccoo,
	// 					{
	// 						balloonContent: nameOfAbout,
	// 						balloonHeader: nameOfMap,
	// 						balloonImage: nameOfmain,
	// 						balloonLogo: nameOflogo,
	// 						balloonLink: '/catalog/item/' + nameOfid + '/',
	// 						balloonAddress: nameOfaddress,
	// 						balloonId: 'bal' + nameOfid
	// 					},
	// 					(
	// 							{
	// 								iconLayout: 'default#image',
	// 								iconImageHref: '/theme/youwedme/html/newhtml/images/pina.png',
	// 								iconImageSize: [60, 66],
	// 								iconImageOffset: [-28, -61],
	// 								balloonShadow: false,
	// 								balloonLayout: mackBalloonLayout,
	// 								balloonContentLayout: mackBalloonContentLayout,
	// 								balloonPanelMaxMapArea: 0
	// 							}
    //
	// 					)
	// 					);
	// 			window.mockMap.geoObjects.removeAll().add(myPlacemark);
	// 			myMap.setCenter(ccoo);
	// 		});
	// 	}
	// }
	if ($('.photo-top-carus-init').length) {
		$('.photo-top-carus-init').slick({
			slidesToShow: 1,
			slidesToScroll: 1
		}).on('beforeChange', function () {
			$('.lazygal').lazy();
		}).on('afterChange', function () {
			$('.lazygal').lazy();
		});
	}

	$('.lazygal').lazy();
	$(".phone-mask:not(.processed)").inputmask("+7 (999) 999-99-99").addClass('processed');
	if ($.datepicker || $('body').datepicker) {
		$('.date-inp:not(.processed)').datepicker({
			minViewMode: 1,
			multidate: true,
			multipleDates: true,
			autoClose: false,
			selectOtherMonths: false,
			showOtherMonths: false,
			moveToOtherMonthsOnSelect: false
		}).addClass('processed');
	}
});

$(function () {
   // console.log('here we are')
  //  setTimeout(function () {
        if($('.js-init-carous.new').length > 0) {
            var frames = $('.js-init-carous.new').removeClass('new');
            if (frames.length) {
                for (let i = 0; i < frames.length; i++) {
                    SlyFrames[SlyFrames.length] = newSly(frames[i]);
                }
            }

            setTimeout(function () {
                $('aside').css({'min-height': $('.cont-body').height()});
            }, 500);
        }
        // if (typeof criaSlides === 'function') {
        //     criaSlides(); // КОСТЫЛЬ, выстраивает слайдер с задержкой
        //
        // }
  //  },500)
});

document.addEventListener('gesturestart', function (e) {
	e.preventDefault();
});
$(function () {
	$('.side-menu-other a:not(.processed)').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('.side-menu ul').removeClass('show-all');
		} else {
			$(this).addClass('open');
			$('.side-menu ul').addClass('show-all');
		}

	}).addClass('processed');


	$('#photo .photo-tabs li a').click(function(e){
	    e.preventDefault();
	    $('#phicat').val($(this).text())
        $('#phicat').parent().submit();
    })
});