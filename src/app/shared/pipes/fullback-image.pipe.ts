import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullbackImage'
})
export class FullbackImagePipe implements PipeTransform {

  transform(value: string | null, fullback='assets/images/shared/image.svg'): string {
    return value ? value : fullback;
  }

}
