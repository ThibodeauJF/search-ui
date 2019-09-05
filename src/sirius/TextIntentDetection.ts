interface ITextIntentDetection {
  token: string;
  onResult: (res: any) => void;
  onError: (err: any) => void;
}

interface ITextIntent {
  text: string;
  isFinal: boolean;
  entities: any;
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

  private setCachedResult(body, isFinal: boolean, requestTime: number) {
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

  private emitResult(res, isFinal: boolean, requestTime: number) {
    const result = {
      ...res,
      isFinal,
      requestTime
    };

    this.opts.onResult && this.opts.onResult(result);
  }

  private emitError(err) {
    this.opts.onError && this.opts.onError(err);
  }
}