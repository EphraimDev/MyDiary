import moment from 'moment';

const momentCheck = {
    "date": moment().format('L'),
    "time": moment().format('LT'),
    "createdAt": moment().format()
};

export default momentCheck; 

