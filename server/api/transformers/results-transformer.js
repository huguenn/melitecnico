const MAX_RESULTS = 4;

const transformResult = function(result) {
    let amount = parseInt((result.price + "").split(".")[0]);
    let decimals = parseInt((result.price + "").split(".")[1]) || 00;
    return {
        id: result.id,
        title: result.title,
        state_name: result.address.state_name,
        price: {
            currency: result.currency_id,
            amount,
            decimals
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping
    };
};

const transform = function(data) {
    let categories = [];
    let items = data.results.slice(0, MAX_RESULTS);

    /**
     *  Note (Line 30): Not sure about this, i'm not sure where the cartegories should be taken from, if it's
     *  not getting them from the selected ones, cause the values won't match with the ones that are
     *  on "categories" on the "filters" section
     */
    items = items.map(function(item) {
        categories.push(item.category_id);
        return transformResult(item);
    });

    if (data.filters) {
        const categoriesFilter = data.filters.find(function(filter) {
            return filter.id === "category";
        });
        if (categoriesFilter) {
            categories = [];
            categoriesFilter.values[0].path_from_root.map(function(category) {
                categories.push(category.name);
            });
        }
    }

    return {
        author: {
            name: "Brian",
            lastname: "Wider"
        },
        categories,
        items
    };
};

module.exports = {
    transformResult,
    transform
};
