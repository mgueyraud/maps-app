import { Map, Marker } from 'mapbox-gl';
import { MapState } from './MapProvider';

type MapActions = 
    | { type: 'ADD_MAP', payload: Map }
    | { type: 'SET_MARKERS', payload: Marker[] }

export const mapReducer = (state: MapState, action: MapActions): MapState => {
    switch(action.type){
        case 'ADD_MAP':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'SET_MARKERS':
            return {
                ...state,
                markers: action.payload
            }
        default: 
            return state;
    }
}