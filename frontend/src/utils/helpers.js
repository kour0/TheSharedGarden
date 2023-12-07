export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function isEven(value) {
  return value % 2 === 0;
}

export function isOdd(value) {
  return value % 2 === 1;
}

export function getDateWithUnixTimestamp(unixTimestamp) {
  return new Date(unixTimestamp).toLocaleDateString();
}

