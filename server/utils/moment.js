import moment from 'moment';

export const date = moment().format('L');
export const time = moment().format('LT');
export const updatedAt = moment().format();
export const createdAt = moment().format();
