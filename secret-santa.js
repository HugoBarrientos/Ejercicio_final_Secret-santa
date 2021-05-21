import { LitElement, html, css } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-icon';
import '@material/mwc-top-app-bar';

class SecretSanta extends LitElement {
  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 100vw;
        max-width: 80vw;
      }
      mwc-textfield{
        display: block;
        width=20px !important;
      }

      .mdc-top-app-bar{
        width: 20px;
      }

      mwc-button{
        display: flex;
      }

      .list-item{
        height: 100px;
      }
      .gift-button{
        width: 90px;
        display: inline;
      }

      .textfield-gift{
        width: 400px;
      }

      .list-item-regalo{
        width: 200px;
        font-size: 12px;
      }

    `;
  }

  static get properties() {
    return {
      persona: {
        type: String,
      },
      personas: {
        type: Array,
      },
      regalo:{
        type: String
      },
      regalos: {
        type: Array
      },
      sorteo: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    this.persona= '';
    this.personas = [];
    this.regalo = '';
    this.regalos = [];
    this.sorteo = [];
  }

  addPersona() {
    const persona = this.shadowRoot.querySelector('#current-persona');
    this.personas = [...this.personas, persona.value];
    // Esta función se ejecuta si el spread opereator no es suficiente
    // como para que el cambio se refleje de forma atomática
    // this.requestUpdate()
    persona.value = '';
    
  }

  deleteTodo(e) {
    this.personas = this.personas.filter((todo) => todo !== e.target.id);
  }

  addWhish(){
    console.log('Hola')
    const regalo = this.shadowRoot.querySelector('#current-regalo');
    this.regalos = [...this.regalos, regalo.value];
    regalo.value='';
  }

  hacerSorteo(){
    for(let i=0; i < this.personas.length-1; i++){
      this.sorteo.push(this.personas[i] + " le regala a " +  this.personas[i+1]);
      console.log(this.sorteo[i])
    } 
    this.sorteo.push(this.personas[this.personas.length-1] + " le regala a " +  this.personas[0]);
    console.log(this.sorteo[2])
    console.log(this.sorteo.length)
    return this.sorteo 
  }

render() {
  return html`
    <div class="container">
    <mwc-top-app-bar centerTitle class="top-bar">
        <mwc-icon icon="menu" slot="navigationIcon">menu</mwc-icon>
        <div slot="title">Secret Santa</div>
        <mwc-icon icon="menu" slot="navigationIcon">card_giftcard</mwc-icon>
      </mwc-top-app-bar>
      <mwc-textfield
        label="Participante"
        helper="Escribe un nuevo participante"
        @change="${(e) => (this.persona = e.target.value)}"
        .value="${this.persona}"
        id="current-persona"
      ></mwc-textfield>
      <mwc-button
        raised
        @click="${this.addPersona}"
        label="Agregar"
        ?disabled="${this.persona === ''}"
      ></mwc-button>
      ${this.personas.length === 0
        ? html` <p>no hay todos</p> `
        : html`
            <mwc-list multi>
              ${this.personas.map(
                (persona) => html`
                <mwc-list-item graphic="icon" class="list-item">${persona}
                  <mwc-icon
                  id=${persona}
                  @click=${this.deleteTodo}
                  slot="graphic"
                  >emoji_emotions</mwc-icon>
                  <mwc-textfield
                  label="Regalo"
                  @change="${(e) => (this.regalo = e.target.value)}"
                  .value="${this.regalo}"
                  id="current-regalo"
                ></mwc-textfield>
                </mwc-list-item>
                <mwc-button
                class= "gift-button"
                raised
                @click="${this.addWhish}"
                label="Agregar"
                ?disabled="${this.persona === ''}"
                ></mwc-button>
                  ${this.regalos.length ===0
                    ? html` <p>No hay regalos</p>`
                    : html`
                      <mwc-list multi>
                        ${this.regalos.map(
                          (regalo) => html `
                          <mwc-list-item graphic="icon" class="list-item-regalo">${regalo}
                          </mwc-list-item>
                          <li divider role="separator"></li>
                          `
                        )}
                      </mwc-list multi>
                    `
                  }
                  <li divider role="separator"></li>
                `
              )}
            </mwc-list>
          `}
          <mwc-button
          raised
          @click="${this.hacerSorteo}"
          label="Hacer Sorteo"
          ?disabled="${this.personas === ''}"
        ></mwc-button>
        ${this.personas.length === 0
          ? html``
          : html`
          <mwc-list multi>
          ${this.sorteo.map(
            (n) => html`
            <mwc-list-item graphic="icon" class="list-item">
           <slot>${n}</slot>
            </mwc-list-item>
            `
          )}
           </mwc-list multi>
          `}
    </div>
  `;
}
}
customElements.define('secret-santa-list', SecretSanta);