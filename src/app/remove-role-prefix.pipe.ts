import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeRolePrefix'
})
export class RemoveRolePrefixPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.startsWith('ROLE_') ? value.substring(5) : value;
  }

}
