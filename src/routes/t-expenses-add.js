import {html,render} from 'lit-html';
export class TExpensesAdd extends HTMLElement {
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
            <h1>Group</h1>
        `;
    }
}

customElements.define('t-expenses-add', TExpensesAdd);