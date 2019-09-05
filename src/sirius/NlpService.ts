import { CoveoSpeechToText } from './SpeechToText';
import { TextIntentDetection, ITextIntent, ITextIntentMessage } from './TextIntentDetection';

export interface INlpService {
  tooso_t: string;
  language: string;
  frequency: number;
  delay: number;
  wit_t: string;
  onStart?: () => void;
  onReady?: () => void;
  onMessage?: (res: ITextIntentMessage) => void;
  onIntent?: (res: ITextIntent) => void;
  onStop?: () => void;
  onError?: (error: any) => void;
}

export class NlpService {
  private opts: INlpService;
  private intentInstance: TextIntentDetection;
  private speechInstance: CoveoSpeechToText;

  constructor(opts: INlpService) {
    this.opts = opts;
    this.initSpeechToText();
  }

  public start() {
    this.speechInstance.start();
  }

  public stop() {
    this.speechInstance.stop();
  }

  public isListening() {
    return this.speechInstance.isListening;
  }

  private initSpeechToText() {
    this.speechInstance = new CoveoSpeechToText({
      token: this.opts.tooso_t,
      language: this.opts.language,
      frequency: this.opts.frequency || 0.4,
      onStart: () => {
        this.emitOnStart();
        this.intentInstance = new TextIntentDetection({
          token: this.opts.wit_t,
          onResult: (res: ITextIntent) => this.intentInstance && this.emitOnIntent(res),
          onError: (err: any) => this.intentInstance && this.emitOnError(err)
        });
      },
      onReady: () => this.emitOnReady(),
      onMessage: res => this.emitOnMessage(res),
      onStop: () => this.emitOnStop(),
      onError: (e: any) => this.emitOnError(e)
    });
  }

  private emitOnStart() {
    this.opts.onStart && this.opts.onStart();
  }

  private emitOnReady() {
    this.opts.onReady && this.opts.onReady();
  }

  private emitOnMessage(msg: ITextIntentMessage) {
    this.opts.onMessage && this.opts.onMessage(msg);
    this.intentInstance && this.intentInstance.parse(msg.text, msg.isFinal);
  }

  private emitOnIntent(intent: ITextIntent) {
    this.opts.onIntent && this.opts.onIntent(intent);
  }

  private emitOnStop() {
    this.speechInstance.stop();
    this.intentInstance = undefined;
    this.opts.onStop && this.opts.onStop();
  }

  private emitOnError(e) {
    this.opts.onError && this.opts.onError(e);
  }
}
