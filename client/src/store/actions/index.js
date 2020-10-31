export { 
    degLogin,
    degLogout,
    degAuthCheckState
 } from './degAuth';

 export {
    adminLogin,
    adminLogout,
    adminAuthCheckState
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
    fetchWineInfo,
    fetchWineInGroup
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

export {
    fetchDegResults,
    fetchDegResultById,
    closeDetailResult
} from './degResults';

export {
    fetchSystemInfo,
    completeResetDb
} from './SystemInfo';

export {
    saveSettings,
    fetchSetting
} from './systemSettings';

export {
    fetchEditWineGroups,
    wineGroupChanged,
    sortWineGroupsBy,
    saveWineGroups
} from './wineGroups';

export {
    fetchCompetitiveCategory,
    fetchWineResultsByComCategory,
    fetchResultsByWineId,
    fetchDegGroupsRes,
    fetchResultsByGroup,
    fetchListOfDegustators,
    fetchResultsByDeg
} from './finalResults';