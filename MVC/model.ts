import { Subscriber } from "./subscriber";

export class Model{

    private _count:number = 0;
    private subscribers: Subscriber[] = [];


    get count(){
        return this._count;
    }


    set count(c: number){
       this._count = c;
       this.notifySubscribers();
    }


    public addSubscriber(s: Subscriber): void{
        this.subscribers.push(s);
        this.notifySubscribers();
    }

    
    private notifySubscribers(): void{
        this.subscribers.forEach(subscriber => subscriber.update()); // Call update function for all subscribers
    }

}