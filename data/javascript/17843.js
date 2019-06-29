define('ghost-admin/helpers/gh-format-markdown', ['exports', 'ember-helper', 'ember-string', 'ghost-admin/utils/caja-sanitizers'], function (exports, _emberHelper, _emberString, _ghostAdminUtilsCajaSanitizers) {
    exports.formatMarkdown = formatMarkdown;

    var showdown = new Showdown.converter({ extensions: ['ghostimagepreview', 'ghostgfm', 'footnotes', 'highlight'] });

    function formatMarkdown(params) {
        if (!params || !params.length) {
            return;
        }

        var markdown = params[0] || '';
        var escapedhtml = '';

        // convert markdown to HTML
        escapedhtml = showdown.makeHtml(markdown);

        // replace script and iFrame
        escapedhtml = escapedhtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '<pre class="js-embed-placeholder">Embedded JavaScript</pre>');
        escapedhtml = escapedhtml.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '<pre class="iframe-embed-placeholder">Embedded iFrame</pre>');

        // sanitize html
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        escapedhtml = html_sanitize(escapedhtml, _ghostAdminUtilsCajaSanitizers['default'].url, _ghostAdminUtilsCajaSanitizers['default'].id);
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        return (0, _emberString.htmlSafe)(escapedhtml);
    }

    exports['default'] = (0, _emberHelper.helper)(formatMarkdown);
});
/* global Showdown, html_sanitize*/