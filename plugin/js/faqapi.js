var $json;
var $content = {};
 if (window.$ === undefined || typeof(window.$) !== "function") {
   console.log('Adding jQuery...');
   var script = document.createElement('script');
   script.src = "js/jquery.min.js";
   document.head.appendChild(script);
 }

 var webfaqElement = $('#webfaq-element');
 $.ajax({
  xhrFields: { withCredentials: true},
  type: 'GET',
  url: 'http://localhost:3000/faqs/1?token=c57f3546-2bcf-47d7-b796-753b19a652b0'}).done(function (data) {
    json = data.faq;
   for (var i = 0; i < data.faq.length; i++) {
      var id = data.faq[i].id;

      $content[json[i].id] = json[i].comment;
      console.log(json[i].comment);
      //alert(i);
     var question = $('<div>', { class: 'qmain distant' });
     var qtop = $('<div>', { class: 'qtop distant' });
        var qleft = $('<div>', { class: 'qleft' });
           var qhead = $('<div>', { class: 'qhead' });          
           var qanswer = $('<div>', { class: 'qanswer' });
              qhead.append(data.faq[i].content);
              qanswer.append(data.faq[i].answer);
              qleft.append(qhead);
              qleft.append(qanswer);

        var qright = $('<div>', { class: 'qright' });
           var voteup = $('<div>', { class: 'voteup' });
           var vrating = $('<div>', { class: 'vrating' });
           var votedown = $('<div>', { class: 'votedown' });
           voteup.append("<img class='voteimg' src='img/up2x.png'>");
           vrating.append(data.faq[i].votes);
           votedown.append("<img class='voteimg' src='img/down2x.png'>");
           qright.append(voteup);
           qright.append(vrating);
           qright.append(votedown);

       var qbottom = $('<div>', { class: 'qbottom row' });
          var comment_icon = $('<div>', {id: 'vicon'});
          var comment_count = $('<div>', {id: 'vcount'});
          var write_comment = $('<div>', {id: 'write_comment_'+id});
          comment_icon.append('<a value="'+id+'"><img src="img/comment1x.png"></a>');
          comment_count.append('<a value="'+id+'">'+data.faq[i].comment_count+' Comment</a>');
          qbottom.append(comment_icon);
          qbottom.append(comment_count);
          qbottom.append(write_comment);

      var more_comment = $('<div>', {id: 'more_comment_'+id});
     qtop.append(qleft);
     qtop.append(qright);
     
     question.append(qtop);
     question.append(qbottom);
    question.append(more_comment);
     webfaqElement.append(question);
   }
 });

loadCSS = function(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
    $("head").append(cssLink); 
}; 
 
// load the css file 
loadCSS("css/style.css");

$(document).on('click', '#vicon a', function() { 
    var cId = $(this).attr('value');
    $(this).hide();
    $('#write_comment_'+cId).append('<textarea type="text"></textarea>'+
    '<button class="floating_button btt"><img src="img/send1x.png"/></button>');

    var commentBoxId = '#write_comment_' + cId;
    var commentButtonInCommentBox = commentBoxId + ' .floating_button'
    $(commentButtonInCommentBox).on('click', function(e) {
      var comment = $(e.target).prev().val();
      console.log(comment);

      //TODO: Send HTTP POST to your API via AJAX.
      
        $.post("http://localhost:3000/comments",
        {
          comment:{
            content: comment
          }
          ,question_id: cId, user_id: 1
        },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});

$(document).on('click', '#vcount a', function() { 
    var cId = $(this).attr('value');

    console.log(Object.keys($content));
    console.log($content[cId][0]);

    var comment = $content[cId];
    //toggleSize('#more_comment_'+cId);
    if ($('#more_comment_'+cId).is(':empty')){
      //console.log(comment.length);
      $('#more_comment_'+cId).append('<div id="comment_holder_'+cId+'" class="cholder">No comments...</div>');
      if (comment.length > 0) {
          $('#comment_holder_'+cId).empty();
          for (var i = 0; i < comment.length; i++) {
            var new_comment = '<div class="row xcomment">'+
                '<div class="col-sm-1 col-xs-2 xcomment_in">'+
                  '<img src="img/avatar.png"/>'+
                '</div>'+
                '<div class="col-sm-11 col-xs-10 xcomment_in">'+
                  '<div class="comment_name">'+comment[i].content+'</div>'+
                  '<div>'+comment[i].content+'</div>'+
                '</div>'+
              '</div>';

            $(new_comment).appendTo('#comment_holder_'+cId);
          };
      };
    } else {      
        $('#more_comment_'+cId).empty();
    };
});





/*POST /questions/1/comments
Cookie: COOKIE_VALUE

def create
  user = User.find_by(id: cookies[:user_id])
  if user
    Logged in so allow them to make the comment.
  Comment.create
  201 Created
  Comment
  else
    head :unauthorized
    User is not logged in
  end
end
*/






