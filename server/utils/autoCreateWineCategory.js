const WineCategory = require('../models/wineCategory');

const autoCreateWineCategory = async competitiveCategory => {
    try {
        const wineCategory = await WineCategory.findOne({categoryName: competitiveCategory});
        if (!wineCategory) {
            const category = new WineCategory({
                categoryName: competitiveCategory
            })
            await category.save()
        }
        return;
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = autoCreateWineCategory;