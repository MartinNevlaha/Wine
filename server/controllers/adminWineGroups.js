const { validationResult } = require("express-validator");
const Excel = require("exceljs");

const Wine = require("../models/wine");
const Group = require("../models/degGroup");

exports.getEditGroup = async (req, res, next) => {
  const populateQuery = {
    path: "group",
    model: "Group",
    select: "groupName _id",
  };
  try {
    const wines = await Wine.find(
      {},
      "-results -totalResults -wineCategory -finalResult"
    ).populate(populateQuery);
    if (!wines) {
      const error = new Error("Nemôžem načítať dáta z DB");
      error.statusCode = 404;
      return next(error);
    }
    const groups = await Group.find({}, "-items -results");
    if (!groups) {
      const error = new Error("Nepodarilo sa načítať skupiny");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "data načítané",
      wines: wines,
      groups: groups,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveWineGroups = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Niektoré z poskytnutých dát sú nesprávne");
    error.statusCode = 422;
    return next(error);
  }
  const wineGroupsData = req.body;

  try {
    await wineGroupsData.forEach(async (wine) => {
      const saveWine = await Wine.findById(wine._id);
      if (!saveWine) {
        const error = new Error(`Nemôžem uložiť dáta pre id vína ${wine.id}`);
        error.statusCode = 404;
        return next(error);
      }
      saveWine.group = wine.group;
      await saveWine.save();
      const saveGroup = await Group.findById(wine.group);
      if (!saveGroup) {
        const error = new Error(
          `Nemôžem uložiť dáta pre degustačnú skupinu ${wine.group}`
        );
        error.statusCode = 404;
        return next(error);
      }
      saveGroup.wines.push(wine._id);
      await saveGroup.save();
    });

    res.status(200).json({
      message: "dáta uložené",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.exportWineGroups = async (req, res, next) => {
  res.writeHead(200, {
    "Content-Disposition": 'attachment; filename="results_by_cat.xlsx"',
    "Transfer-Encoding": "chunked",
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const streamOption = {
    stream: res,
    useStyles: true,
    useSharedString: false,
  };
  const workbook = new Excel.stream.xlsx.WorkbookWriter(streamOption);
  try {
    const groups = await Group.find({}, "groupName").lean();
    if (!groups) {
      const error = new Error("Nepodarilo sa načítať skupiny");
      error.statusCode = 404;
      return next(error);
    }
    for await (let group of groups) {
      let worksheet = workbook.addWorksheet(`skupina_${group.groupName}`);
      worksheet.columns = [
        { header: "Číslo vína", key: "id" },
        { header: "Súťažná kategoria", key: "competitiveCategory" },
        { header: "Názov vína", key: "name" },
        { header: "Klasifikácia vína", key: "clasification" },
        { header: "Farba vína", key: "color" },
        { header: "Charakter vína", key: "character" },
        { header: "Výrobca vína", key: "producer" },
        { header: "Ročník vína", key: "vintage" },
        { header: "Degustačna skupona", key: "group" },
      ];
      for (let column of worksheet.columns) {
        column.width = column.header.length < 20 ? 20 : column.header.length;
      }
      worksheet.getRow(1).font = { bold: true };
      const wines = await Wine.find({ group: group._id }).lean();
      if (!wines) {
        const error = new Error("Nepodarilo sa exportovať súbor");
        error.statusCode = 500;
        return next(error);
      }
      const dataToExport = wines.map((wine) => {
        return {
          id: wine.id,
          competitiveCategory: wine.competitiveCategory,
          name: wine.name,
          clasification: wine.clasification,
          color: wine.color,
          character: wine.character,
          producer: wine.producer,
          vintage: wine.vintage,
          group: group.groupName,
        };
      });
      for (let wine of dataToExport) {
        worksheet
          .addRow({
            ...wine,
          })
          .commit();
      }
      worksheet.commit();
    }
    workbook.commit();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
