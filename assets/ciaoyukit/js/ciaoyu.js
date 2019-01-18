var langs = ['刪除後無法回復，是否確定刪除?'],
    body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
(function($) {
	$.ciaoyu = {
		init:function() {
            this.btnEvents();
            this.imgEvents();
            this.inputEvents();
        },
        btnEvents:function() {
            // 點擊確認
            $(document).on('click', '.btn-confirm:not(.btn-disable)', function() {
                return btnConfirm(this);
            });
            // 點擊鎖定
            $(document).on('click', '.btn-disable:not(.btn-confirm)', function() {
                btnDisable(this);
            });
            // 點擊確認後鎖定
            $(document).on('click','.btn-confirm.btn-disable', function() {
                var r = btnConfirm(this);
                if ( r ) btnDisable(this);
                return r;
            });
            function btnConfirm(e){
                var $s = $(e).data('confirm');
                return confirm($s ? $s : langs[0]);
            };
            function btnDisable(e){
                var $v = $(e).prop('tagName');
                if ($v == 'A') {
                    $(e).addClass('disabled').attr({tabindex: '-1', 'aria-disabled': 'true'});
                } else {
                    $(e).prop('disabled', true);
                }
            };
            // 點擊確認後鎖定
            $(document).on('click','.btn-countdown',
                function() {
                    var e = $(this), origin = e.html(), text = e.data('text');
                    e.data('origin',origin);
                    if ( !text ) {
                        text = origin;
                    };
                    countdown(e,e.data('num'),text);
                }
            );
            function countdown(e,s,t) {
                s -= 1;
                if (s >= 0) {
                    e.prop('disabled', true).html(t+' (' + (s+1) + ')');
                    setTimeout(function() {
                        countdown(e,s,t);
                    },1000);
                } else e.prop('disabled', false).html(e.data('origin'));
            }
            // 返回頂端
            $(document).on('click','.btn-spytop',
                function() {
                    body.stop().animate({
                        scrollTop:0,
                    },800);
                    return false;
                }
            );
        },
        imgEvents:function() {
            $('.img-setbg').each(function(index, el) {
                var e = $(el),
                    s = $(el).attr('src');
                if ( e.hasClass('lazyload') && e.data('src') ) {
                    s = e.data('src');
                };
                e.parent().css('background-image','url("'+s+'")');
                e.remove();
            });
        },
        inputEvents:function() {
            // 檔案上傳顯示檔名
            $('.input-upload > [type=file]').on('change',function() {
                var fileName = $(this).val().split('\\').pop(),
                    btn = $(this).next('span');
                if ( !btn.data('text') ) btn.data('text',btn.html());
                if ( !fileName ) {
                    fileName = btn.data('text');
                };
                $(this).next('span').html(fileName);
            });
        }
	};

	$(function() {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var e = ["%c %c %c CiaoYu Web UI Kit ✰ Love You Always Forever ✰  %c  ", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;"];
            window.console.log.apply(console, e);
        };
        $.ciaoyu.init();
	});
})(jQuery);
