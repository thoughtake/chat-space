$(function() {

  function  addUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.user_name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.user_name}">追加</div>
              </div>
              `;
    $('#user-search-result').append(html);
    } 
    
  function addNoUser() {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>
              `;
    $('#user-search-result').append(html);
  }
    
  function addChatMember(user_id, user_name) {
      var html = `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'> 
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `
      $('#chat-group-users.js-add-user').append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    console.log(input);
    $.ajax( {
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if ( users.length !== 0 ) {
        users.forEach(function(user) {
          addUser(user);   
        });
      } else if ( input.length == 0 ) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    addChatMember(user_id, user_name);
  })

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  })

})