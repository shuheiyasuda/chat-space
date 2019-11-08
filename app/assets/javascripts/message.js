$(function(){
  function buildHTML(message){
    let html = `<div class= "message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.text}
                    </p>
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
});