const menuBlock = $(".popup-menu");
const activeClass = "active";
const hamburger = $("#hamburger");

const showMenuBlock = () => {
  menuBlock.addClass(activeClass);
  hamburger.addClass(activeClass);
};

const hideMenuBlock = () => {
  menuBlock.removeClass(activeClass);
  hamburger.removeClass(activeClass);
};

const preventDefault = e => e.preventDefault();

const disableScroll = () => {
  document.addEventListener("wheel", preventDefault, { passive: false });
};

const enableScroll = () => {
  document.removeEventListener("wheel", preventDefault, { passive: false });
};

$("#hamburger").click(e => {
  e.preventDefault();
  showMenuBlock();
  disableScroll();
});

$(".popup-menu__close").click(e => {
  e.preventDefault();
  hideMenuBlock();
  enableScroll();
});