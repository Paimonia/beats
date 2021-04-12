const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".products__list");
    const titlesCount = container.find(".products__link");
    const titlesWidth = titlesCount.width() * titlesCount.length;
    const textContainer = item.find(".products__text");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width:768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }

}

const closeAllProducts = container => {
    const items = container.find(".products__item");
    const content = container.find(".products__desc");
    items.removeClass("active");
    content.width(0);
}
const openProduct = item => {
    const hiddenContent = item.find(".products__desc");

    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".products__text");

    item.addClass("active");

    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}

$(".products__link").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products__list");

    if (itemOpened) {
        closeAllProducts(container);
    } else {
        closeAllProducts(container);
        openProduct(item);
    }
})