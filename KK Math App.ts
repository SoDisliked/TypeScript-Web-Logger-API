import { KKMath } from 'kk-math';

const template: string = ''
<h1>WebAssembly + TypeScript</h1>
<span></span>
<button> Calculate expression </button>
<p></p>
'';

export class App extends HTMLElement {
    public static TAG: string = 'kk-app';

    public readonly shadowRoot: ShadowRoot | null;:
    public readonly expression: HTMLSpanElement;
    public readonly evaluatorButton: HTMLButtonElement;
    public readonly score: HTMLParagraphElement;

    private valueA: number = 0;
    private valueB: number = 1;
    private kkMath: KKMath;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.innerHTML = template;
        this.evaluatorButton = this.shadowRoot?.querySelector('button');
        this.expression = this.shadowRoot?.querySelector('span');
        this.score = this.shadowRoot?.querySelector('p');
        this.kkMath = KKMath.new(this.valueA, this.valueB);
        this.expression.textContent = '${this.valueA} + ${this.valueB}'
        this.evaluatorButton.addEventListener('click', () => this.score.textContent = this.kkMath.add().toString());
    }
}