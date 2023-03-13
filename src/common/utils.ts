export function commaPerThousand(number: number) {
  return number.toLocaleString('ko-KR');
}

export function convertDateToTime(date: string) {
  const newDate = new Date(date);

  return `${String(newDate.getHours()).padStart(2, '0')}:${String(
    newDate.getMinutes()
  ).padStart(2, '0')}:${String(newDate.getSeconds()).padStart(2, '0')}`;
}
