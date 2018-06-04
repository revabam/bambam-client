import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'order'
})

/**
 * Order a list of objects in either ascending or descending order.
 * @author Shane Avery Sistoza | Batch: 1712-Steve
 */
@Injectable()
export class OrderPipe implements PipeTransform {

  /**
   * Returns sorted objects.
   * Leave the order param blank for default, ascending.
   * Add "desc" for descending to order param.
   *
   * @param      {any[]}  items   The items to sort.
   * @param      {string}  field   The field to sort by.
   * @param      {string}  order    The ordering for items.
   * @return     {any[]}  sorted list.
   */
  transform(items: any[], field: string, order: string): any[] {
    if (!items) {
      return [];
    }
    if (!field) {
      return items;
    }
    if (!order) {
      return items.sort((f1, f2) => {
        return f1[field] < f2[field] ? -1 : f1[field] > f2[field] ? 1 : 0;
      });
    }
    if (order = 'desc') {
      return items.sort((f1, f2) => {
        return f2[field] < f1[field] ? -1 : f2[field] > f1[field] ? 1 : 0;
      });
    }
  }
}
