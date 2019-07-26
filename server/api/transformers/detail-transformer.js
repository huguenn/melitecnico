const transform = function(response) {
    const detail = response[0].data;
    const description = response[1].data;
    const picture =
        detail.pictures[0] && detail.pictures[0].url
            ? detail.pictures[0].url
            : detail.thumbnail;
    let amount = parseInt((detail.price + "").split(".")[0]);
    let decimals = parseInt((detail.price + "").split(".")[1]) || 00;
    return {
        author: {
            name: "Brian",
            lastname: "Wider"
        },
        item: {
            id: detail.id,
            title: detail.title,
            price: {
                currency: detail.currency_id,
                amount,
                decimals
            },
            picture,
            condition: detail.condition,
            free_shipping: detail.shipping.free_shipping,
            sold_quantity: detail.sold_quantity,
            description: description.plain_text
        }
    };
};

module.exports = {
    transform
};
