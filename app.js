/*
 * Script:      Skype Live Chat
 * Version:     1.0.1
 * Author:      Surjith S M
 * Author URI:  https://surjithctly.in/
 * Copyright:   © Cloudflare App
 */

(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var container

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    var username = INSTALL_ID === 'preview' && !options.receiver.username ? 'echo123' : options.receiver.username
    var buttonColor = options.colors.button || '#00aff0'
    var messageColor = options.colors.message || '#f1f1f4'

    container = INSTALL.createElement({ method: 'append', selector: 'body' }, container)
    container.setAttribute('app', 'skype-chat')

    var button = document.createElement('div')
    button.className = 'skype-button bubble'

    if (options.receiver.type === 'user') {
      button.setAttribute('data-contact-id', username)
    } else if (options.receiver.type === 'bot') {
      button.setAttribute('data-bot-id', options.receiver.botname)
    }

    button.setAttribute('data-color', buttonColor)

    var chatContainer = document.createElement('div')

    chatContainer.setAttribute('data-color-message', messageColor)

    container.appendChild(button)
    container.appendChild(chatContainer)
  }

  function bootstrap () {
    var vendorScript = document.createElement('script')
    vendorScript.src = 'https://swc.cdn.skype.com/sdk/v1/sdk.min.js'
    vendorScript.addEventListener('load', updateElement)

    document.head.appendChild(vendorScript)
  }

    // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    bootstrap()
  }

    // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      updateElement()
      window.SkypeWebControl.SDK.Buttons.refresh()
      window.SkypeWebControl.SDK.Chat.hideChat()
    }
  }
}())
