import axios from 'axios';
import {
    CHANGE_VALUE
} from './types';

export function changeValue(value){
    return {
        type: CHANGE_VALUE,
        payload: value
    }
}


