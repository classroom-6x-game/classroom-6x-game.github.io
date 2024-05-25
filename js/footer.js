window.onload = function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#back-to-top').fadeIn();

        } else {
            $('#back-to-top').fadeOut();
        }
    });
    $("#back-to-top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 300);
    });

    $(".menu-show").on('click', function() {
        $(".mobile-categories").toggle();
    });

    $(".search-show").on('click', function(e) {
        $(".mobile-searching-box").show();
        e.stopPropagation();
    });
    $(".box-mobile-search").click(function(e) {
        e.stopPropagation();
    });
    $(".mobile-searching-box").click(function() {
        $(this).hide();
    });
    $('.button').on('click', function() {
        let data_class = $(this).data('class');
        if (data_class == 'false' || data_class == false) {
            return;
        } else if (data_class == 'active-like') {
            $(this).addClass(data_class);
            $(this).attr('disabled', true);
            $('.is-dislike').hide();
        } else {
            $(this).addClass(data_class);
            $(this).attr('disabled', true);
            $('.is-like').hide();
        }
    });
}
$("#expand").on('click', function() {
    $("#iframehtml5").addClass("force_full_screen");
    requestFullScreen(document.body);
});
function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
function cancelFullScreen() {
    $("#iframehtml5").removeClass("force_full_screen");
    var requestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreenBtn;
    if (requestMethod) {
        requestMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
    if (document.webkitIsFullScreen === false ||
        document.mozFullScreen === false ||
        document.msFullscreenElement === false) {
        cancelFullScreen();
    }
}
function runValidate() {
    jQuery("#contact-form").validate({
        focusInvalid: false,
        onfocusout: false,
        ignore: ".ignore",
        rules: {
            Name: {
                required: true,
                maxlength: 255,
            },
            Email: {
                required: true,
                email: true,
                maxlength: 100
            },
            Website: {
                required: false,
                maxlength: 255,
            },
            Topic: {
                required: false,
                maxlength: 255,
            },
            Message: {
                required: true,
                maxlength: 65525
            },
            "hiddenRecaptcha": {
                required: function() {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        messages: {
            Name: {
                required: "Please type your name!",
                maxlength: "255"
            },
            Email: {
                required: "Please type your email!",
                email: "Please check a valid email!",
                maxlength: "100"
            },
            Message: {
                required: "Please type your message!",
                maxlength: "65525"
            },
            "hiddenRecaptcha": {
                required: "Please verify you are human!",
            }
        },
        submitHandler: function() {
            let question_ajax = "/make-contact.ajax";
            let name = jQuery("#Name").val();
            let email = jQuery("#Email").val();
            let website = jQuery("#Website").val();
            let subject = jQuery("#Topic").val();
            let message = jQuery("#Message").val();
            let metadataload = {};
            metadataload.name = name;
            metadataload.email = email;
            metadataload.website = website;
            metadataload.subject = subject;
            metadataload.message = message;
            jQuery.ajax({
                url: question_ajax,
                data: metadataload,
                type: 'POST',
                success: function(data) {
                    if (data != 0 || data != '0') {
                        showSuccessMessage();
                    }
                }
            });
        }
    });
}
function showSuccessMessage(message) {
    document.getElementById('fcf-status').innerHTML = '';
    document.getElementById('fcf-form').style.display = 'none';
    document.getElementById('fcf-thank-you').style.display = 'block';
}
function resetFormDemo() {
    document.getElementById('fcf-form').style.display = "block";
    document.getElementById('fcf-thank-you').style.display = "none";
}
$("#_exit_full_screen").on('click', cancelFullScreen);
$(document).ready(function(){
    addPlugin();
})
function addPlugin() {
    if (!id_game && !url_game) {
        return
    }
    let url = "/add-plugin.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id_game: id_game,
            url_game: url_game,
        },
        success: function(response) {
            if (response) {
                let data = JSON.parse(response);
                $("#append-rate").html(data.rate);
                $("#append-comment").html(data.comment);
            }
        }
    })
}
function paging(p) {
    $(".loading_mask").removeClass("hidden");
    if (!p) {
        p = 1;
    }
    let url = "/paging.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            p: p,
            keywords: keywords,
            field_order: field_order,
            order_type: order_type,
            category_id: category_id,
            is_hot: is_hot,
            is_new: is_new,
            tags_id: tags_id,
            limit: limit,
        },
        success: function(response) {
            $(".loading_mask").addClass("hidden");
            $('html, body').animate({
                scrollTop: $(".game_item").offset().top
            }, 1000);
            if (response) {
                $("#ajax-append").html(response);

            }
        }
    })
}
$(window).resize(function(){
    $('.mobile-categories').hide();
    $('.mobile-searching-box').hide();
})
.resize();
