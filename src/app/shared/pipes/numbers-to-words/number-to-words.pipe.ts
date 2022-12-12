import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
   name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {
  transform(value: any): string {
    if (value && isInteger(value))
      return  numToWords(value);
    
    return value;
  }
}

const isInteger = function(x: any) {
   return x % 1 === 0;
}

let a = []
let b = []
let g = []
const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0,n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f (g (x));
const not = x => !x;
const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];
// numToWords :: (Number a, String a) => a -> String
let numToWords = n => {
  if(localStorage.getItem('preferredLanguage') == "en"){
  a = [
    '', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
   b = [
    '', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
   g = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
    'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
  ];
}else{
  a = [
    '', 'الاول', 'الثاني', 'الثالث', 'الرابع',
    'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع',
    'العاشر', 'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر',
    'الخامس عشر', 'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر'
  ];
   b = [
    '', '', 'الثاني و عشرون', 'الثالث و عشرون', 'الرابع و عشرون',
    'الخامس و عشرون', 'السادس و عشرون', 'السابع و عشرون', 'الثامن و عشرون', 'التاسع و عشرون'
  ];
   g = [
    '', 'ألف', 'مليون'
  ];
}
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  let makeGroup = ([ones,tens,huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
      a[tens+ones] || a[ones]
    ].join('');
  };
  // "thousands" constructor; no real good names for this, i guess
  let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
  // execute !
  if (typeof n === 'number') return numToWords(String(n));
  if (n === '0')             return 'zero';
  return comp (chunk(3)) (reverse) (arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(' ');
};