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
                      <p>
                      ${message.content}
                      </p>
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
                      ${message.content}
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
    })
  })
});

