export const setPage = (page) => ({
    type: 'SET_PAGE',
    page,
})

export const setVisibleTable = (visible) => ({
    type: 'SET_VISIBLETABLE',
    visible,
})

export const setAuthName = (authName, region, typeEmpl) => ({
    type: 'SET_AUTHNAME',
    authName,
    region,
    typeEmpl,
})