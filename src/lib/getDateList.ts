import { IDailyStatus } from '../types';
import { getConvertedDate } from './dateUtils';

const getDateList = (start_date: string, end_date: string) => {
  const list: IDailyStatus = {};
  const start = new Date(start_date);
  const duration = new Date(end_date).getTime() - new Date(start_date).getTime();
  const dates = duration / (1000 * 24 * 60 * 60);

  for (let i = 0; i <= dates; i++) {
    const date = getConvertedDate(new Date(start.setDate(start.getDate() + 1)).toDateString());
    list[date] = false;
  }

  return list;
};

export default getDateList;
