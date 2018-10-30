// $(function(){
//     $("#resize").resizable();
//     $("div").addClass("ui-widget")
//             .addClass("ui-widget-content")
//             .addClass("ui-corner-all");
//     $(":header").addClass("ui-widget-header")
//                 .addClass("ui-corner-all");
// });

$(function(){
        $( "#resize" ).resizable({
                alsoResize: '#content',
                create: function(event, ui) {
                        initDiagonal = getContentDiagonal();
                        initFontSize = parseInt($("#content").css("font-size"));
                },
                resize: function(e, ui) {
                        var newDiagonal = getContentDiagonal();
                        var ratio = newDiagonal / initDiagonal;

                        $("#content").css("font-size", initFontSize + ratio * 3);
                }
        });
});

function getContentDiagonal() {
        var contentWidth = $("#content").width();
        var contentHeight = $("#content").height();
        return contentWidth * contentWidth + contentHeight * contentHeight;
}
