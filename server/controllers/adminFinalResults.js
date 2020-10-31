const Excel = require('exceljs');

const Wine = require('../models/wine');
const Result = require('../models/result');
const Group = require('../models/degGroup');
const Degustator = require('../models/degustator');
const CompetitiveCategory = require('../models/competitiveCategory');

exports.getFinalResultsByCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const populateQuery = {
        path: 'group',
        model: 'Group',
        select: '_id groupName'
    }
    try {
        const wines = await Wine.find({competitiveCategoryId: categoryId}).sort({'finalResult': -1}).lean().populate(populateQuery);
        if (!wines) {
            const error = new Error('Nemôžem načítať výsledky pre túto kategóriu');
            error.statusCode = 404;
            return next(error);
        }
        const sortedWines = wines.map((wine, index) => {
            return {...wine, place: index + 1}
        })
        res.status(200).json({
            message: 'Zoznam vín načítaný',
            results: sortedWines
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getFinalResultsByWineId = async (req, res, next) => {
    const wineId = req.params.wineId
    const populateQuery = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }
    try {
        const results = await Result.find({wineDbId: wineId}).populate(populateQuery)
        if (!results) {
            const error = new Error('Nemôžem načítať výsledky pre dané číslo vína');
            error.statusCode = 404;
            return next(error);
        }

        const wineInfo = await Wine.findById(wineId);
        if (!wineInfo) {
            const error = new Error('Nemôžem načítať výsledky pre dané číslo vína');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: "Výsledky načítané",
            results: results,
            wineInfo: wineInfo
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.getFinalResultsByGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const results = await Result.find({groupId: groupId}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky boli načítané',
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getFinalResultsByDeg = async (req, res, next) => {
    const degId = req.params.degId;
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const results = await Result.find({degId: degId}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            message: 'Výsledky pre tohto degustátora boli načítané',
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getWineCompetitionCategory = async (req, res, next) => {

    try {
        const competitiveCategory = await CompetitiveCategory.find({});
        if (!competitiveCategory) {
            const error = new Error('Nemôžem načítať sútažné skupiny');
            error.statusCode = 404;
            return next(error);
        }
        const results = await Wine.find({competitiveCategoryId: competitiveCategory[0]._id}).sort({"finalResult": -1}).lean().populate('group');
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        const sortedWines = results.map((wine, index) => {
            return {...wine, place: index + 1}
        })
        res.status(200).json({
            message: 'Dáta načítané',
            competitiveCategory: competitiveCategory,
            results: sortedWines
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getDegGroups = async (req, res, next) => {
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const groups = await Group.find({}, '_id groupName results');
        if (!groups) {
            const error = new Error('Nemôžem načítať skupiny')
            error.statusCode = 404;
            return next(error)
        }
        const results = await Result.find({groupId: groups[0]._id}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Dáta načítané',
            groups: groups,
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getListOfDegustators = async (req, res, next) => {
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const degustators = await Degustator.find({}, '_id id name surname group');
        if (!degustators) {
            const error = new Error('Nemôžem načítať degustátorov')
            error.statusCode = 404;
            return next(error)
        }
        const results = await Result.find({degId: degustators[0]._id}).populate(populateQueryDeg).populate(populateQueryWine);
        if (!results) {
            const error = new Error("Nemôžem načítať výsledky");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            message: 'Degustátory načítaný',
            degustators: degustators,
            results: results
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.exportResults = async (req, res, next) => {
    res.writeHead(200, {
        'Content-Disposition': 'attachment; filename="results_by_cat.xlsx"',
        'Transfer-Encoding': 'chunked',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const streamOption = {
        stream: res,
        useStyles: true,
        useSharedString: false
    }
    const workbook = new Excel.stream.xlsx.WorkbookWriter(streamOption);
    const populateQueryCat = {
        path: 'group',
        model: 'Group',
        select: '_id groupName'
    };
    const populateQueryDeg = {
        path: 'degId',
        model: 'Degustator',
        select: '_id id name surname',
    }    
    const populateQueryWine = {
        path: 'wineDbId',
        model: 'Wine',
        select: 'id name clasification color character _id vintage producer'
    }
    try {
        const categories = await CompetitiveCategory.find({});
        const groups = await Group.find({}, '_id groupName');
        if (!categories || !groups) {
            const error = new Error('Nemôžem exportovať dáta');
            error.statusCode = 500;
            return next(error);
        }
        for await (let cat of categories) {
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
            
            for (let column of worksheet.columns ) {
                column.width = column.header.length < 20 ? 20 : column.header.length
            }
            worksheet.getRow(1).font = {bold: true}
            const results = await Wine.find({competitiveCategoryId: cat._id}).sort({'finalResult': -1}).lean().populate(populateQueryCat);
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
            for (let result of dataToExport) {
                worksheet.addRow({
                    ...result
                }).commit()
            }
            worksheet.commit()
        } 
        for await (let group of groups) {
            let worksheet = workbook.addWorksheet(`Degustacna_skupina_${group.groupName}`);
            worksheet.columns = [
                {header: 'Číslo Vína', key: 'id'},
                {header: 'Názov', key: 'name'},
                {header: 'Farba', key: 'color'},
                {header: 'Klasifikácia', key: 'clasification'},
                {header: 'Charakter', key: 'character'},
                {header: 'Ročník', key: 'vintage'},
                {header: 'Číslo degustátora', key: 'degNumber'},
                {header: 'Meno degustátora', key: 'degName'},
                {header: 'Eliminované', key: 'eliminated'},
                {header: 'Bodové hodnotenie', key: 'finalResult'},
                {header: 'Kategoria vina', key: 'wineCategory'},
            ];
            for (let column of worksheet.columns ) {
                column.width = column.header.length < 20 ? 20 : column.header.length
            }
            worksheet.getRow(1).font = {bold: true};
            const results = await Result.find({groupId: group._id}).populate(populateQueryDeg).populate(populateQueryWine);
            if (!results) {
                const error = new Error("Nemôžem načítať výsledky");
                error.statusCode = 404;
                return next(error);
            }
            const dataToExport = results.map(result => {
                return {
                    id: result.wineId,
                    name: result.wineDbId.name,
                    color: result.wineDbId.color,
                    clasification: result.wineDbId.clasification,
                    character: result.wineDbId.character,
                    vintage: result.wineDbId.vintage,
                    degNumber: result.degId.id,
                    degName: `${result.degId.name} ${result.degId.surname}`,
                    eliminated: result.eliminated ? 'Ano': 'Nie',
                    finalResult: result.totalSum,
                    wineCategory: result.wineCategory
                }
            })
            for (let result of dataToExport) {
                worksheet.addRow({
                    ...result
                }).commit()
            }
            worksheet.commit();
        }
        workbook.commit();
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};
