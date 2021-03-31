import { store } from '../store/store'

export const pageReducer = (state = store, action) => {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
          page: action.page,
      }
    }
    case 'SET_VISIBLETABLE': {
      return {
        ...state,
          visible: action.visible,
      }
    }
    case 'SET_COORDINATES': {
      return {
        ...state,
          lat: action.lat,
          lng: action.lng
      }
    }
    case 'SET_ZOOM': {
      return {
        ...state,
          zoom: action.zoom,
      }
    }
    case 'SET_AUTHNAME': {
      return {
        ...state,
          authName: action.authName,
          region: action.region,
          typeEmpl: action.typeEmpl
      }
    }
    default: {
        return state
      }
    }
  }
