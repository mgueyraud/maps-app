import { PlacesState } from './PlacesProvider';
import { Feature } from '../../interfaces/places';

type ActionsPlaces = | {
    type: 'SET_USER',
    payload: [number, number]
} | {type: 'SET_PLACES', payload: Feature[]} | {type: 'SET_LOADING_PLACES' }

export const placesReducer = (state: PlacesState, action: ActionsPlaces): PlacesState => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'SET_PLACES':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        case 'SET_LOADING_PLACES':
            return {
                ...state,
                isLoadingPlaces: true,
                places: []
            }
        default: 
            return state;
    }
}