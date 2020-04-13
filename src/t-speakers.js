import {render,html} from '../node_modules/lit-html/lit-html.js'; 
import { repeat } from '../node_modules/lit-html/directives/repeat.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { unsafeHTML } from '../node_modules/lit-html/directives/unsafe-html.js';

export default class TSpeakers extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML=this.template;
    }

    get template(){
        return html`
            <style>
            :host{
                display:block;
            }
            #speaker-list{
                justify-content:center;
                align-content:center;
            }
            .speaker{
                margin-bottom:4rem;
            }
            
            .speaker a{
                text-decoration:none;
                color:#D7182A;
            }

            .speaker h3,.speaker .topic{
                margin-bottom:1rem;
            }
           
            .speaker .topic{ 
                color: black;
                text-transform:capitalize;
            }
            .speaker .desc{
                width:100%;
            }

            .speaker img.rounded{
                object-fit: cover;
                width:200px;
                height:200px;
                border-radius:100px;
                display:inline-block;
                margin-bottom:2rem;
            }
        /* Larger than mobile screen */
        @media (min-width: 640px) { 
            #speaker-list{
               display:grid;
               grid-template-columns:repeat(4,1fr);
               column-gap:2rem;
            }

            .speaker{
                grid-column: span 2;
            }
            .speaker:nth-child(odd):nth-last-child(1) {
                
                grid-column: 2/span 2;
            }
        }
        </style>
        <h2>Pembicara</h2>
        <div id="speaker-list">
        ${html`
            ${until(
                fetch('data/speakers.json')
                .then(res => res.json())
                .then(speakers => {
                    return html`
                    ${repeat(
                        speakers.speaker,
                        speaker => this.speakerCard({
                            name: speaker.name,
                            url: speaker.url,
                            topic: speaker.topic,
                            desc: speaker.desc,
                            photo: speaker.photo
                        })
                    )}`;
                }),
                html`<span> Menunggu Para Pembicara...</span>`
            )}`}
        </div>
        `;
    }

    speakerCard({name, url,topic, desc, photo}) {
        desc = desc
            .replace(/-/g,'')
            .replace(/\n/g,',');
            
        return html`
            <div class="speaker">
                <img src=${photo} loading="lazy" class="rounded" alt="Foto ${name}"/>
                <h3><a href="${url}">${name}</a></h3>
                <div class="topic">${topic}</div>
                <div class="desc">${unsafeHTML(desc)}</div>
            </div> 
            `;
    }

    connectedCallback() {
        this.render();
    }

    render(){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
        });
    }
}