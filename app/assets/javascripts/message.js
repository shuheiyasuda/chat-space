$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    let image = message.image ? `<img src= "${message.image} " class="lower-message__image" >` : '';
    let html = `<div class= "message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.text}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }
  $(".new_message").on("submit", function(e){
    e.preventDefault();
    let url = $(this).attr("action")
    let formData = new FormData(this);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
    .done(function(message) {
      let html = buildHTML(message);
      $(".messages").append(html)
      $(".send").prop("disabled", false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight});
      $(".new_message")[0].reset();

    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $(".message").last().data("id");
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
})