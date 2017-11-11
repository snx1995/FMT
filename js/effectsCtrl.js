$(document).ready(function () {
    $("[data-window]").each(function () {
        $(this).click(function () {
            $("#"+$(this).attr("data-window")).addClass($(this).attr("data-effect"));
        })
    })
});