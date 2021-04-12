const hamburger = document.querySelector("#hamburger");
const close = document.querySelector("#close");
const element = document.querySelector(".popup-menu");
const body = $('body');

hamburger.addEventListener("click", function () {
  element.style.display = "flex";
  body.addClass("hidden");

});
close.addEventListener("click", function () {
  element.style.display = "none";
  body.removeClass("hidden");
});