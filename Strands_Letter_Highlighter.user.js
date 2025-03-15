// ==UserScript==
// @name Strands Letter Highlighter
// @namespace Laurvin
// @author Laurvin
// @description Highlights all instances of a letter in the grid of a Strands game.
// @version 1.0
// @icon http://i.imgur.com/XYzKXzK.png
// @downloadURL https://github.com/Laurvin/Strands-Letter-Highlighter/raw/refs/heads/main/Strands_Letter_Highlighter.user.js
// @updateURL https://github.com/Laurvin/Strands-Letter-Highlighter/raw/refs/heads/main/Strands_Letter_Highlighter.user.js
// @match https://www.nytimes.com/games/strands*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at document-idle
// ==/UserScript==

/* globals jQuery, $ */
this.$ = this.jQuery = jQuery.noConflict(true);

(function() {
    'use strict';

    function appendInteractiveAlphabet() {
        const attachtTo = $('#portal-game-toolbar');
        if (attachtTo.length) {
            let alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
            let alphabetSpans = alphabet.split(' ').map(letter => `<span>${letter}</span>`).join(' '); // Wrap each letter in a span
            attachtTo.prepend('<div id="interactive-alphabet">' + alphabetSpans + '</div>');

            $('#interactive-alphabet').css({
                'align-self': 'center',
                'order': '5'
            }).addClass("pz-module pz-flex-row pz-game-toolbar-content");

            $('#interactive-alphabet span').css({ // Corrected selector
                'cursor': 'pointer',
                'display': 'inline-block',
                'margin-right': '5px',
                'font-size': '22px'
            });

            let currentLetter = null;

            $('#interactive-alphabet span').click(function() { // Corrected selector
                const clickedLetter = $(this).text();
                console.log('Letter clicked: ' + clickedLetter);

                if (currentLetter === clickedLetter) {
                    $('button:contains("' + clickedLetter + '")').filter(function() {
                        return $(this).text() === clickedLetter;
                    }).css('color', '');
                    currentLetter = null;
                    return;
                }

                if (currentLetter) {
                    $('button:contains("' + currentLetter + '")').filter(function() {
                        return $(this).text() === currentLetter;
                    }).css('color', '');
                }

                $('button:contains("' + clickedLetter + '")').filter(function() {
                    return $(this).text() === clickedLetter;
                }).css('color', 'red');

                currentLetter = clickedLetter;
            });
        }
    }

    setTimeout(function() {
        $(document).ready(appendInteractiveAlphabet);
    }, 5000); // 4000 milliseconds = 4 seconds

})();
