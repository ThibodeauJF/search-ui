import { Component } from '../Base/Component';
import { exportGlobally } from '../../GlobalExports';
import { IComponentBindings } from '../Base/ComponentBindings';
import { $$ } from '../../utils/Dom';
import { SVGIcons } from '../../utils/SVGIcons';
import { SVGDom } from '../../utils/SVGDom';
import 'styling/_MicrophoneButton';
import { AccessibleButton } from '../../utils/AccessibleButton';
import { l } from '../../strings/Strings';
import { NlpService, INlpServiceOptions } from '../../sirius/NlpService';
import { ITextIntent, EntityKind, IEntity } from '../../sirius/TextIntentDetection';
import { QueryStateModel } from '../../models/QueryStateModel';

export interface IMicrophoneButtonOptions {}

export class MicrophoneButton extends Component {
  static ID = 'MicrophoneButton';

  static doExport = () => {
    exportGlobally({
      MicrophoneButton: MicrophoneButton
    });
  };

  static options: IMicrophoneButtonOptions = {};

  private active = false;
  private buttonElement: HTMLElement;
  private nlpService: NlpService;
  private nlpServiceOptions: INlpServiceOptions = {
    wit_t: 'ORKUKZBOF6SJJ355XOAIMLBP5T7JU5JZ',
    tooso_t: 'aq4erx876cnmqz0pmaw1',
    language: 'en-US',
    frequency: 0.4,
    onMessage: () => {},
    onStop: () => this.toggleActiveStatus(false),
    onIntent: data => this.onIntent(data),
    onError: () => {},
    onReady: () => {},
    onStart: () => {}
  };

  private lastNlpIntent: ITextIntent;
  private lastQueryKeywords = '';
  private priceField = '@ccpricesale';

  constructor(public element: HTMLElement, public options?: IMicrophoneButtonOptions, bindings?: IComponentBindings) {
    super(element, MicrophoneButton.ID, bindings);
    this.buildButton();
    this.addMicrophoneToggleKeyboardShortcut();
    this.nlpService = new NlpService(this.nlpServiceOptions);
  }

  private buildButton() {
    this.buttonElement = $$('button', { className: 'coveo-microphone-button' }, SVGIcons.icons.microphone).el;
    SVGDom.addClassToSVGInContainer(this.buttonElement, 'coveo-microphone-button-svg');
    this.element.appendChild(this.buttonElement);

    new AccessibleButton()
      .withElement(this.buttonElement)
      .withSelectAction(() => this.toggleActiveStatus(!this.active))
      .withLabel(l('SpeechToText'))
      .build();
  }

  private addMicrophoneToggleKeyboardShortcut() {
    $$(document.body).on('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        this.toggleActiveStatus(!this.active);
        e.preventDefault();
      }
    });
  }

  private updateQuery(query: string) {
    this.queryStateModel.set(QueryStateModel.attributesEnum.q, query);
  }

  private toggleActiveStatus(active: boolean) {
    this.active = active;
    $$(this.buttonElement).toggleClass('active', this.active);

    if (this.active) {
      return this.startNlp();
    }

    this.stopNlp();
  }

  private startNlp() {
    this.nlpService.start();
  }

  private stopNlp() {
    this.nlpService.stop();
  }

  private onIntent(intent: ITextIntent) {
    if (!intent.isFinal) {
      return this.updateQuery(intent.text);
    }

    this.lastNlpIntent = intent;
    this.logger.info(this.lastNlpIntent);

    const entityKeys = Object.keys(intent.entities) as EntityKind[];
    entityKeys.forEach(key => this.processEntity(key, intent.entities[key]));
    this.restoreLastQueryIfCurrentHasNoKeywords();

    this.queryController.executeQuery();
  }

  private restoreLastQueryIfCurrentHasNoKeywords() {
    const currentIntentHasKeywords = !!this.lastNlpIntent['keyword'];

    if (currentIntentHasKeywords || !this.lastQueryKeywords) {
      return;
    }

    this.updateQuery(this.lastQueryKeywords);
  }

  private processEntity(kind: EntityKind, entities: IEntity[]) {
    if (kind === 'keyword') {
      return this.processKeywordEntity(entities);
    }

    if (kind === 'sort_type') {
      return this.processSortTypeEntity(entities);
    }

    if (kind === 'price_relative_filter') {
      this.processPriceRelativeFilter(entities);
    }
  }

  private processKeywordEntity(entities: IEntity[]) {
    const query = entities.map(entity => entity.value).join(' ');
    this.lastQueryKeywords = query;
    this.updateQuery(query);
  }

  private processSortTypeEntity(entities: IEntity[]) {
    const sortType = entities[0].value;

    if (sortType === 'relevance') {
      return this.updateSort('relevancy');
    }

    if (sortType === 'price') {
      return this.updateSort(`${this.priceField} ${this.priceSortOrder}`);
    }
  }

  private processPriceRelativeFilter(entities: IEntity[]) {
    const value = entities[0].value;
    const order = value === 'high' ? 'descending' : 'ascending';
    this.updateSort(`${this.priceField} ${order}`);
  }

  private updateSort(sortType: string) {
    this.queryStateModel.set(QueryStateModel.attributesEnum.sort, sortType);
  }

  private get priceSortOrder() {
    const entity = this.lastNlpIntent.entities['sort_order'];
    const value = entity ? entity[0].value : '';
    return value === 'desc' ? 'descending' : 'ascending';
  }
}
