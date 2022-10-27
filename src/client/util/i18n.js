'use strict'

var lang_de = require('../../../resources/lang/de.json');
var lang_ka = require('../../../resources/lang/ka.json');

var languages = {
    de: lang_de,
    ka: lang_ka
};

function i18n () {
    return {};
}

i18n.lang = 'de';

i18n.tr = function (string) {
    var format_string = languages[i18n.lang][string];
    var position = -1;
    var index = 1;
    while ((position = format_string.indexOf('%')) !== -1) {
        switch (format_string[position+1]) {
            case 's':
                format_string = format_string.replace('%s', arguments[index++]);
                break;
            case 'd':
                format_string = format_string.replace('%d', i18n.formatNumber(arguments[index++], 2));
                break;
            case 'i':
                format_string = format_string.replace('%i', i18n.formatNumber(arguments[index++], 0));
                break;
        }
    }
    return format_string;

};

i18n.formatNumber = function (n, decimalPlaces) {
    var decimal_delim = languages[i18n.lang]['decimal_delim']
    var number_group_delim = languages[i18n.lang]['number_group_delim']
    var number_group_size = languages[i18n.lang]['number_group_size']
    var decimals = decimalPlaces > 0 ? decimal_delim + String(Math.floor(n * Math.pow(10, decimalPlaces)) % Math.pow(10, decimalPlaces)) : '';
    var wholeNums = String(Math.floor(n));
    var wholeNumsWithDelim = '';

    while (wholeNums.length > number_group_size) {
        wholeNumsWithDelim = number_group_delim + wholeNums.slice(-number_group_size) + wholeNumsWithDelim;
        wholeNums = wholeNums.slice(0, -number_group_size);
    }
    wholeNumsWithDelim = wholeNums + wholeNumsWithDelim;

    return wholeNumsWithDelim + decimals;
};

module.exports = i18n;
