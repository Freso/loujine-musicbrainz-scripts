'use strict';
// ==UserScript==
// @name         MusicBrainz: Show alias count
// @namespace    mbz-loujine
// @author       loujine
// @version      2015.11.15
// @downloadURL  https://bitbucket.org/loujine/musicbrainz-scripts/raw/default/mbz-showcountalias.user.js
// @updateURL    https://bitbucket.org/loujine/musicbrainz-scripts/raw/default/mbz-showcountalias.user.js
// @supportURL   https://bitbucket.org/loujine/musicbrainz-scripts
// @icon         https://bitbucket.org/loujine/musicbrainz-scripts/raw/default/icon.png
// @description  musicbrainz.org: Show alias number on work/artist pages
// @compatible   firefox+greasemonkey
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @require      https://greasyfork.org/scripts/13747-musicbrainz-common-files/code/MusicBrainz:%20common%20files.js?version=85994
// @include      http*://*musicbrainz.org/work/*
// @exclude      http*://*musicbrainz.org/work/add*
// @include      http*://*musicbrainz.org/artist/*
// @exclude      http*://*musicbrainz.org/artist/add*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// adapted from jesus2099  mb. INLINE STUFF

// imported from mbz-loujine-common.js: requestGET

function parseCount (resp, tab) {
    var cnt = resp.aliases.length,
        locales = [];
    if (cnt > 0) {
        tab.style.setProperty('background-color', '#6f9');
    }
    tab.textContent += ' (' + cnt + ')';
    resp.aliases.forEach(function (alias) {
        if (alias.locale) {
            locales.push(alias.locale);
        }
    });
    if (locales.length > 0) {
        tab.textContent += ' ' + locales.sort().join(',');
    }
}

function showCountAliases() {
    var tab = $("a[href$='/aliases']")[0],
        entityType = document.URL.split('/')[3],
        mbid = document.URL.split('/')[4],
        url = '/ws/2/' + entityType + '/' + encodeURIComponent(mbid) + '/?inc=aliases&fmt=json';
    requestGET(url, function (resp) {
        parseCount(JSON.parse(resp), tab);
    });
}

showCountAliases();