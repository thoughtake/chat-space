$(function() {

  function buildHTML(message) {

    if ( message.image ) {
      image = `<img src="/public/images/${message.image}" class='lower-message__image'>`;
    } else {
      image = "";
    }

    html = `<div class="main-chat__talk__content">
              <div class="main-chat__talk__content__info">
                <div class="main-chat__talk__content__info--name">${message.user_name}</div>
                <div class="main-chat__talk__content__info--time">${message.created_at}</div>
              </div>
              <div class="main-chat__talk__content__message">
                ${message.content}<br>
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
      $('form')[0].reset();
      // $('#message_content').val('');
      // $('#message_image').val('');
      // $('.main-chat__form__input--submit').prop('disabled', false);
    })
  })
});