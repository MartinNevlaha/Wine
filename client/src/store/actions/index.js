export { 
    degustatorLogged,
 } from './degAuth';

<<<<<<< HEAD
 export {
    adminLogin
 } from './adminAuth';
=======
export {
    adminLogin
} from './adminAuth';
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe

export {
    getWineId,
    getEliminatedStatus,
    getDegustatorBtnPress,
    getComment
} from './degRating';

export { 
    resultsSend,
    resultsSendInit,
    resultsSendCanceled,
    fetchWineInfo
} from './wineResults';

export {
    addWine,
    fetchWineList,
    deleteWine,
    editWine,
    saveEditWine,
    sortWineBy,
    databaseDelete,
    databaseImportInit,
    databaseImport
} from './wineList';

export { 
    addDegustator,
    databaseDegDeleteInit,
    databaseDegDeleteCanceled,
    databaseDegDelete,
    databaseDegImportInit,
    databaseDegImportCanceled,
    databaseDegImport,
    fetchDegList,
    sortDegBy,
    editDeg,
    saveEditDeg,
    deleteDegInit,
    deleteDegCanceled,
    deleteDeg,
} from './degList';

export {
    createDegGroups,
    minimalisedGroup,
    fetchDegListGroup,
    dragDegFromList,
    dropDegToGroup,
    dragDegFromGroup,
    saveDegGroups,
    fetchDegGroups,
    deleteGroupsInit,
    deleteGroupsCanceled,
    deleteGroups
} from './degGroups';