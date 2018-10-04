$( function() {
    $( "#sortable1, #sortable2" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  } );

  $( function() {
    $( "#sortable3, #sortable4" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  } );