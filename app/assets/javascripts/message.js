$(function() {
  
  function reloadMessages() {
    last_message_id = $('.main-chat__talk__content:last').data('message-id');
    $.ajax( {
      url: 'api/messages',
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function(messages) {
      if ( messages.length !== 0 ) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.main-chat__talk').append(insertHTML);
        $('.main-chat__talk').animate({ scrollTop: $('.main-chat__talk')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  }

  function buildHTML(message) {
    if ( message.image_url && message.content ) {
      image = `<br><img src="${message.image_url}" class='lower-message__image'>`;
    } else if (message.image_url) {
      image = `<img src="${message.image_url}" class='lower-message__image'>`;
    } else {
      image = "";
    }

    html = `<div class="main-chat__talk__content" data-message-id="${message.id}">
              <div class="main-chat__talk__content__info">
                <div class="main-chat__talk__content__info--name">${message.user_name}</div>
                <div class="main-chat__talk__content__info--time">${message.created_at}</div>
              </div>
              <div class="main-chat__talk__content__message">
                ${message.content}
                ${image}
              </div>
            </div>`

    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax( {
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      html = buildHTML(message);
      $('.main-chat__talk').append(html);
      $('.main-chat__talk').animate({ scrollTop: $('.main-chat__talk')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat__form__input--submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    });
  })

  if ( document.location.href.match(/\/groups\/\d+\/messages/) ) {
    setInterval(reloadMessages, 7000);
  }
});