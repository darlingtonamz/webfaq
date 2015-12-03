var $json;
var $content = {};
 if (window.$ === undefined || typeof(window.$) !== "function") {
   console.log('Adding jQuery...');
   var script = document.createElement('script');
   script.src = "js/jquery.min.js";
   document.head.appendChild(script);
 }

 var webfaqElement = $('#webfaq-element');
 $.get('http://localhost:3000/faqs/1?token=c57f3546-2bcf-47d7-b796-753b19a652b0', function (data) {
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
          var more_comment = $('<div>', {id: 'more_comment_'+id});
          comment_icon.append('<a value="'+id+'"><img src="img/comment1x.png"></a>');
          comment_count.append('<a value="'+id+'">'+data.faq[i].comment_count+' Comment</a>');
          qbottom.append(comment_icon);
          qbottom.append(comment_count);
          qbottom.append(write_comment);
          qbottom.append(more_comment);

     qtop.append(qleft);
     qtop.append(qright);
     
     question.append(qtop);
     question.append(qbottom);
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
});

$(document).on('click', '#vcount a', function() { 
    var cId = $(this).attr('value');

    console.log(Object.keys($content));
    console.log($content[cId][0]);

    var comment = $content[cId];

    if ($('#more_comment_'+cId).is(':empty')){
      //console.log(comment.length);
      $('#more_comment_'+cId).append('<div id="comment_holder_'+cId+'">No comments...</div>');
      if (comment.length > 0) {
          $('#comment_holder_'+cId).empty();
          for (var i = 0; i < comment.length; i++) {
            $('#comment_holder_'+cId).append(comment[i].content+"<br>");
          };
      };
    } else {
      $('#more_comment_'+cId).empty();
    };
});