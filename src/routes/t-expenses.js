import {html,render} from '../../node_modules/lit-html/lit-html.js';
import { get, set } from '../../node_modules/idb-keyval/dist/idb-keyval.mjs';

export class TExpenses extends HTMLElement {
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


   
    get template(){
        return html`
            <h1>Expense</h1>
        `;
    }
}

customElements.define('t-expenses', TExpenses);