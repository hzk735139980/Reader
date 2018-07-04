function changeBackground(color) {
    $("body").css("background-color", color);
};
changeBackground(localStorage.getItem("style_bg_color"));

$(document).ready(function(){
    $(".setting_style_bg_color[setting_style_bg_color]").click(function(){
        changeBackground($(this).attr("setting_style_bg_color"));
        localStorage.setItem("style_bg_color", $(this).attr("setting_style_bg_color"));
    });
});