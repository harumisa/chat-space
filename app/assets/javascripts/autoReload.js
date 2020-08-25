$(function() {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="messageItem" data-message-id=${message.id}>
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
      let html = `<div class="messageItem" data-message-id=${message.id}>
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

  function reloadMessages() {
    let last_message_id = $(".messageItem:last").data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = "";
        messages.forEach(function(message) {
          insertHTML += buildHTML(message);
        });
        $(".mainChat__messageList").append(insertHTML);
        $(".mainChat__messageList").animate({ scrollTop: $(".mainChat__messageList")[0].scrollHeight });
      } 
    })
    .fail(function() {
      alert("error");
    });
  };
  setInterval(reloadMessages, 7000);
});