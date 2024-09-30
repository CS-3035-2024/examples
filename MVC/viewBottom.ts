import {
    SKButton,
    SKContainer,
    SKElementProps,
} from "../simplekit/src/imperative-mode";
import { Controller } from "./controller";
import { Model } from "./model";
import { Subscriber } from "./subscriber";

export class ViewBottom extends SKContainer implements Subscriber{
    
    private _model: Model;
    randomizeButton: SKButton = new SKButton({ text: "Random" });


    constructor(props: SKElementProps){
        super(props); // Super call since we extend SKContainer
        this.addChild(this.randomizeButton);
    }


    set model(m: Model){
        this._model = m;
    }


    // Link the controller and button event listner
    setButtonEvent(c: Controller){
        this.randomizeButton.addEventListener("action", () => {
            c.buttonPress();
        });
    }


    // update() from Subscriber
    update(): void{
        this.randomizeButton.text = this._model.count.toString(); // Update the text in the button from model
    }  

}