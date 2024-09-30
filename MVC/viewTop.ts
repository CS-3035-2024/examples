import {
    SKContainer,
    SKElementProps,
    SKLabel,
} from "../simplekit/src/imperative-mode";
import { Model } from "./model";
import { Subscriber } from "./subscriber";

export class ViewTop extends SKContainer implements Subscriber{

    private _model: Model;

    
    constructor(props: SKElementProps){
        super(props); // Super call since we extend SKContainer

    }


    set model(m: Model){
        this._model = m;
    }
    

    // update() from Subscriber
    // Function creates squares based on model.count
    update(): void{
        const elements = this._model.count;
        this.clearChildren();
        for (let i = 0; i < elements; i++){
            const button = new SKLabel({width: 87.5, height: 87.5, text: (i+1).toString()});
            button.fill = `hsl(${Math.random() * 360} 100% 50%)`;
            this.addChild(button);
        }
    }

}