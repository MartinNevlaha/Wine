const Excel = require('exceljs');

const Wine = require('../models/wine');
const Result = require('../models/result');
const Group = require('../models/degGroup');
const Degustator = require('../models/degustator');
const CompetitiveCategory = require('../models/competitiveCategory');
const Settings = require('../models/settings');

const generatePdf = require('../utils/generatePdf');

exports.getFinalResultsByCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const populateQuery = {
        path: 'group',
        model: 'Group',
        select: '_id groupName'
    }
    try {
        const competitiveCat = await CompetitiveCategory.findById(categoryId);
        if (!competitiveCat) {
            const error = new Error('Nemôžem načítať kompletnosť hodnotenia')
            error.statusCode = 404;
            return next(error);
        }
        const wines = await Wine.find({competitiveCategoryId: categoryId}).sort({'finalResult': -1}).lean().populate(populateQuery);
        if (!wines) {
            const error = new Error('Nemôžem načítať výsledky pre túto kategóriu');
            error.statusCode = 404;
            return next(error);
        }
        let sortedWines = wines;
        if (competitiveCat.isFinalResultWrite === false) {
            sortedWines = wines.map((wine, index) => {
                return {...wine, place: index + 1}
            })
        }
        res.status(200).json({
            message: 'Zoznam vín načítaný',
            results: sortedWines,
            isFinalResultWrite: competitiveCat.isFinalResultWrite
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getFinalResultsByWineId = async (req, res, next) => {
    const wineId = req.params.wineId;
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
        let sortedWines = results;
        if (!competitiveCategory[0].isFinalResultWrite) {
            sortedWines = results.map((wine, index) => {
                return {...wine, place: index + 1}
            })
        }
        res.status(200).json({
            message: 'Dáta načítané',
            competitiveCategory: competitiveCategory,
            results: sortedWines,
            isFinalResultWrite: competitiveCategory[0].isFinalResultWrite
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
        select: 'id name clasification color character _id vintage producer competitiveCategory'
    }
    try {
        const categories = await CompetitiveCategory.find({});
        const groups = await Group.find({}, '_id groupName');
        const completeResults = await Result.find({}).populate('wineDbId').populate('degId');
        if (!categories || !groups || !completeResults ) {
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
                    place: res.place,
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
                {header: 'Súťažná kategória', key: 'competitiveCategory'},
                {header: 'Výrobca Vína', key: 'producer'},
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
                    competitiveCategory: result.wineDbId.competitiveCategory,
                    producer: result.wineDbId.producer,
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
        let worksheet = workbook.addWorksheet('Complete_results');
        worksheet.columns = [
            {header: 'Číslo Vína', key: 'id'},
            {header: 'Názov', key: 'name'},
            {header: 'Výrobca Vína', key: 'producer'},
            {header: 'Súťažná kategória', key: 'competitiveCategory'},
            {header: 'Farba', key: 'color'},
            {header: 'Klasifikácia', key: 'clasification'},
            {header: 'Charakter', key: 'character'},
            {header: 'Ročník', key: 'vintage'},
            {header: 'Číslo degustátora', key: 'degNumber'},
            {header: 'Meno degustátora', key: 'degName'},
            {header: 'Eliminované', key: 'eliminated'},
            {header: 'Bodové hodnotenie', key: 'finalResult'},
            {header: 'Kategoria vina', key: 'wineCategory'},
            {header: 'Koment', key: 'comment'},
            {header: 'Vzhľad čírosť', key: 'lookClarity'},
            {header: 'Vzhľad mimo čírosť', key: 'lookOutOfClarity'},
            {header: 'Voňa čistota', key: 'smellPurity'},
            {header: 'Voňa pozitívna intenzita', key: 'smellPossitiveIntesity'},
            {header: 'Voňa kvalita', key: 'smellQuality'},
            {header: 'Chuť čistota', key: 'tastePurity'},
            {header: 'Chuť pozitívna intenzita', key: 'tastePossitiveIntesity'},
            {header: 'Chuť harmonická perzistencia', key: 'tasteHarmonicPersistence'},
            {header: 'Chuť kvalita', key: 'tasteQuality'},
            {header: 'Celkový dojem', key: 'generalImpresion'}
        ];
        for (let column of worksheet.columns ) {
            column.width = column.header.length < 20 ? 20 : column.header.length
        }
        worksheet.getRow(1).font = {bold: true}
        const dataToExport = completeResults.map(result => {
            return {
                id: result.wineId,
                name: result.wineDbId.name,
                producer: result.wineDbId.producer,
                competitiveCategory: result.wineDbId.competitiveCategory,
                color: result.wineDbId.color,
                clasification: result.wineDbId.clasification,
                character: result.wineDbId.character,
                vintage: result.wineDbId.vintage,
                degNumber: result.degId.id,
                degName: `${result.degId.name} ${result.degId.surname}`,
                eliminated: result.eliminated ? 'Ano': 'Nie',
                finalResult: result.totalSum,
                wineCategory: result.wineCategory,
                comment: result.comment,
                lookClarity: result.results.lookClarity,
                lookOutOfClarity: result.results.lookOutOfClarity,
                smellPurity: result.results.smellPurity,
                smellPossitiveIntesity: result.results.smellPossitiveIntesity,
                smellQuality: result.results.smellQuality,
                tastePurity: result.results.tastePurity,
                tastePossitiveIntesity: result.results.tastePossitiveIntesity,
                tasteHarmonicPersistence: result.results.tasteHarmonicPersistence,
                tasteQuality: result.results.tasteQuality,
                generalImpresion: result.results.generalImpresion
            }
        })
        for (let result of dataToExport) {
            worksheet.addRow({
                ...result
            }).commit()
        }
        worksheet.commit();
        workbook.commit();
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};

exports.generatePdf = async (req, res, next) => {
    const wineId = req.params.wineId;
    try {
        const settings = await Settings.find();
        if (!settings) {
            const error = new Error('Nemôžem načítať nastavenia')
            error.statusCode = 404;
            return next(error);
        }
        const wine = await Wine.findById(wineId);
        if (!wine) {
            const error = new Error('Nemôžem načítať údaje o víne')
            error.statusCode = 404;
            return next(error);
        }
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        const data = {
            title: settings[0].degustationName,
            place: wine.place,
            category: wine.competitiveCategory,
            producer: wine.producer,
            wine: `${wine.name}, ${wine.color} ${wine.character} ${wine.clasification}`,
            date: `${dd}.${mm}.${yyyy}`,
            chairman: settings[0].competitionChairman,
        }
        const pdf = await generatePdf(data);
        if (!pdf) {
            const error = new Error('Nemôžem vytvoriť pdf súbor');
            error.statusCode = 409;
            return next(error);
        }
        res.contentType("application/pdf");
        res.status(200).send(pdf);
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};

exports.writeFinalResults = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const wines = await Wine.find({competitiveCategoryId: categoryId}, '_id').sort({'finalResult': -1}).lean();
        if (!wines) {
            const error = new Error('Nemôžem načítať výsledky pre túto kategóriu');
            error.statusCode = 404;
            return next(error);
        }
        await wines.forEach(async (wine, index) => {
            const updateWine = await Wine.findById(wine._id)
            if (!updateWine) {
                const error = new Error('Nemôžem načitať výsledky pre túto kategóriu');
                error.statusCode = 404;
                return next(error);
            }
            updateWine.place = index + 1;
            await updateWine.save();
        })
        const competitiveCategory = await CompetitiveCategory.findById(categoryId);
        competitiveCategory.isFinalResultWrite = true;
        const savedComCat = await competitiveCategory.save();
        res.status(201).json({
            message: 'Výsledky zapísané',
            competitiveCategory: savedComCat
        })
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};