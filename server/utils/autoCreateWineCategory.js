const CompetitiveCategory = require('../models/competitiveCategory');

const autoCreateWineCategoryAsync = async (competitiveCategory) => {
    try {
        const wineCategory = await CompetitiveCategory.findOne({categoryName: competitiveCategory});
        if (!wineCategory && wineCategory === null) {
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
    }
};

const autoCreateWineCategory = (importedData) => {
    let category = [];
    importedData.forEach(wine => {
        category.push(wine.competitiveCategory)
    });
    const uniqCategory = [...new Set(category)];
    const updatedCategory = uniqCategory.map( catName => {
        return {
            categoryName: catName
        }
    })
    return updatedCategory;
}

module.exports = {
    autoCreateWineCategoryAsync,
    autoCreateWineCategory
};