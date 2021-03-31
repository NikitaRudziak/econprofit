export const setPage = (page) => ({
  type: 'SET_PAGE',
  page,
})

export const setVisibleTable = (visible) => ({
  type: 'SET_VISIBLETABLE',
  visible,
})

export const setCoordinates = (lat, lng) => ({
  type: 'SET_COORDINATES',
  lat,
  lng,
})

export const setZoom = (zoom) => ({
  type: 'SET_ZOOM',
  zoom,
})

export const setAuthName = (authName, region, typeEmpl) => ({
  type: 'SET_AUTHNAME',
  authName,
  region,
  typeEmpl,
})