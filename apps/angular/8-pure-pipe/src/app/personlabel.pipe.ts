import { Pipe, PipeTransform } from "@angular/core";

export @Pipe({
    name:"personLabel"
})
class PersonLabelPipe implements PipeTransform{

    transform(value: string, index:number) {

        return `${value} - ${index}`;
        
    }
    
}