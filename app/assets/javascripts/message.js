$(function(){
  function buildHTML(message){
    if ( message.content && message.image ) {
      var html = 
      `<div class="main__messages--messenger" data-message-id=${message.id}>
         <div class="name">
           ${message.user_name}
         </div>
         <div class="date">
           ${message.created_at}
         </div>
       </div>
       <div class="text">
         <p class="text__content">
            ${message.content}
         </p>
         <img src=${message.image}>
       </div>`
    } else if (message.content){
      var html = 
      `<div class="main__messages--messenger" data-message-id=${message.id}>
         <div class="name">
           ${message.user_name}
         </div>
         <div class="date">
           ${message.created_at}
         </div>
       </div>
       <div class="text">
         <p class="text__content">
           ${message.content}
         </p>
       </div>`
    } else if (message.image){
      var html = 
      `<div class="main__messages--messenger" data-message-id=${message.id}>
         <div class="name">
           ${message.user_name}
         </div>
         <div class="date">
           ${message.created_at}
         </div>
       </div>
       <div class="text">
         <img src=${message.image}>
       </div>`
    };
    return html;
  };


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('form')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('input').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
      $('input').prop('disabled', false);
    });
  });


  var reloadMessages = function() {
    var last_message_id = $('.main__messages--messenger:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main__messages').append(insertHTML);
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight})}
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000)
  }
});