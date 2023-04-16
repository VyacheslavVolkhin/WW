var waitForJQuery = setInterval(function () {
    if (typeof $ != 'undefined') {
        clearInterval(waitForJQuery);

        if( $(window).innerWidth() < 768) {
            $(window).scroll(function () {
                $('#footer-mobile_menu').toggleClass('shower', $(this).scrollTop() > $('header').height() || $('#lodingHeader').hasClass('fix') || $('body').height() <= $(window).innerHeight() + 80);
            });

            setTimeout(function(){

                $('#footer-mobile_menu').toggleClass('shower', $(this).scrollTop() > $('header').height() || $('#lodingHeader').hasClass('fix') || $('body').height() <= $(window).innerHeight() + 80);
            },1000)

        }
        else
        {
            $('#footer-mobile_menu').toggleClass('shower', false);
        }
        //console.log($(this).scrollTop() > $('header').height())
        $('.sub-submenu_toggle').click(function(){
            $(this).parents('li').toggleClass('active')
        })

        $('.footer-mobile_menu-content-item').click(function () {
            let i = $(this).index();
            $('.footer-mobile_menu-content-item').each(function (k, v) {
                if (k != i) {
                    $(this).removeClass('active')
                }
            })

            $(this).toggleClass('active');
            let sm = $('.footer-mobile_menu-content-item.active').data('submenu');

            $('body').toggleClass('submenu_mobile', $('.menu-toggle').hasClass('active') || $('.catalog-toggle').hasClass('active') || $('.profile-toggle').hasClass('active') ||  $('.favorite-toggle').hasClass('active'))
            $('html').toggleClass('submenu_mobile', $('.menu-toggle').hasClass('active') || $('.catalog-toggle').hasClass('active') || $('.profile-toggle').hasClass('active') ||  $('.favorite-toggle').hasClass('active'))
            $('.footer-mobile_submenu').scrollTop(0);
            $('.footer-mobile_submenu').toggleClass('active', false)
            $('.footer-mobile_menu-submenu_wrapper').toggleClass('active', false)
            $('.footer-mobile_menu-submenu_wrapper').attr('style', '')
            if($('.favorite-toggle.active').length > 0)
            {
                $.ajax({
                    url: '/api/',
                    method: 'get',
                    cache: false,
                    dataType: 'json',
                    success: function (json) {
                        var cnt = $('.footer-mobile_submenu.submenu03 .fav-show'), photolist, cimg, timg;
                        let html = [], i = -1, j = 0, item = {}, spec = '', list = '';
                        //$('.fav-show').removeClass('loading');
                        if (json.status && json.status === true) {
                            for (var m = 0; m < json.data.length; m++) {
                                item = json.data[m];
                                if (spec !== item.specialization) {
                                    if (i > -1) {
                                        // вставляем лист в шаблон блока, еще раз после цикла повторяем процедуру, индивидуально для последнего элемента
                                        html[i] = html[i].split('{catcount}').join(j).split('{list}').join(list);
                                        // следующая строчка строго в конце
                                        j = 0, list = ''; // обнуляем счетчки элементов в категории
                                    }
                                    spec = item.specialization;
                                    i = html.length;
                                    html[i] = '<div class="fav-list"><div class="fav-list-name">' + spec + ' ({catcount})</div>{list}</div>';
                                }
                                photolist = '';
                                if (item.photos && item.photos.length) {
                                    for (var n = 0; n < item.photos.length; n++) {
                                        cimg = item.photos[n];
                                        timg = item.thumbs[n];
                                        photolist = photolist + '<a href="#videoModal" data-href="' + cimg + '" data-thumb="' + timg + '" data-group="favuser' + item.id + '" class="ndsp"></a>';
                                    }
                                }
                                let links = '';
                                if (item.links) {
                                    for (var n = 0; n < item.links.length; n++) {
                                        links = links + '<p><a href="' + item.links[n] + '" target="_blank">' + item.links[n] + '</a></p>';
                                    }
                                }
                                if (item.place === true) {
                                    // шаблон площадки
                                    list += '<div class="one-fav-item" id="favitem' + item.id + '">' +
                                        '<div class="one-fav-item-thumb">' +
                                        '<div class="one-fav-item-slider">' +
                                        '<div class="one-fav-slider-thumb">' +
                                        '<a href="#videoModal" style="background-image: url(' + item.logo + ');" data-href="' + item.first + '" data-thumb="' + item.fthumb + '" data-group="favuser' + item.id + '" data-pid="' + item.id + '" class="photobox"></a>' + photolist +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-descr">' +
                                        '<div class="one-fav-item-tit">' +
                                        '<a href="' + item.link + '" target="_blank">' + item.nameOf + '</a>' +
                                        '<div class="det-fav">' +
                                        '<a href="/catalog/?id=' + item.id + '&action=delete&table=wishlist" class="favdel" data-id="' + item.id + '">' +
                                        '<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M9.23914 17L10.5326 15.7065C15.337 11.4565 18.4783 8.59239 18.4783 5.08152C18.4783 2.21739 16.2609 0 13.3967 0C11.8261 0 10.2554 0.73913 9.23914 1.94022C8.22284 0.73913 6.65218 0 5.08153 0C2.2174 0 1.14441e-05 2.21739 1.14441e-05 5.08152C1.14441e-05 8.59239 3.14131 11.4565 7.94566 15.7065L9.23914 17Z" fill="#FE365F"/>' +
                                        '</svg>' +
                                        '</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-bt">' +
                                        '<div class="fav-call-bt">' +
                                        (isMobile ? '<a class="def-bt" href="tel:' + tel_phone(item.phone) + '">' : '<a class="def-bt sbshowCont" href="#" data-id="' + item.id + '">') +
                                        '<i>' +
                                        '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M12.1641 9.04819C11.6414 8.53213 10.9888 8.53213 10.4694 9.04819C10.0732 9.44107 9.67699 9.83394 9.28744 10.2335C9.1809 10.3433 9.091 10.3667 8.96115 10.2934C8.70479 10.1536 8.43177 10.0404 8.18539 9.88721C7.03673 9.16472 6.07452 8.23581 5.22218 7.19036C4.79934 6.67097 4.42312 6.11495 4.16009 5.48901C4.10682 5.36249 4.11681 5.27926 4.22002 5.17604C4.61622 4.79316 5.00244 4.40028 5.39198 4.00741C5.93469 3.46138 5.93469 2.82212 5.38866 2.27277C5.07902 1.9598 4.76938 1.65349 4.45974 1.34052C4.14011 1.02089 3.82381 0.697937 3.50086 0.381639C2.97813 -0.127767 2.32556 -0.127767 1.80617 0.384969C1.40663 0.777843 1.02375 1.18071 0.617555 1.56692C0.241327 1.92317 0.0515486 2.35933 0.0115952 2.86874C-0.0516643 3.69777 0.151432 4.48019 0.437765 5.24263C1.02375 6.82079 1.91604 8.22249 2.99811 9.50766C4.45974 11.2456 6.20437 12.6207 8.24532 13.6129C9.16425 14.059 10.1165 14.4019 11.1519 14.4585C11.8644 14.4985 12.4837 14.3187 12.9798 13.7627C13.3194 13.3831 13.7023 13.0369 14.0619 12.674C14.5946 12.1346 14.5979 11.482 14.0685 10.9493C13.4359 10.3134 12.8 9.68079 12.1641 9.04819Z" fill="white"/>' +
                                        '</svg>' +
                                        '</i>' +
                                        '</a>' +
                                        '</div>' +
                                        '<div class="fav-work-bt">' +
                                        '<a href="" class="sborderBtn" data-id="' + item.id + '">' +
                                        '<span>' +
                                        '<i>' +
                                        '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M4.59209 7.17185C4.59209 7.00901 4.46 6.87708 4.29702 6.87708H3.26733C3.10453 6.87708 2.97241 7.00901 2.97241 7.17185V8.20141C2.97241 8.36448 3.10453 8.49646 3.26733 8.49646H4.29702C4.46 8.49646 4.59209 8.36448 4.59209 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M7.16591 7.17185C7.16591 7.00901 7.03379 6.87708 6.87113 6.87708H5.8413C5.6785 6.87708 5.54639 7.00901 5.54639 7.17185V8.20141C5.54639 8.36448 5.6785 8.49646 5.8413 8.49646H6.87113C7.03379 8.49646 7.16591 8.36448 7.16591 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M9.73955 7.17185C9.73955 7.00901 9.60743 6.87708 9.44464 6.87708H8.41495C8.25196 6.87708 8.11987 7.00901 8.11987 7.17185V8.20141C8.11987 8.36448 8.25196 8.49646 8.41495 8.49646H9.44464C9.60743 8.49646 9.73955 8.36448 9.73955 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M4.59209 9.74587C4.59209 9.58275 4.46 9.45093 4.29702 9.45093H3.26733C3.10453 9.45093 2.97241 9.58275 2.97241 9.74587V10.7752C2.97241 10.9382 3.10453 11.0702 3.26733 11.0702H4.29702C4.46 11.0702 4.59209 10.9382 4.59209 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M7.16591 9.74587C7.16591 9.58275 7.03379 9.45093 6.87113 9.45093H5.8413C5.6785 9.45093 5.54639 9.58275 5.54639 9.74587V10.7752C5.54639 10.9382 5.6785 11.0702 5.8413 11.0702H6.87113C7.03379 11.0702 7.16591 10.9382 7.16591 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M9.73955 9.74587C9.73955 9.58275 9.60743 9.45093 9.44477 9.45093H8.41495C8.25196 9.45093 8.11987 9.58275 8.11987 9.74587V10.7752C8.11987 10.9382 8.25196 11.0702 8.41495 11.0702H9.44477C9.60743 11.0702 9.73955 10.9382 9.73955 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M11.5804 1.4473V3.01987C11.5804 3.73065 11.0038 4.30344 10.2931 4.30344H9.48102C8.77029 4.30344 8.18603 3.73065 8.18603 3.01987V1.44165H4.52584V3.01987C4.52584 3.73065 3.9416 4.30344 3.23098 4.30344H2.41875C1.7081 4.30344 1.13151 3.73065 1.13151 3.01987V1.4473C0.510387 1.46602 0 1.97997 0 2.61169V11.8277C0 12.4713 0.521652 12.9999 1.16525 12.9999H11.5466C12.1893 12.9999 12.7119 12.4702 12.7119 11.8277V2.61169C12.7119 1.97997 12.2015 1.46602 11.5804 1.4473ZM11.2032 11.2538C11.2032 11.5319 10.9777 11.7576 10.6995 11.7576H1.99023C1.71199 11.7576 1.48647 11.5319 1.48647 11.2538V6.4934C1.48647 6.21516 1.71196 5.98951 1.99023 5.98951H10.6994C10.9777 5.98951 11.2032 6.21516 11.2032 6.4934L11.2032 11.2538Z" fill="#00CF7D"/>' +
                                        '<path d="M2.4161 3.46059H3.21935C3.46316 3.46059 3.66084 3.2632 3.66084 3.01939V0.441359C3.66084 0.197524 3.46316 0 3.21935 0H2.4161C2.17227 0 1.97461 0.197524 1.97461 0.441359V3.01939C1.97461 3.2632 2.17227 3.46059 2.4161 3.46059Z" fill="#00CF7D"/>' +
                                        '<path d="M9.47052 3.46059H10.2738C10.5174 3.46059 10.7151 3.2632 10.7151 3.01939V0.441359C10.7151 0.197524 10.5174 0 10.2738 0H9.47052C9.22674 0 9.02905 0.197524 9.02905 0.441359V3.01939C9.02905 3.2632 9.22674 3.46059 9.47052 3.46059Z" fill="#00CF7D"/>' +
                                        '</svg>' +
                                        '</i>' +
                                        'Уточнить занятость' +
                                        '</span>' +
                                        '</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-left">' +
                                        '<div class="one-fav-item-geo">' +
                                        '<a href="#" class="SBmodalMapPrepare" data-phone="' + item.phone + '" data-ocount="' + item.formOrderCount + '" data-manager="' + item.manager + '" data-links="' + encodeURIComponent(links) + '" data-mname="' + item.name + '" data-id="' + item.id + '" data-auth="' + json.auth + '" data-place="' + item.place + '" data-name="' + item.nameOf + '" data-toggle="modal" data-target="#mapModal" data-title="' + item.nameOf + '" data-address="' + item.address + '" data-coords="[' + item.lat + ',' + item.lng + ']" data-logo="' + item.reallogo + '" data-insta="' + item.insta + '" data-tarif="' + item.tarif + '">' + item.address + '</a>' +
                                        '</div>' +
                                        '<div class="one-fav-item-info">' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Вместимость: ' + (item.people1 ? (
                                            item.people2 > 0 ? 'от <span>' + item.people1 + ' чел.</span> до <span>' + item.people2 + ' чел.</span>' : 'до <span>' + item.people1 + ' чел.</span>'
                                        ) : '') + ' на банкет' +
                                        '</div>' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Стоимость: ' + (item.price1 ? (
                                            item.price2 > 0 ? 'от <span>' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span> до <span>' + formatMoney(item.price2, 0, '', '&nbsp;') + ' руб.</span>  за чел.' : 'от <span>' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span>  за чел.'
                                        ) : '') + '' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="mob-info-fav">' +
                                        '<div class="one-fav-item-info">' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Вместимость: ' + (item.people1 ? (
                                            item.people2 > 0 ? 'от <span>' + item.people1 + ' чел.</span> до <span>' + item.people2 + ' чел.</span>' : 'от <span>' + item.people1 + ' чел.</span>'
                                        ) : '') + '' +
                                        '</div>' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Стоимость: ' + (item.price1 ? (
                                            item.price2 > 0 ? 'от <span>' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span> до <span>' + formatMoney(item.price2, 0, '', '&nbsp;') + ' руб.</span>  на банкет' : 'от <span>' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span>  на банкет'
                                        ) : '') + '' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                                } else {
                                    // шаблон подрядчика
                                    list += '<div class="one-fav-item" id="favitem' + item.id + '">' +
                                        '<div class="one-fav-item-thumb">' +
                                        '<div class="one-fav-item-slider">' +
                                        '<div class="one-fav-slider-thumb">' +
                                        '<a href="#videoModal" style="background-image: url(' + item.logo + ');" data-href="' + item.first + '" data-thumb="' + item.fthumb + '" data-group="favuser' + item.id + '" data-pid="' + item.id + '" class="photobox"></a>' + photolist +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-descr">' +
                                        '<div class="one-fav-item-tit">' +
                                        '<a href="' + item.link + '" target="_blank">' + item.nameOf + '</a>' +
                                        '<div class="det-fav">' +
                                        '<a href="/catalog/?id=' + item.id + '&action=delete&table=wishlist" class="favdel" data-id="' + item.id + '">' +
                                        '<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M9.23914 17L10.5326 15.7065C15.337 11.4565 18.4783 8.59239 18.4783 5.08152C18.4783 2.21739 16.2609 0 13.3967 0C11.8261 0 10.2554 0.73913 9.23914 1.94022C8.22284 0.73913 6.65218 0 5.08153 0C2.2174 0 1.14441e-05 2.21739 1.14441e-05 5.08152C1.14441e-05 8.59239 3.14131 11.4565 7.94566 15.7065L9.23914 17Z" fill="#FE365F"/>' +
                                        '</svg>' +
                                        '</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-bt">' +
                                        '<div class="fav-call-bt">' +
                                        (isMobile ? '<a class="def-bt" href="tel:' + tel_phone(item.phone) + '">' : '<a class="def-bt sbshowCont" href="#" data-id="' + item.id + '">') +
                                        '<i>' +
                                        '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M12.1641 9.04819C11.6414 8.53213 10.9888 8.53213 10.4694 9.04819C10.0732 9.44107 9.67699 9.83394 9.28744 10.2335C9.1809 10.3433 9.091 10.3667 8.96115 10.2934C8.70479 10.1536 8.43177 10.0404 8.18539 9.88721C7.03673 9.16472 6.07452 8.23581 5.22218 7.19036C4.79934 6.67097 4.42312 6.11495 4.16009 5.48901C4.10682 5.36249 4.11681 5.27926 4.22002 5.17604C4.61622 4.79316 5.00244 4.40028 5.39198 4.00741C5.93469 3.46138 5.93469 2.82212 5.38866 2.27277C5.07902 1.9598 4.76938 1.65349 4.45974 1.34052C4.14011 1.02089 3.82381 0.697937 3.50086 0.381639C2.97813 -0.127767 2.32556 -0.127767 1.80617 0.384969C1.40663 0.777843 1.02375 1.18071 0.617555 1.56692C0.241327 1.92317 0.0515486 2.35933 0.0115952 2.86874C-0.0516643 3.69777 0.151432 4.48019 0.437765 5.24263C1.02375 6.82079 1.91604 8.22249 2.99811 9.50766C4.45974 11.2456 6.20437 12.6207 8.24532 13.6129C9.16425 14.059 10.1165 14.4019 11.1519 14.4585C11.8644 14.4985 12.4837 14.3187 12.9798 13.7627C13.3194 13.3831 13.7023 13.0369 14.0619 12.674C14.5946 12.1346 14.5979 11.482 14.0685 10.9493C13.4359 10.3134 12.8 9.68079 12.1641 9.04819Z" fill="white"/>' +
                                        '</svg>' +
                                        '</i>' +
                                        '</a>' +
                                        '</div>' +
                                        '<div class="fav-work-bt">' +
                                        '<a href="" class="sborderBtn" data-action="order-step2" data-btntext="Отправить запрос" data-place="' + item.place + '" data-id="' + item.id + '" data-logo="' + item.reallogo + '" data-name="' + item.nameOf + '">' +
                                        '<span>' +
                                        '<i>' +
                                        '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        '<path d="M4.59209 7.17185C4.59209 7.00901 4.46 6.87708 4.29702 6.87708H3.26733C3.10453 6.87708 2.97241 7.00901 2.97241 7.17185V8.20141C2.97241 8.36448 3.10453 8.49646 3.26733 8.49646H4.29702C4.46 8.49646 4.59209 8.36448 4.59209 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M7.16591 7.17185C7.16591 7.00901 7.03379 6.87708 6.87113 6.87708H5.8413C5.6785 6.87708 5.54639 7.00901 5.54639 7.17185V8.20141C5.54639 8.36448 5.6785 8.49646 5.8413 8.49646H6.87113C7.03379 8.49646 7.16591 8.36448 7.16591 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M9.73955 7.17185C9.73955 7.00901 9.60743 6.87708 9.44464 6.87708H8.41495C8.25196 6.87708 8.11987 7.00901 8.11987 7.17185V8.20141C8.11987 8.36448 8.25196 8.49646 8.41495 8.49646H9.44464C9.60743 8.49646 9.73955 8.36448 9.73955 8.20141V7.17185Z" fill="#00CF7D"/>' +
                                        '<path d="M4.59209 9.74587C4.59209 9.58275 4.46 9.45093 4.29702 9.45093H3.26733C3.10453 9.45093 2.97241 9.58275 2.97241 9.74587V10.7752C2.97241 10.9382 3.10453 11.0702 3.26733 11.0702H4.29702C4.46 11.0702 4.59209 10.9382 4.59209 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M7.16591 9.74587C7.16591 9.58275 7.03379 9.45093 6.87113 9.45093H5.8413C5.6785 9.45093 5.54639 9.58275 5.54639 9.74587V10.7752C5.54639 10.9382 5.6785 11.0702 5.8413 11.0702H6.87113C7.03379 11.0702 7.16591 10.9382 7.16591 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M9.73955 9.74587C9.73955 9.58275 9.60743 9.45093 9.44477 9.45093H8.41495C8.25196 9.45093 8.11987 9.58275 8.11987 9.74587V10.7752C8.11987 10.9382 8.25196 11.0702 8.41495 11.0702H9.44477C9.60743 11.0702 9.73955 10.9382 9.73955 10.7752V9.74587Z" fill="#00CF7D"/>' +
                                        '<path d="M11.5804 1.4473V3.01987C11.5804 3.73065 11.0038 4.30344 10.2931 4.30344H9.48102C8.77029 4.30344 8.18603 3.73065 8.18603 3.01987V1.44165H4.52584V3.01987C4.52584 3.73065 3.9416 4.30344 3.23098 4.30344H2.41875C1.7081 4.30344 1.13151 3.73065 1.13151 3.01987V1.4473C0.510387 1.46602 0 1.97997 0 2.61169V11.8277C0 12.4713 0.521652 12.9999 1.16525 12.9999H11.5466C12.1893 12.9999 12.7119 12.4702 12.7119 11.8277V2.61169C12.7119 1.97997 12.2015 1.46602 11.5804 1.4473ZM11.2032 11.2538C11.2032 11.5319 10.9777 11.7576 10.6995 11.7576H1.99023C1.71199 11.7576 1.48647 11.5319 1.48647 11.2538V6.4934C1.48647 6.21516 1.71196 5.98951 1.99023 5.98951H10.6994C10.9777 5.98951 11.2032 6.21516 11.2032 6.4934L11.2032 11.2538Z" fill="#00CF7D"/>' +
                                        '<path d="M2.4161 3.46059H3.21935C3.46316 3.46059 3.66084 3.2632 3.66084 3.01939V0.441359C3.66084 0.197524 3.46316 0 3.21935 0H2.4161C2.17227 0 1.97461 0.197524 1.97461 0.441359V3.01939C1.97461 3.2632 2.17227 3.46059 2.4161 3.46059Z" fill="#00CF7D"/>' +
                                        '<path d="M9.47052 3.46059H10.2738C10.5174 3.46059 10.7151 3.2632 10.7151 3.01939V0.441359C10.7151 0.197524 10.5174 0 10.2738 0H9.47052C9.22674 0 9.02905 0.197524 9.02905 0.441359V3.01939C9.02905 3.2632 9.22674 3.46059 9.47052 3.46059Z" fill="#00CF7D"/>' +
                                        '</svg>' +
                                        '</i>' +
                                        'Уточнить занятость' +
                                        '</span>' +
                                        '</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="one-fav-item-left">' +
                                        '<div class="one-fav-item-info">' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Ведение свадьбы: ' + (item.price1 > 0 ? '<span class="was">' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span> ' : '') + (item.price2 > 0 ? '<span>' + formatMoney(item.price2, 0, '', '&nbsp;') + ' руб.</span>' : '') +
                                        '</div>' +
                                        (item.discont ? '<div class="one-fav-item-info-block"><i class="sale">Скидка ' + item.discont + '%</i></div>' : '') +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="mob-info-fav">' +
                                        '<div class="one-fav-item-info">' +
                                        '<div class="one-fav-item-info-block">' +
                                        'Ведение свадьбы: ' + (item.price1 > 0 ? '<span class="was">' + formatMoney(item.price1, 0, '', '&nbsp;') + ' руб.</span> ' : '') + (item.price2 > 0 ? '<span>' + formatMoney(item.price2, 0, '', '&nbsp;') + ' руб.</span>' : '') +
                                        '</div>' +
                                        (item.discont ? '<div class="one-fav-item-info-block"><i class="sale">Скидка ' + item.discont + '%</i></div>' : '') +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                                }
                                j++;
                            }
                            html[i] = html[i].split('{catcount}').join(j).split('{list}').join(list);
                            cnt.html(html.join(''));


                            init_after_fav_load();
                            popupVideoInit();



                        } else {
                            cnt.html('<h4 class="fav-noload">Вы еще ничего не добавляли в избранное</h4>');
                        }
                        $('.footer-mobile_submenu.submenu03 .fav-show').toggleClass('showed',true);
                        $('.footer-mobile_menu-submenu_wrapper').toggleClass('active', true)
                        var h = Math.min($('.footer-mobile_submenu.submenu03').height(),$(window).innerHeight() / 3 * 2) + 20
                        $('.footer-mobile_menu-submenu_wrapper').height(0)
                        $('.footer-mobile_menu-submenu_wrapper').animate({height: h},300,function(){
                            $('.footer-mobile_submenu.submenu' + sm).toggleClass('active', true)
                        })

                    }
                });
            }
            else {


                if (sm) {

                    $('.footer-mobile_menu-submenu_wrapper').toggleClass('active', true)
                    var h = Math.min($('.footer-mobile_submenu.submenu' + sm).height(), $(window).innerHeight() / 3 * 2) + 20
                    $('.footer-mobile_menu-submenu_wrapper').height(0)
                    $('.footer-mobile_menu-submenu_wrapper').animate({height: h}, 300, function () {

                        $('.footer-mobile_submenu.submenu' + sm).toggleClass('active', true)


                    })
                }
            }

            if ($('.header .nav').hasClass('open')) {
                $('body').removeClass('open-modal')
                $('.header .nav').removeClass('open')
            }
        })
        dragElement(document.getElementById('submenu_wrapper'));
        $(document).on('click','body.submenu_mobile .bg-plan',function(){
            $('.footer-mobile_menu-content-item.active').click();
        })
        setTimeout(function(){
            if ($('.bg-plan').length) {
                $('.bg-plan').remove();
                $('body').prepend('<div class="bg-plan"></div>');
            } else {
                $('body').prepend('<div class="bg-plan"></div>');
            }



        },1000)
        let curUrl = window.location.href.split('wedwed.ru');
        if(curUrl[1] != '/plan_promo/')
        {
            $('.footer-mobile_submenu a').each(function(){
                let at = $(this).attr('href');
                if(at === curUrl[1])
                {
                    $(this).addClass('current')
                }
            })
        }
    }
},10)

function dragElement(elmnt) {
    var pos2 = 0, pos4 = 0;
    var elh =  parseInt($(elmnt).innerHeight());

    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        //  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown
        //  ;
        document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.ontouchstart = dragMouseDown;
    }

    function dragMouseDown(e) {
        $(elmnt).addClass('dragging')
        // e = e || window.event;
        // e.preventDefault();
        // get the mouse cursor position at startup:
        elh =  parseInt($(elmnt).height());

        var touchobj = e.changedTouches[0]
        //pos3 = e.clientX;
        //pos4 = e.clientY;
        // pos3 = touchobj.pageX
        pos4 = touchobj.pageY
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.ontouchmove = elementDrag;
        // console.log(e)
    }

    function elementDrag(e) {
        // e = e || window.event;
        // e.preventDefault();
        // calculate the new cursor position:
        var touchobj = e.changedTouches[0]
        // pos1 = pos3 - touchobj.pageX
        pos2 = touchobj.pageY - pos4

        // pos3 = touchobj.pageX
        //pos4 = touchobj.pageY

        //pos2 = Math.max(pos2,62);
        // set the element's new position:
        $(elmnt).height(elh  - pos2);

        // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    // $(function(){
    //     $('.header .nav').height($(window).innerHeight());
    // })
    function closeDragElement() {
        $(elmnt).removeClass('dragging')
        if($(elmnt).height() < $(window).innerHeight() / 2)
        {
            let sm = $('.footer-mobile_menu-content-item.active').data('submenu');
            $('.footer-mobile_menu-content-item').removeClass('active')
            $('body').toggleClass('submenu_mobile', $('.menu-toggle').hasClass('active') || $('.catalog-toggle').hasClass('active') || $('.profile-toggle').hasClass('active') ||  $('.favorite-toggle').hasClass('active'))
            $('html').toggleClass('submenu_mobile', $('.menu-toggle').hasClass('active') || $('.catalog-toggle').hasClass('active') || $('.profile-toggle').hasClass('active') ||  $('.favorite-toggle').hasClass('active'))
            $('.footer-mobile_submenu').scrollTop(0);
            $('.footer-mobile_menu-submenu_wrapper').animate({height: 0},200,function(){
                $('.footer-mobile_submenu.submenu' + sm).toggleClass('active', false)
                $('.footer-mobile_menu-submenu_wrapper').hide();

                $('.footer-mobile_menu-submenu_wrapper').toggleClass('active', false)
                setTimeout(function(){
                    $('.footer-mobile_menu-submenu_wrapper').attr('style', '')
                    $('.footer-mobile_menu-submenu_wrapper').show()
                },100)

            })
        }
        // stop moving when mouse button is released:
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}