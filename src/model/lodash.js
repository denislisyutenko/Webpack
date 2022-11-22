import _ from 'lodash';

const numberArr = [1, 5, 5, 5, 8, 10, 1, 1, 1, 5, 15, 42, 5];
const uniqNumberArr = _.uniq(numberArr);

console.log('Lodash UNIQ:', uniqNumberArr);
console.log('Lodash RANDOM:', _.random(0, 100));


