export const updateObj = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const searchIdetificator = (e, tableHeadName, tableHeadId) => {
    const chossenHeader = e.target.value;
    let chossenHeadId = '';
    if (chossenHeader === tableHeadName[0]) {
        chossenHeadId = tableHeadId[0];
    } else if (chossenHeader === tableHeadName[1]) {
        chossenHeadId = tableHeadId[1] 
    } else if (chossenHeader === tableHeadName[2]) {
        chossenHeadId = tableHeadId[2] 
    } else if (chossenHeader === tableHeadName[3]) {
        chossenHeadId = tableHeadId[3] 
    } else if (chossenHeader === tableHeadName[4]) {
        chossenHeadId = tableHeadId[4] 
    } else if (chossenHeader === tableHeadName[5]) {
        chossenHeadId = tableHeadId[5] 
    }
    return [chossenHeader, chossenHeadId]
};

export const searchFilter = (oldList, filteredBy, filterValue) => {
    let filteredList = null;
        filteredList = oldList.filter(val => 
            val[filteredBy].toString().toLowerCase().includes(filterValue.toLowerCase()))
    return filteredList;
};
