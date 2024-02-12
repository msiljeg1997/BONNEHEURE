import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DynamicObject } from '../models/helper-models';

type sortArg<T> = keyof T | `-${string & keyof T}`

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
  ) {
  }

  public ArrayToSelectItemArray($data: Array<DynamicObject>, $label: string, $value: string): SelectItem[] {
    let arr: SelectItem[] = [];

    $data.forEach(element => {
      let row: SelectItem = {
        label: element[$label],
        value: element[$value],
      };

      arr.push(row);
    });

    return arr;
  }

  public deepCopy($obj: any): any {
    var copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == $obj || "object" != typeof $obj) return $obj;

    // Handle Date
    if ($obj instanceof Date) {
      copy = new Date();
      copy.setTime($obj.getTime());
      return copy;
    }

    // Handle Array
    if ($obj instanceof Array) {
      copy = [];
      for (var i = 0, len = $obj.length; i < len; i++) {
        copy[i] = this.deepCopy($obj[i]);
      }
      return copy;
    }

    // Handle Object
    if ($obj instanceof Object) {
      copy = {};
      for (var attr in $obj) {
        if ($obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy($obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  public pipeValue($value: any, $type: string): any {
    if ($type == 'string') {
      return $value;
    } else if ($type == 'date') {
      return this.datePipe.transform($value, 'dd.MM.YYYY.');
    } else if ($type == 'decimal') {
      return this.decimalPipe.transform($value, '1.2-2');
    }
  }

  public containsObject(obj: any, list: any[]) {
    var i: number;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

  /**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */

  public byPropertiesOf<T extends object>(sortBy: Array<sortArg<T>>) {
    function compareByProperty(arg: sortArg<T>) {
      let key: keyof T
      let sortOrder = 1
      if (typeof arg === 'string' && arg.startsWith('-')) {
        sortOrder = -1
        // Typescript is not yet smart enough to infer that substring is keyof T
        key = arg.substr(1) as keyof T
      } else {
        // Likewise it is not yet smart enough to infer that arg here is keyof T
        key = arg as keyof T
      }
      return function (a: T, b: T) {
        const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

        return result * sortOrder
      }
    }

    return function (obj1: T, obj2: T) {
      let i = 0
      let result = 0
      const numberOfProperties = sortBy?.length
      while (result === 0 && i < numberOfProperties) {
        result = compareByProperty(sortBy[i])(obj1, obj2)
        i++
      }

      return result
    }
  }

  /**
  * Sorts an array of T by the specified properties of T.
  *
  * @param arr - the array to be sorted, all of the same type T
  * @param sortBy - the names of the properties to sort by, in precedence order.
  *                 Prefix any name with `-` to sort it in descending order.
  */
  public sort<T extends object>(arr: T[], ...sortBy: Array<sortArg<T>>) {
    arr.sort(this.byPropertiesOf<T>(sortBy))
  }

  public randomHash($length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < $length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public makeDateObject(_date: any) {
    if (_date == null) {
      return _date;
    }

    return new Date(_date);
  }

  public scrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }

}
