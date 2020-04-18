import {render,html} from '../../node_modules/lit-html/lit-html.js'; 
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { until } from '../../node_modules/lit-html/directives/until.js';


export default class TSchedule extends HTMLElement {
    constructor(){
        super();
        this.dataUrl='/data/jadwal.json';
        this._shadowRoot=this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML=this.template;
    }

    connectedCallback() {
        this.render();
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
    }

    get template(){
        return html`
            <style>
                :host{
                    display:block;
                    background:#FFF;
                }
                
                #schedule-container{
                    max-width:960px;
                    margin:96px auto 24px auto;
                    padding:0 1rem 5rem 1rem;
                }
                .date{
                    margin:4rem 0;
                    font-size:2rem;
                }
                .event{
                    margin-bottom:4rem;
                }

    
            </style>
        
            <div id="schedule-container">
                <h1>Jadwal</h1>
                <div id="schedule-list">
                ${html`
                    ${until(
                        fetch(this.dataUrl)
                        .then(res => res.json())
                        .then(sessions => {
                            return html`
                            ${repeat(
                                sessions.jadwal,
                                session => {
                                    return this.eventCard(session);
                                }
                            )}`;
                        }),
                        html`<span> Menunggu data...</span>`
                    )}`}
                </div>
            </div>  
        `;
    }

    eventCard(event) {
        return html`
            <div class="event">
                <div>${event.start}</div>
                <h3>${event.speaker}</h3>
                <div>${event.topic}</div>
            </div> 
            `;
    }
}
customElements.define('t-schedule',TSchedule);