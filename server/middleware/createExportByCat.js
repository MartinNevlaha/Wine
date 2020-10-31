const Excel = require('exceljs');
const path = require('path');

const Wine = require('../models/wine');
const CompetitiveCategory = require('../models/competitiveCategory');

module.exports = async (req, res, next) => {
    const exportFile = path.join(__dirname, '../', `export/result_by_cat.xlsx`);
    const workbook = new Excel.stream.xlsx.WorkbookWriter();
    const populateQuery = {
        path: 'group',
        model: 'Group',
        select: '_id groupName'
    };
    try {
        const categories = await CompetitiveCategory.find({});
        if (!categories) {
            const error = new Error('Nemôžem exportovať dáta');
            error.statusCode = 500;
            return next(error);
        }
        await categories.forEach(async cat => {
            let worksheet = workbook.addWorksheet(`skupina_${cat.categoryName}`);
            worksheet.columns = [
                {header: 'Poradie', key: 'place'},
                {header: 'Číslo Vína', key: 'id'},
                {header: 'Názov', key: 'name'},
                {header: 'Farba', key: 'color'},
                {header: 'Klasifikácia', key: 'clasification'},
                {header: 'Charakter', key: 'character'},
                {header: 'Ročník', key: 'vintage'},
                {header: 'Degustačná skupina', key: 'degGroup'},
                {header: 'Bodové hodnotenie', key: 'finalResult'},
                {header: 'Kategoria vina', key: 'wineCategory'},
            ];
            worksheet.columns.forEach(column => {
                column.width = column.header.length < 20 ? 20 : column.header.length
            })
            worksheet.getRow(1).font = {bold: true}
            const results = await Wine.find({competitiveCategoryId: cat._id}).sort({'finalResult': -1}).lean().populate(populateQuery);
            if (!results) {
                const error = new Error('Nepodarilo sa zapisať výsledky');
                error.statusCode = 500;
                return next(error);
            }
            const dataToExport = results.map((res, index) => {
                return {
                    place: index +1,
                    id: res.id,
                    name: res.name,
                    color: res.color,
                    clasification: res.clasification,
                    character: res.character,
                    vintage: res.vintage,
                    degGroup: res.group.groupName,
                    finalResult: res.finalResult,
                    wineCategory: res.wineCategory
                }
            })
            dataToExport.forEach(result => {
                worksheet.addRow({
                    ...result
                })
            })
            worksheet.columns.forEach( (col, index) => {
                worksheet.getColumn(index + 1).alignment = {horizontal: "center"}
            })
            worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                worksheet.getCell(`A${rowNumber}`).border = {
                  top: {style: 'thin'},
                  left: {style: 'thin'},
                  bottom: {style: 'thin'},
                  right: {style: 'none'}
                }
              
                const insideColumns = ['B', 'C', 'D', 'E', 'G', 'H', 'I', 'J']
                insideColumns.forEach((v) => {
                  worksheet.getCell(`${v}${rowNumber}`).border = {
                    top: {style: 'thin'},
                    bottom: {style: 'thin'},
                    left: {style: 'thin'},
                    right: {style: 'thin'}
                  }
                })
              
                worksheet.getCell(`F${rowNumber}`).border = {
                  top: {style: 'thin'},
                  left: {style: 'thin'},
                  bottom: {style: 'thin'},
                  right: {style: 'thin'}
                }
              })
            await workbook.xlsx.writeFile(exportFile)
        }) 
        return next();
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};