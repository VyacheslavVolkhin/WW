;
var e = {
    key: 'newmodal',
    fixedBgPos: 0,
    fixedContentPos: !0,
    showCloseBtn: !0,
    removalDelay: 0,
    preloader: !0,
    type: "inline",
    mainClass: "mfp-fade mfp-s-loading",
    galery: {
        enabled: !0
    }
};
//window.fbAsyncInit = function () {
//    FB.init({
//        appId: '2297794277006022',
//        cookie: true,
//        xfbml: true,
//        version: 'v3.2'
//    });
//};
//(function (d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {
//        return;
//    }
//    js = d.createElement(s);
//    js.id = id;
//    js.src = "https://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));
/* регистрация */
function fb_yahoo() {
//    FB.login(function (response) {
//        if (response.status === 'connected') {
//            FB.api('/me', 'GET', {access_token: response.authResponse.accessToken, fields: 'first_name,last_name,id,email,link'}, function (response) {
//
//                $("#registerFormAfterSocial input[name=firstname]").val(response.first_name + ' ' + response.last_name);
//                $("#registerFormAfterSocial input[name=email]").val(response.email);
//                $("#registerFormAfterSocial input[name=uid]").val(response.id);
//                $("#registerFormAfterSocial input[name=network]").val('facebook');
//                $("#registerFormAfterSocial input[name=profile]").val('https://www.facebook.com/profile.php?id=' + response.id);
//                response['network'] = 'facebook';
//                response['profile'] = 'https://www.facebook.com/profile.php?id=' + response.id;
//                $.post("/service/ulogin/", {'udata': response});
//            });
//        } else {
//            console.log('The person is not logged into this app or we are unable to tell.');
//        }
//    }, {scope: 'public_profile, email'});
}
function vk_yahoo() {
    alert("Временно не работает..");
    $.post("/service/vk/", {'code': true}, function (response) {
        console.log(response);
    });
}

/* вход */
function fb_yahooho() {
//    FB.login(function (response) {
//        if (response.status === 'connected') {
//            FB.api('/me', 'GET', {access_token: response.authResponse.accessToken, fields: 'id,email'}, function (response) {
//
//                response['network'] = 'facebook';
//                response['profile'] = 'https://www.facebook.com/profile.php?id=' + response.id;
//                $.post("/service/uloginauth/", {'udata': response}, function (data) {
//                    if (data === 'ok') {
//                        location.href = "/user/";
//                    }
//                });
//            });
//        } else {
//            console.log('The person is not logged into this app or we are unable to tell.');
//        }
//    }, {scope: 'public_profile, email'});
}

$(function () {
    $('#popupLogin #login_email,#popupLogin #login_email').keyup(function (e) {
        if (e.keyCode && e.keyCode === 13) {
            $('#ajaxLogin').click();
        }
    });
});
$(document).ready(function () {
    var vk_login = getCookie('vk_login');
    if (typeof vk_login !== 'undefined') {
        /*$.magnificPopup.open({
         items: {
         src: "#popupLogin"
         },
         showCloseBtn: false,
         closeOnBgClick: false,
         enableEscapeKey: false,
         popupArgs: e
         });
         $("#socialForm div.jq-radio.js-styled:last").addClass("checked");
         $("form#loginForm input[name=social]").attr("checked", "checked");*/

        console.log('Тут мы авторизуемся.');
        document.cookie = 'vk_login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        VK.Auth.login(function (response) {
            if (response.session) {
                console.log(response.session);
                console.log(response.session.user);
                respons = {};
                respons['first_name'] = response.session.user.first_name;
                respons['email'] = '';
                respons['network'] = 'vkontakte';
                respons['uid'] = response.session.user.id;
                respons['profile'] = response.session.user.href;
                console.log(respons);
                $.post("/service/uloginauth/", {'udata': respons}, function (data) {
                    if (data === 'ok') {
                        location.href = "/user/";
                    }
                });
            } else {
                // Пользователь нажал кнопку Отмена в окне авторизации
            }
        });
    } else {

        var vk_register = getCookie('vk_register');
        if (typeof vk_register !== 'undefined') {
            $.magnificPopup.open({
                items: {
                    src: "#socialRegisterOne"
                },
                showCloseBtn: false,
                closeOnBgClick: false,
                enableEscapeKey: false,
                popupArgs: e
            });
            $("#socialRegisterOne div.jq-radio.js-styled:last").addClass("checked");
            $("#socialRegisterOne div.jq-radio.js-styled:last input[name=social]").attr("checked", "checked");
            console.log('процесс регистрации через соц сеть.');
            document.cookie = 'vk_register=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            VK.Auth.login(function (response) {
                if (response.session) {
                    console.log(response.session);
                    console.log(response.session.user);
                    respons = {};
                    respons['first_name'] = response.session.user.first_name;
                    respons['email'] = '';
                    respons['network'] = 'vkontakte';
                    respons['uid'] = response.session.user.id;
                    respons['profile'] = response.session.user.href;
                    console.log(respons);
                    $("#registerFormAfterSocial input[name=firstname]").val(response.session.user.first_name + ' ' + response.session.user.first_name.last_name);
                    $.post("/service/ulogin/", {'udata': respons, 'test': true}, function (data) {
                        console.log("Регистрация в незавершенных");
                    });
                } else {
                    // Пользователь нажал кнопку Отмена в окне авторизации
                }
            });
        }

    }
});
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
        return parts.pop().split(";").shift();
}

function number_format(str) {
    return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
}

jQuery.fn.ForceNumericOnly =
        function ()
        {
            return this.each(function ()
            {
                $(this).keydown(function (e)
                {
                    var key = e.charCode || e.keyCode || 0;
                    // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                    // home, end, period, and numpad decimal
                    return (
                            key == 8 ||
                            key == 9 ||
                            key == 13 ||
                            key == 46 ||
                            key == 110 ||
                            key == 190 ||
                            (key >= 35 && key <= 40) ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                });
            });
        };
function popupLogic() {

    if (Cookies.get('phone') && typeof (Cookies.get('phone')) != 'undefined' && Cookies.get('phone') != '') {
        $("#registerFormAfterSocial input[name=phone]").val(Cookies.get('phone'));
    }
    if (Cookies.get('email') && typeof (Cookies.get('email')) != 'undefined') {
        $("#registerFormAfterSocial input[name=email]").val(Cookies.get('email'));
    }
    if (Cookies.get('network') && typeof (Cookies.get('network')) != 'undefined') {
        $("#registerFormAfterSocial input[name=network]").val(Cookies.get('network'));
    }
    if (Cookies.get('profile') && typeof (Cookies.get('profile')) != 'undefined') {
        $("#registerFormAfterSocial input[name=profile]").val(Cookies.get('profile'));
    }
    if (Cookies.get('first_name') && typeof (Cookies.get('first_name')) != 'undefined') {
        $("#registerFormAfterSocial input[name=firstname]").val(Cookies.get('first_name'));
    }

    $(document).ready(function () {
        $(document).on("click", ".list-radio__item", function () {
            if ($(this).find("input").val() == 'customer') {
                $("div.social-register").show();
            } else {
                $("div.social-register").hide();
            }
            checkClientType();
        });
        $(document).on("keyup", 'input.input-bit', function (event) {
            $(this).val(number_format($(this).val()));
        });
        if ($("input.input-onlydigit").length)
            $("input.input-onlydigit").ForceNumericOnly(); //15-11-2018
    })


    /*if (Cookies.get('lost') && typeof(Cookies.get('lost')) != 'undefined') {
     // запрет закрытия окна
     if (location.pathname == '/user/') {
     $("input[name=lost]").val(Cookies.get('lost'));
     $.magnificPopup.open({
     items: {
     src: "#registrationDetails"
     },
     showCloseBtn: false,
     closeOnBgClick: false,
     enableEscapeKey: false,
     popupArgs: e
     })
     }
     }*/

    $("#registerFormAfterSocial").on("submit", function (t) {
        t.preventDefault();
        var frm = $('#registerFormAfterSocial');
        var coords = frm.find('input[name=coords]');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                coords.val(position.coords.latitude + ',' + position.coords.longitude);
            }, function () {
                coords.val('');
            });
        } else {
            coords.val('');
        }
        frm.find("div.box-field__input").each(function () {
            if (!$(this).find("div.field_e").length) {
                $(this).find("input").after("<div class='field_e'>***</div>");
            }
        });
        if (!frm.find('input[name=datewedding]').val()) {
            if (frm.find('input[name=datewedding]').parents('.box-field__input').find("div.field_e").length) {
                frm.find('input[name=datewedding]').after("<div class='field_e'>Обязательно для заполнения</div>");
            }
            frm.find('input[name=datewedding]').parents('.box-field__input').find("div.field_e").html('Обязательно для заполнения').show();
        } else {
            $("div.field_e").hide();
            frm.find("input").removeClass("error"); //add
            frm.find("button[type=submit] div").html("Проверка данных...");
            frm.find("button[type=submit]").attr("disabled", true);
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                success: function (data) {
                    if (data.register === 'ok') {
                        location.href = data.redirect;
                    } else {
                        if (data.register === 'false') {
                            frm.find("button[type=submit] div").html("Начать планирование");
                            frm.find("button[type=submit]").attr("disabled", false);
                            if (data.field && data.field.length && data.field[0] == 'captcha') {
                                alert(data.error);
                            } else {
                                for (var field in data.field) {
                                    frm.find("input[name='" + data.field[field] + "']").addClass('error').next("div.field_e").html(data.error).show();
                                }
                            }
                        } else {
                            location.href = '/desktop/?_super=client'; //12-04-2019
                        }
                    }
                    console.log(data);
                },
                error: function (data) {
                    console.log('An error occurred.');
                    console.log(data);
                }
            });
        }
    });
    $("#registerFormExecutive").on("submit", function (t) {
        t.preventDefault();
        var frm = $('#registerFormExecutive');
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            success: function (data) {
                if (data.register == 'ok') {
                    location.href = data.redirect;
                } else {
                    alert(data.error);
                }
                console.log(data);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    });
    $("#registerFormExecutive input[name=login]").keyup(function () {
        var _this = $(this);
        $.post("/service/check-field/", {
            'login': _this.val(),
            'field': 'login'
        }, function (data) {
            if (data == 'true') {
                _this.removeClass("error-js");
            } else {
                _this.addClass("error-js");
            }
        });
    })
    $("#registerFormExecutive input[name=email]").keyup(function () {
        var _this = $(this);
        $.post("/service/check-field/", {
            'email': _this.val(),
            'field': 'email'
        }, function (data) {
            if (data == 'true') {
                _this.removeClass("error-js");
            } else {
                _this.addClass("error-js");
            }
        });
    })

    $("#registerFormTwo input[name=code]").keyup(function () {
        var _this = $(this);
        $.post("/service/check-code-sms/", {
            'code_sms': _this.val(),
            'field': 'code_sms'
        }, function (data) {
            if (data == 'true') {
                _this.removeClass("error-js");
            } else {
                _this.addClass("error-js");
            }
        });
    });
    function sms_counter_start() {
        $(window.sms_el).addClass('disablesms').html('Вы можете отправить код повторно через ' + window.sms_counter + ' секунд');
        setTimeout(function () {
            window.sms_counter = window.sms_counter - 1;
            if (window.sms_counter < 1) {
                $(window.sms_el).removeClass('disablesms').html('Отправить еще раз');
            } else {
                sms_counter_start();
            }
        }, 1000);
    }

    function sendSms()
    {
        $.ajax({
            url: "/service/send-sms/?phone=" + $("#registerFormOne input[name=phone]").val() + '&lost=' + getCookie('lost'),
            type: "GET",
            success: function (json) {
                if (json.status == 'Ok') {

                } else {

                }
            }
        });
    }

    $("a.smsRepeat").click(function (e) {
        window.sms_counter = 30;
        window.sms_el = this;
        sms_counter_start();
        if ($(this).hasClass('disablesms')) {
            return false;
        }
        e.preventDefault();
        var i = $(this).find("span").html() * 1;
        if (i) {
            i--;
            $(this).find("span").html(i);
            sendSms();
            $(this).after("<span style='color: gray;'><br>смс отправлено</span>").delay(1000).queue(function () {
                $(this).next().remove();
                $(this).dequeue();
            });
        }
    });
    $("#registerFormOne").on("submit", function (t) {
        t.preventDefault();
        $('#registrationExecutive input[name=specialization]').val($('#registerFormOne select[name=specialization]').val());
        if ("executive" === $(this).find($('.js-styled.checked input[type="radio"]')).val()) {
            //$.magnificPopup.open({
            //items: {
            //src: "#registrationExecutive"
            //},
            //popupArgs: e
            //});
            //var phone = $("#registerFormOne input[name=phone]").val();
            //$("#registerFormExecutive input[name=phone]").val(phone);
            stepByStepRegister();
        } else {
            if ($('#registrationCode .smsRepeat').length) {
                window.sms_counter = 30;
                window.sms_el = $('#registrationCode .smsRepeat').get(0);
                sms_counter_start();
                // gen sms code
                sendSms();
                $.magnificPopup.open({
                    items: {
                        src: "#registrationCode"
                    },
                    popupArgs: e
                });
                var phone = $("#registerFormOne input[name=phone]").val();
                $("#registerFormAfterSocial input[name=phone]").val(phone);
                dataLayer.push({'event': 'client_register'});
            }
        }
    });
    $("#registerFormTwo").on("submit", function (t) {
        t.preventDefault();
        $.post("/service/check-code-sms/", {'code_sms': $("#registerFormTwo input[name=code]").val(), 'field': 'code_sms', 'lost': $("#registerFormOne input[name=phone]").val()},
                function (data) {
                    if (data === 'true') {
                        $.magnificPopup.open({
                            items: {
                                src: "#registrationDetails"
                            },
                            popupArgs: e
                        });
                    }
                });
    });
    $("ul.social-buttons li a.social-button").click(function (t) {
        t.preventDefault();
        var s = $(this).html();
        $("#socialForm div.jq-radio.js-styled").removeClass("checked");
        // вход в соц сеть ulogin
        if (s === 'Facebook') {
            $("#socialForm div.jq-radio.js-styled:first").addClass("checked");
        } else {
            $("#socialForm div.jq-radio.js-styled:last").addClass("checked");
        }
    });
    $("#registerFormSocialOne").on("submit", function (t) {
        t.preventDefault();
        if ($("#registerFormSocialOne input[name=phone]").val().length)
            $("#registerFormAfterSocial input[name=phone]").val($("#registerFormSocialOne input[name=phone]").val());
        if ($("#registrationCode .smsRepeat").length > 0) {
            window.sms_counter = 60;
            window.sms_el = $("#registrationCode .smsRepeat").get(0);
            sms_counter_start();
            $.ajax({
                url: "/service/send-sms/?phone=" + $("#registerFormSocialOne input[name=phone]").val() + '&lost=' + getCookie('lost'),
                type: "GET",
                success: function (json) {
                    if (json.status && json.status === 'Ok') {

                    } else {

                    }
                }
            });
            $.magnificPopup.open({
                items: {
                    src: "#registrationCode"
                },
                popupArgs: e
            });
        }
    });
    $("#socialForm").on("submit", function (t) {
        t.preventDefault(), $(this).find(".main-button").css({
            display: "none"
        });
        $(this).find(".social-register__ready").css({
            display: "flex"
        });
        setTimeout(function () {
            $.magnificPopup.open({
                items: {
                    src: "#socialRegisterTwo"
                },
                popupArgs: e
            });
        }, 3e3);
    });
    $("#forgottenForm").on("submit", function (t) {
        t.preventDefault(), setTimeout(function () {
            $.magnificPopup.open({
                items: {
                    src: "#popupForgottenMessage"
                },
                popupArgs: e
            });
        }, 0);
    });
}

$(document).ready(function () {
    $("#ajaxLogin").click(function () {
        var login = $("#login_email").val();
        var password = $("#login_password").val();
        $("#login_email, #login_password").removeClass("error-js");
        if (login.length && password.length) {

            $.ajax({
                type: 'post',
                url: '/modules/ajax/login.php',
                data: 'login=' + login + '&password=' + password,
                cache: false,
                //contentType: 'json',
                success: function (json) {

                    if (json == -1) {
                        $("#login_email, #login_password").addClass("error-js");
                    } else {
                        if (json) {
                            location.href = "/user/";
                            $(".mfp-close").click();
                        }
                    }

                },
                error: function () {

                }
            });
        } else {
            if (!login.length) {
                $("#login_email").addClass("error-js").keyup(function () {
                    $(this).removeClass('error-js').unbind('keyup').keyup(function (e) {
                        if (e.keyCode && e.keyCode === 13) {
                            $('#ajaxLogin').click();
                        }
                    });
                });
            }
            if (!password.length) {
                $("#login_password").addClass("error-js").keyup(function () {
                    $(this).removeClass('error-js').unbind('keyup').keyup(function (e) {
                        if (e.keyCode && e.keyCode === 13) {
                            $('#ajaxLogin').click();
                        }
                    });
                });
            }
        }
    });
    $("#ajaxForgotten").click(function () {
        var login = $("#forgotten_email").val();
        if (login.length) {

            $.ajax({
                type: 'post',
                url: '/login/password/',
                data: 'email=' + login + "&submit=true",
                cache: false,
                //contentType: 'json',
                success: function (json) {

                },
                error: function (json) {

                },
            });
        }
    })
});
function onloadRecaptchaCallback() {
    grecaptcha.render('html_element', {
        sitekey: '6Lezh8MUAAAAAMHCQ7g4b9Z9Z9fzofEVK8nFa0U_'
    });
}