(function ($) {

    // monkey patch for datepicker afterShow
    $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function (inst) {
        $.datepicker._updateDatepicker_original(inst);
        var afterShow = this._get(inst, 'afterShow');
        if (afterShow) { afterShow.apply(inst.input ? inst.input[0] : null); }
    };

    $.fn.weekpicker = function (options) {

        // save weekpicker element
        var el = $(this),
			// default settings
			settings = $.extend({
			    firstDay: 0,
			    delimiter: ' to ',
			    dateFormat: $.datepicker._defaults.dateFormat
			}, options);

        // add from and to fields, 
        el.append('<input class="ui-weekpicker-input ui-weekpicker-from"/>' + settings.delimiter + '<input class="ui-weekpicker-input ui-weekpicker-to"/>');
        $('.ui-weekpicker-to', el).click(function () { $('.ui-weekpicker-from', el).focus(); });

        // return configured datepicker
        return $('.ui-weekpicker-from', el).datepicker({
            firstDay: settings.firstDay,
            showOtherMonths: true,
            selectOtherMonths: true,
            onSelect: function () {
                var startDate, endDate;
                var date = $(this).datepicker('getDate');
                var dayOffset = (date.getDay() - settings.firstDay + 7) % 7;

                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOffset);
                endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOffset + 6);

                el.find('.ui-weekpicker-from').val($.datepicker.formatDate(settings.dateFormat, startDate));
                $('.ui-weekpicker-to', el).val($.datepicker.formatDate(settings.dateFormat, endDate));
            },
            afterShow: function () {
                $('#ui-datepicker-div .ui-datepicker-calendar tbody').on('mousemove', 'tr', function () {
                    $(this).find('td a').addClass('ui-state-hover');
                });
                $('#ui-datepicker-div .ui-datepicker-calendar tbody').on('mouseleave', 'tr', function () {
                    $(this).find('td a').removeClass('ui-state-hover');
                });
                $('.ui-datepicker-current-day').parent().find('td a').addClass('ui-state-active');
            },
            onClose: function () {
                $('#ui-datepicker-div .ui-datepicker-calendar tbody').off('mousemove', 'tr');
                $('#ui-datepicker-div .ui-datepicker-calendar tbody').off('mouseleave', 'tr');
            }
        });
    };

})(jQuery);
