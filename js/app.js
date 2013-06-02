/*global $,_,angular*/




var edesignlabs = edesignlabs || {};
(function (edesignlabs) {
    'use strict';
    edesignlabs.datahunt = {

        //Bootstrap the app
        startApp: function () {
            var showNavTab = function (tab) {
                if (!tab) return;
                var $selectedTab = $(tab);
                if (!$selectedTab.is(':visible')) {
                    $('.nav-section').hide();
                    $selectedTab.show();
                }
            };

            //wire up nav tabs
            $('.nav-tab').click(function(evt){
                var $this = $(this),
                    selectedTab = $this.attr('href');
                showNavTab(selectedTab);
                $('.nav-menu').find('.active').removeClass('active');
                !$this.hasClass('brand') && $this.parent().addClass('active');
            });
            $('.nav-section').hide();
            showNavTab('#landing');
        }


    };
})(edesignlabs);
