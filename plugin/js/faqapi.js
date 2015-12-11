var faq_id = 1;
var $json;
var $content = {};
 if (window.$ === undefined || typeof(window.$) !== "function") {
   console.log('Adding jQuery...');
   var script = document.createElement('script');
   script.src = "js/jquery.min.js";
   document.head.appendChild(script);
 }

var webfaqElement = $('#webfaq-element');

var signUp = $('<div>', { class: 'qmain distant', id: 'signUp' });
var field1 = $('<div>', { class: 'field' });  
  field1.append('<label>Name</label><br />');
  field1.append('<input type="text"></input>');

var field2 = $('<div>', { class: 'field' }); 
  field2.append('<label>Email</label><br />');
  field2.append('<input type="text"></input>');

var field3 = $('<div>', { class: 'field cUp' });
  field3.append('<label>Website</label><br />');
  field3.append('<input type="text"></input>');

var field4 = $('<div>', { class: 'field' });
  field4.append('<label>Password</label>');
  field4.append('<em>(8 characters minimum)</em><br />');
  field4.append('<input autocomplete="off" id="user_password" type="password"></input>');

var field5 = $('<div>', { class: 'field cUp' });
  field5.append('<label>Password confirmation</label><br />');
  field5.append('<input autocomplete="off" id="user_password_confirmation" type="password"></input>');

var field6 = $('<div>', { class: 'waves-effect waves-light btn' });
  field6.append('<input id="signUpBut" value="Sign up" type="submit"></input><br>');
  field6.append('<a id="btToggle" type="submit">Sign in</a>');

signUp.append(field1);
signUp.append(field2);
signUp.append(field3);
signUp.append(field4);
signUp.append(field5);
signUp.append(field6);

//webfaqElement.append(signUp);


var signIn = $('<div>', { class: 'qmain distant', id: 'signIn' });
var field_1 = $('<div>', { class: 'field' });  
  field_1.append('<label>Name</label><br />');
  field_1.append('<input type="text"></input>');

var field_2 = $('<div>', { class: 'field' }); 
  field_2.append('<label>Password</label>');
  field_2.append('<em>(8 characters minimum)</em><br />');
  field_2.append('<input autocomplete="off" id="user_password" type="password"></input>');

var field_3 = $('<div>', { class: 'waves-effect waves-light btn' });
  field_3.append('<input id="signInBut" value="Sign in" type="submit"></input><br>');
  field_3.append('<a id="btToggle" type="submit">Sign up</a>');

signIn.append(field_1);
signIn.append(field_2);
signIn.append(field_3);
var login_holder = $('<div>', {id: 'login_holder' });
login_holder.append(signIn);
login_holder.append(signUp);
//signIn.hide();
signUp.hide();
webfaqElement.append(login_holder);

$(document).on('click','#btToggle', function(){
    $( "#signIn" ).toggle( "slow", function() {
      console.log('dfhjdfhjdf');
          $( "#signUp" ).toggle( "slow", function() {});
    })
});

$(document).on('click', '#signInBut', function(){
  $.ajax({
    url: "http://localhost:3000/",
          xhrFields: { withCredentials: true },
          type: 'GET',
          data: {comment: { email: '', password: '' }}
  }).done(
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    }
  );
}); 

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
       newQuestion(id, data.faq[i]);
   }
});

function newQuestion(id, q){
  console.log(q+'\n'+q.content);

  var question = $('<div>', { class: 'qmain distant' });
       var qtop = $('<div>', { class: 'qtop distant' });
          var qleft = $('<div>', { class: 'qleft' });
             var qhead = $('<div>', { class: 'qhead' });          
             var qanswer = $('<div>', { class: 'qanswer' });
                qhead.append(q.content);
                qanswer.append(q.answer);
                qleft.append(qhead);
                qleft.append(qanswer);

          var qright = $('<div>', { class: 'qright' });
             var voteup = $('<div>', { class: 'voteup' });
             var vrating = $('<div>', { class: 'vrating' });
             var votedown = $('<div>', { class: 'votedown' });
             voteup.append("<img class='voteimg' value='"+id+"' src='img/up2x.png'>");
             vrating.append(q.votes);
             votedown.append("<img class='voteimg' value='"+id+"' src='img/down2x.png'>");
             qright.append(voteup);
             qright.append(vrating);
             qright.append(votedown);

         var qbottom = $('<div>', { class: 'qbottom row' });
            var comment_icon = $('<div>', {id: 'vicon'});
            var comment_count = $('<div>', {id: 'vcount'});
            var write_comment = $('<div>', {id: 'write_comment_'+id});
            write_comment.hide();
              write_comment.append('<textarea type="text"></textarea>'+
    '<button class="floating_button btt"><img src="img/send1x.png"/></button>');
            comment_icon.append('<a value="'+id+'"><img id="comment_img_'+id+'" src="img/comment1x.png"></a>');
            comment_count.append('<a id="comment_count_'+id+'" value="'+id+'">'+q.comment_count+' Comment'+plural(q.comment_count)+'</a>');
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

function plural(n){
  return (n > 1) ? 's' : '';
};

loadCSS = function(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
    $("head").append(cssLink); 
}; 
 
// load the css file 
loadCSS("css/style.css");

$(document).on('click', '#vicon a', function() { 
    var cId = $(this).attr('value');
    $('#comment_img_'+cId).toggle( "slow", function() {
      $('#write_comment_'+cId).toggle( "slow", function() {});
    });

    var commentBoxId = '#write_comment_' + cId;
    var commentButtonInCommentBox = commentBoxId + ' .floating_button'
    $(commentButtonInCommentBox).on('click', function(e) {
      var comment = $(e.target).prev().val();
      console.log(comment);

      //TODO: Send HTTP POST to your API via AJAX.
        $.ajax({
          url: "http://localhost:3000/comments",
          xhrFields: { withCredentials: true },
          type: 'POST',
          data: {comment: { content: comment, question_id: cId }}
        }).done(
          function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);
            var myObject = new Object();
            myObject.content = data.content;
            myObject.created_at = data.created_at;
            //var myString = JSON.stringify(myObject);
            $content[cId].push(myObject);
            $('#comment_count_'+cId).empty();
            $('#comment_count_'+cId).append($content[cId].length+' Comment'+plural($content[cId].length));
            if (!$('#more_comment_'+cId).is(':empty')){
                newComment(myObject, cId);
            }
            $(this).show();
            $('#write_comment_'+cId).toggle( "slow", function() {
              $('#comment_img_'+cId).toggle( "slow", function() {});
            });
          }
        );
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
            newComment(comment[i], cId);
          };
      };
    } else {      
        $('#more_comment_'+cId).empty();
    };
});

function newComment(c, cId){
  var new_comment = '<div class="row xcomment">'+
      '<div class="col-sm-1 col-xs-2 xcomment_in">'+
        '<img src="img/avatar.png"/>'+
      '</div>'+
      '<div class="col-sm-11 col-xs-10 xcomment_in">'+
        '<div class="comment_name">'+c.content+'</div>'+
        '<div>'+c.content+'</div>'+
      '</div>'+
    '</div>';

  $(new_comment).appendTo('#comment_holder_'+cId);
};

$(document).on('click', '.voteup .voteimg', function() { 
  var rId = $(this).attr('value');
  alert('up: '+rId);
  $.ajax({
    url: "http://localhost:3000/users/1/faqs/"+faq_id+"/quesitons/"+rId+"/like",
          xhrFields: { withCredentials: true },
          type: 'PUT',
          data: {}
  }).done(
    function(data, status){ }
  );
}); 


$(document).on('click', '.votedown .voteimg', function() { 
  var rId = $(this).attr('value');
  $.ajax({
    url: "http://localhost:3000/faqs/"+faq_id+"/quesitons/"+rId+"/like",
          xhrFields: { withCredentials: true },
          type: 'PUT',
          data: {}
  }).done(
    function(data, status){ }
  );
});


