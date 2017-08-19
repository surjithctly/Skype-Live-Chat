/*
 * Script:      Skype Live Chat
 * Version:     1.0.1
 * Author:      Surjith S M
 * Author URI:  https://surjithctly.in/
 * Copyright:   © Cloudflare App
 */

(function() {
    'use strict'

    if (!window.addEventListener) return // Check for IE9+

    var options = INSTALL_OPTIONS
    var element, receiver, buttoncolor, messagecolor
    var username = INSTALL_ID === 'preview' && !options.receiver.username ? 'echo123' : options.receiver.username

    // updateElement runs every time the options are updated.
    // Most of your code will end up inside this function.
    function updateElement() {

        element = INSTALL.createElement({ method: "append", selector: "body" }, element);

        if (options.receiver.type == 'user') {
            receiver = ' data-contact-id="' + username + '"';

        } else if (options.receiver.type == 'bot') {
            receiver = ' data-bot-id="' + options.receiver.botname + '"';
        }

        if (options.buttoncolor) {
            buttoncolor = ' data-color="' + options.buttoncolor + '"';
        }

        if (options.messagecolor) {
            messagecolor = ' data-color-message="' + options.messagecolor + '"';
        }



        // Set the app attribute to your app's dash-delimited alias.
        element.setAttribute('app', 'skype-chat');
        var script = document.createElement('script');
        script.src = "//swc.cdn.skype.com/sdk/v1/sdk.min.js";
        element.appendChild(script);

        element.innerHTML = '<span class="skype-button bubble" ' + receiver + buttoncolor + '></span>' +
            '<span class="skype-chat" ' + messagecolor + '></span>';



    }

    // This code ensures that the app doesn't run before the page is loaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateElement)
    } else {
        updateElement()
    }

    // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
    window.INSTALL_SCOPE = {
        setOptions: function setOptions(nextOptions) {
            options = nextOptions

            updateElement()
        }
    }
}())