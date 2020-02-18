import {html,render} from '../../node_modules/lit-html/lit-html.js';
import { get, set } from '../../node_modules/idb-keyval/dist/idb-keyval.mjs';

export class TGroups extends HTMLElement {
    constructor(){
        super();
        this.groups = [];
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }  

    connectedCallback(){
        this.getGroups();
        this.render();
    }

    async getGroups(){
        this.groups = await get('groups');
        this.render();
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
    }


   
    get template(){
        return html`
            <h1>Groups</h1>
            <a href="/groups/create">Create</a>
            <ul>
                ${this.groups.map((group) => html`<li><a href="/expenses/${group.id}">${group.name}</a></li>`)}
            </ul>
        `;
    }
}

customElements.define('t-groups', TGroups);