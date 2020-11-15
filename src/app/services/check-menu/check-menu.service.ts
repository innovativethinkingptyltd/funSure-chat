
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CheckMenu {
    public show: EventEmitter<boolean>;

    constructor(){
        this.show = new EventEmitter();
    }
    public showMenu()  {
        this.show.emit(true);
    }
    public hideMenu()  {
        this.show.emit(false);
    }
}