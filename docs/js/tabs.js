const findBlockByAlias = (alias) => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-review") === alias;
    });
};

$(".avatar__link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-avatar");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".review__avatar");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("avatar--active").siblings().removeClass("avatar--active");
});