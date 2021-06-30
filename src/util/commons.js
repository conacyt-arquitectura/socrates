const { config } = require('@config');
const { i18n } = require('@util/lang');

/**
 * getRandomInt function, it is a utility method
 */

function resolveDescProp(lang) {
    return resolveProp('desc', lang);
}

function resolveProp(prop, lang) {
    if (lang) {
        if (lang === 'es') {
            return prop;
        } else {
            return prop + 'En';
        }
    }
    return prop;
}

exports.resolveProp = resolveProp;
exports.resolveDescProp = resolveDescProp;

exports.getRandomInt = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.resolveCodigo = function (rawCode, lang) {
    if (!rawCode) {
        return rawCode;
    }
    const matchCode = rawCode.match(/(\d+.*)/)
    if (matchCode) {
        return 'CFDI' + matchCode[0]
    } else {
        return rawCode;
    }
}

exports.resolveOptions = function (page, lang) {
    let options = [];
    let descLang = resolveDescProp(lang);
    page.forEach(element => {
        options.push({ title: element[descLang], payload: element.clave })
    });
    options.push({ title: '<b><i>' + i18n('general.ver-mas', lang) + '</i></b>', payload: config.bot.app.nextlabel })
    return options;
}


exports.resolvePageNumber = function (page) {
    if ((typeof page === 'undefined')) {
        return 0;
    } else {
        return page + 1;
    }
}

exports.resolveGreeting = function (lang) {
    let currentDate = new Date();
    let hrs = currentDate.getHours();

    if (hrs < 12 && hrs >= 6) {
        return i18n('welcome.morning', lang);
    }
    else if (hrs >= 12 && hrs <= 17) {
        return i18n('welcome.afternoon', lang);
    }
    else {
        return i18n('welcome.night', lang);
    }

}

exports.normalize = function (word) {
    if (word) {
        return word.replace(/(\r\n|\n|\r)/gm, "<br>");
    } else {
        return '';
    }
}


exports.resolveIntent = function (flows, message) {
    if (flows) {
        for (let i = 0; i < flows.length; i++) {
            const flow = flows[i];
            for (let j = 0; j < flow.hears.length; j++) {
                const hear = flow.hears[j];
                founted = message.match(new RegExp(hear, 'gi'));
                if (founted) {
                    return flow.clave;
                }
            }
        }

    } else { return undefined }
}

