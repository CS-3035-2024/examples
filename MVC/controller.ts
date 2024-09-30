import { Model } from "./model";

export class Controller{

    private _model: Model;

    
    set model(m: Model){
        this._model = m;
    }


    // Updates model with a random number 
    public buttonPress(): void{   
        this._model.count = Math.floor(Math.random()*16) + 1;;
    }

}