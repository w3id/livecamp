import {html,render} from '../../node_modules/lit-html/lit-html.js';
export class TAbout extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }  

    connectedCallback(){
        this.render();
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
    }


   
   
}

customElements.define('t-about', TAbout);