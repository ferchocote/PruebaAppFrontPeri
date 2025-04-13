import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {
  transform(users: any[], filterText: string): any[] {
    if (!filterText) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}