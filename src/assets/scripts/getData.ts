const stringifyMonth = (month: number): string => {
  switch (month) {
    case 1: return 'Явнваря'
    case 2: return 'Февраля'
    case 3: return 'Марта'
    case 4: return 'Апреля'
    case 5: return 'Мая'
    case 6: return 'Июня'
    case 7: return 'Июля'
    case 8: return 'Августа'
    case 9: return 'Сентября'
    case 10: return 'Октября'
    case 11: return 'Ноября'
    case 12: return 'Декабря'
    default: return 'Неизвестно'
  }
}

const getData = (stringDate: string): string => {
  const date = new Date(stringDate);
  const dateNow = new Date(Date.now());
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const time = `${date.getHours()}:${minutes} i-GMT+3`;
  if (dateNow.getFullYear() - date.getFullYear() > 0 || dateNow.getMonth() - date.getMonth() > 0) {
    return `${date.getDate()} ${stringifyMonth(date.getMonth() + 1)} ${date.getFullYear()}, ${time}`
  }
  switch (dateNow.getDate() - date.getDate()) {
    case 0: return `Сегодня, ${time}`
    case 1: return `Вчера, ${time}`
    case 2: return `Позавчера, ${time}`
    default: return `${date.getDate()} ${stringifyMonth(date.getMonth() + 1)} ${date.getFullYear()}, ${time}` 
  }
}

export default getData;