$(".order-form").submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("#form-name");
    const phone = form.find("#form-phone");
    const comment = form.find("#form-comment");
    const to = form.find("#form-to");
    [name, phone, comment, to].forEach((field) => {
        field.removeClass("error");
        if (field.val().trim() === "") {
            field.addClass("error");
        }
    });
    const errorFields = form.find(".error");
    const modal = $("#message-sent");
    const content = modal.find(".modal__content");
    modal.removeClass("modal__error");
    if (errorFields.length === 0) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            success: (data) => {
                content.text(data.message);
                $.fancybox.open({
                src: "#message-sent",
                type: "inline",
                smallBtn: false,
                toolbar: false,
                });
            },

            error: (data) => {
                const message = data.responseJSON.message;
                content.text(message);
                modal.addClass("modal__error");
                $.fancybox.open({
                    src: "#message-sent",
                    type: "inline",
                    smallBtn: false,
                    toolbar: false,
                    });
            },
        });
    }
    


});

$(".app-close").click( e => {
    e.preventDefault();
    $.fancybox.close();
})