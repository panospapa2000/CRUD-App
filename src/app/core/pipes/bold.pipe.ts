import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
 
@Pipe({
    name: 'bold'
})
 
export class MakeBold implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: any, args: any): any {
        if (!value)
            return value;
        {
            value = value.toString()
        }
        if (!args) {
            return value;
        }

        //Matching text
        const re = new RegExp(args, 'gi');
        const match = value.match(re);
 
        if (!match) {
            return value;
        }
 
        const replacedValue = value.replace(re, "<b>$&</b>")
        return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
    }
}