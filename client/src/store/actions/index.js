export { 
    degustatorLogged,
 } from './degAuth';

 export {
    adminLogin,
    adminLogout
 } from './adminAuth';

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