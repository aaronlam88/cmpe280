$(function() {
    $( "#dragMe li" ).draggable({
        helper: 'clone',
        revert: 'invalid'
    });
    $( "#target" ).droppable({
        accept: 'li[data-value="country"]',
        drop: function (event, ui) {
          $('#target').append(ui.draggable);
      }
    });
    //$("#target").bind("drop", highlightTarget);
    $("#target").bind("dropout", resetTarget);
  });

// function highlightTarget(event, ui){
//     $("#target").addClass("ui-state-highlight")
//                 .html("You got me")
//                 //.append(ui.draggable.text());
// } 
  

function resetTarget(event, ui){
    $("#target").removeClass("ui-state-highlight")
                .html("Drop on me");
}
