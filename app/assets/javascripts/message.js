$(function() {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="messageItem">
                    <ul class="messageItem__post">
                      <li class="messageItem__post--contributor">
                        ${message.user_name}
                      </li>
                      <li class="messageItem__post--date">
                        ${message.created_at}
                      </li>
                    </ul>
                    <div class="messageItem__text">
                      <div class="messageItem__text--content">
                        ${message.content}
                      </div>
                      <img class="messageItem__text--image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="messageItem">
                    <ul class="messageItem__post">
                      <li class="messageItem__post--contributor">
                      ${message.user_name}
                      </li>
                      <li class="messageItem__post--date">
                      ${message.created_at}
                      </li>
                    </ul>
                    <div class="messageItem__text">
                      <div class="messageItem__text--content">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
      return html;
    };
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $(".mainChat__messageList").append(html);
      $(".mainChat__messageList").animate({ scrollTop: $(".mainChat__messageList")[0].scrollHeight });
      $("#new_message")[0].reset();
      $(".sendBtn").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".sendBtn").prop("disabled", false);
    });
  })
});