const CompetitiveCategory = require('../models/competitiveCategory');

const autoCreateWineCategory = async (competitiveCategory) => {
    try {
        const wineCategory = await CompetitiveCategory.findOne({categoryName: competitiveCategory});
        if (!wineCategory) {
            const category = new CompetitiveCategory({
                categoryName: competitiveCategory,
            })
            return await category.save();
        }
        return wineCategory;
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = autoCreateWineCategory;