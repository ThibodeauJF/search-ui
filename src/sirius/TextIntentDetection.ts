export interface ITextIntentDetection {
  token: string;
  onResult: (res: ITextIntent) => void;
  onError: (err: any) => void;
}

export interface IEntity {
  confidence: number;
  value: string;
}

export type EntityKind =
  | 'keyword'
  | 'price_relative_filter'
  | 'price_lower_than'
  | 'filter_brand'
  | 'price_value'
  | 'filter_rating'
  | 'sort_order'
  | 'intent'
  | 'sort_type';

export interface ITextIntentEntities {
  [key: string]: IEntity[];
}

export interface ITextIntentMessage {
  text: string;
  isFinal: boolean;
}

export interface ITextIntent extends ITextIntentMessage {
  entities: Record<EntityKind, IEntity[]>;
  requestTime: number;
  intentRequestTime: number;
  intentResponseTime: number;
}

export class TextIntentDetection {
  private opts: ITextIntentDetection;
  private cache: Record<string, ITextIntent>;

  constructor(opts = {}) {
    this.opts = {
      token: undefined,
      onResult: res => {},
      onError: err => {},
      ...opts
    };
    this.cache = {};
  }

  public async parse(msg: string, isFinal: boolean) {
    const now = Date.now();

    // To prevent useless request to wit.ai
    const cache = this.getCachedResult(msg);
    if (cache) return this.emitResult(cache, isFinal, now);

    try {
      const response = await fetch(`https://api.wit.ai/message?q=${encodeURI(msg)}`, {
        headers: { Authorization: `Bearer ${this.opts.token}` }
      });

      const body = await response.json();
      this.setCachedResult(body, isFinal, now);
    } catch (error) {
      this.emitError(error);
    }
  }

  private getCachedKey(msg: string) {
    if (!msg) return;
    return msg.toLowerCase().trim();
  }

  private getCachedResult(msg: string) {
    return this.cache[this.getCachedKey(msg)];
  }

  private setCachedResult(body: any, isFinal: boolean, requestTime: number) {
    const cacheKey = this.getCachedKey(body._text);
    this.cache[cacheKey] = {
      text: body._text,
      isFinal,
      entities: body.entities,
      requestTime,
      intentRequestTime: requestTime,
      intentResponseTime: Date.now()
    };
    this.emitResult(this.cache[cacheKey], isFinal, requestTime);
  }

  private emitResult(res: ITextIntent, isFinal: boolean, requestTime: number) {
    const result = {
      ...res,
      isFinal,
      requestTime
    };

    this.opts.onResult && this.opts.onResult(result);
  }

  private emitError(err: any) {
    this.opts.onError && this.opts.onError(err);
  }
}
