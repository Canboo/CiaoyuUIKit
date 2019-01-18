(function($) {
	$.setting = {
		init:function(){
            // 讀取mCustomScrollbar
            $('aside').load('/CiaoyuUIKit/include/aside.htm', function() {
                // 側邊選單自訂捲軸
                $('.aside-inner').mCustomScrollbar({setTop:'0',scrollbarPosition:'outside'});
                $.setting.asideActive();
            });
            // 讀取內容
            $('header').load('/CiaoyuUIKit/include/header.htm');
            // 增加圖層
            $('.wrapper').append('<div class="cover"></div>');
            // 收合選單
            $(document).on('click', '.btn-open,.cover', function() {
                $('body').toggleClass('show-menu');
            });
            // 文件宣告
            $('main').append( $('<p class="copyright">Ciaoyu Web UI Kits 是由 Canboo 匯整而成，本文件最後更新時間為 '+document.lastModified+'.</p>') );
        },
        // 使當頁項目設為選取狀態
        asideActive:function() {
            var page = window.location.href;
            if ( 0 > page.indexOf('.htm') ) page += 'index.htm';
            $('#navigation a').each(function(index, el) {
                var e = $(el), src = e.attr('href'),
                    site = location.protocol+'//'+location.hostname;
                if ( site.length == page.indexOf(src) ) {
                    e.addClass('active').parents('ul').addClass('show').siblings('a').removeClass('collapsed');
                };
            });
        }
	};

	$(function () {
        $.setting.init();
	});
})(jQuery);
