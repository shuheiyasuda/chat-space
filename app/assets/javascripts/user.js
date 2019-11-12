$(document).on('turbolinks:load', function() {
  function addUser(user){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" data-user-id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <input value="${id}}" name="group[user_ids][]" type="hidden" data-user-id="group_user_ids_${id}" />
      <div class="ChatMember__remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
    // function addMember(userID) {
    //   let html = `<input value="${userID}}" name="group[user_ids][]" type="hidden" data-user-id="group_user_ids_${userID}" />`;
    //   $(`#${userID}`).append(html);
    // }
  $("#user-search-field").on("keyup", function() {

    let input = $(this).val();
    
    var userlist = []
    $(`input[name="group[user_ids][]"]`).each (function(){
      console.log(this)
      userlist.push($(this).val())
    })
    console.log(userlist)

    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input, user_ids: userlist },
      dataType: "json",
    })

      .done(function(users){
        $("#user-search-result").empty();

        if(users.length !== 0) {
          users.forEach(function(user){
            addUser(user);
          });
        } else if  (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function(){
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function(){
    const userName = $(this).data("user-name");
    const userId = $(this).data("user-id");

    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    // addMember(userId);
  })
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});