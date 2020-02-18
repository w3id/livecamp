import {html,render} from '../../node_modules/lit-html/lit-html.js';
import { get, set } from '../../node_modules/idb-keyval/dist/idb-keyval.mjs';

export class TGroupsCreate extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }  

    connectedCallback(){
        this.render();
    }

    async createGroup(){
        const group = this.shadowRoot.querySelector('input').value;
        const groupData = {
            id : group.replace(' ','-').toLowerCase(),
            name : group,
            desc : ''
        };

        let groups = await get('groups');
        
        if(typeof groups === 'undefined'){
            groups = [];
        }

        groups.push(groupData);
        set('groups', groups)
            .then(() => console.log('It worked!'))
            .catch(err => console.log('It failed!', err));
        
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this.shadowRoot);
        });
    }


   
    get template(){
        const el = this;
        const clickHandler = {
            // handleEvent method is required.
            handleEvent(e) { 
              el.createGroup();
            },
            // event listener objects can also define zero or more of the event 
            // listener options: capture, passive, and once.
            capture: true,
          };

        return html`
            <a href="/groups">Back</a>
            <h1>Create Group</h1>

            <input type="text" name="group">
            <button @click=${clickHandler}>Create</button>
        `;
    }
}

customElements.define('t-groups-create', TGroupsCreate);