Coveo.TemplateCache.registerTemplate("CardYouTubeVideo", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\" style=\"padding: 0\">\n    <div class=\"CoveoBackdrop coveo-result-row\" data-image-field=\"@ytthumbnailurl\" data-overlay-color=\"rgb(38, 62, 85)\" data-overlay-gradient=\"true\">\n      <div style=\"padding: 20px\">\n        <div class=\"coveo-result-row\" style=\"margin-bottom: 15px\">\n          <div class=\"coveo-result-cell\" style=\"width: 32px; flex-grow:0\">\n            <span class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\"></span>\n          </div>\n          <div class=\"coveo-result-cell\" style=\"padding-left: 10px; \">\n            <span class=\"CoveoResultLink\" style=\"color: white\"></span>\n          </div>\n        </div>\n        <div class=\"coveo-result-row\" style=\"margin-bottom: 20px\">\n          <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n            <div class=\"CoveoExcerpt\" style=\"color: white;\"></div>\n          </div>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\" style=\"display: flex; justify-content: space-between; margin: 0; color: white;\">\n        <div class=\"coveo-result-cell\" style=\"background-color: rgba(38, 62, 85, 0.8); padding: 10px 10px 10px 20px; display: inline-block;\">\n          <span class=\"CoveoFieldValue\" data-field=\"@ytviewcount\" data-helper=\"number\" data-helper-options-format=\"n\"></span>\n          <span class=\"CoveoText\" data-value=\"views\"></span>\n        </div>\n        <div class=\"coveo-result-cell\" style=\"background-color: rgba(38, 62, 85, 0.8); padding: 10px 20px 10px 10px; display: inline-block;\">\n          <span class=\"CoveoFieldValue\" data-field=\"@ytvideoduration\" data-helper=\"timeSpan\" data-helper-options-is-milliseconds=\"false\"></span>\n        </div>\n      </div>\n    </div>\n\n  <div class=\"coveo-result-row\" style=\"padding: 20px\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"Date\" data-weight=\"bold\" style=\"margin-bottom: .5em\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\" data-helper-options-always-include-time=\"true\"></div>\n    </div>\n  </div>\n  <div class=\"CoveoCardActionBar\" style=\"margin: auto 0 0 0\">\n    <div class=\"CoveoCardOverlay\" data-title=\"Details\" data-icon=\"search\">\n      <table class=\"CoveoFieldTable\" data-allow-minimization=\"false\">\n        <tbody>\n          <tr data-field=\"@author\" data-caption=\"Author\">\n          </tr>\n          <tr data-field=\"@source\" data-caption=\"Source\">\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"CoveoFollowItem\"></div>\n  </div>\n</div>\n",{"condition":null,"layout":"card","fieldsToMatch":[{"field":"filetype","values":["YoutubeVideo"]}],"mobile":null,"role":null}),true, true)
Coveo.TemplateCache.registerTemplate("CardYouTubePlaylistItem", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\" style=\"padding: 0\">\n  <a class=\"CoveoResultLink\" style=\"text-decoration: none; outline: none\">\n    <div class=\"CoveoBackdrop coveo-result-row\"\n         data-image-field=\"@ytthumbnailurl\"\n         data-overlay-color=\"rgb(38, 62, 85)\"\n         data-overlay-gradient=\"true\">\n      <div style=\"padding: 20px\">\n        <div class=\"coveo-result-row\" style=\"margin-bottom: 15px\">\n          <div class=\"coveo-result-cell\" style=\"width: 32px; flex-grow:0\">\n            <span class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\"></span>\n          </div>\n          <div class=\"coveo-result-cell\" style=\"padding-left: 10px;\">\n            <span class=\"CoveoResultLink\" style=\"color: white\"></span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </a>\n  <div class=\"coveo-result-row\" style=\"padding: 20px\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"Date\" data-weight=\"bold\" style=\"margin-bottom: .5em\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\" data-helper-options-always-include-time=\"true\"></div>\n    </div>\n  </div>\n  <div class=\"CoveoCardActionBar\" style=\"margin: auto 0 0 0\">\n    <div class=\"CoveoQuickview\"></div>\n    <div class=\"CoveoCardOverlay\" data-title=\"Details\" data-icon=\"search\">\n      <table class=\"CoveoFieldTable\" data-allow-minimization=\"false\">\n        <tbody>\n          <tr data-field=\"@author\" data-caption=\"Author\">\n          </tr>\n          <tr data-field=\"@source\" data-caption=\"Source\">\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"CoveoFollowItem\"></div>\n  </div>\n</div>\n",{"condition":null,"layout":"card","fieldsToMatch":[{"field":"filetype","values":["YouTubePlaylistItem"]}],"mobile":null,"role":null}),true, true)
Coveo.TemplateCache.registerTemplate("YouTubePlaylistItem", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"width:220px; padding-top:4px\">\n      <span class=\"CoveoYouTubeThumbnail\">\n      </span>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"font-size:18px\">\n      <a class=\"CoveoResultLink\">\n      </a>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"text-align:right; width:120px;font-size:12px\">\n      <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"dateTime\">\n      </span>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":"list","fieldsToMatch":[{"field":"filetype","values":["YouTubePlaylistItem"]}],"mobile":null,"role":null}),true, true)
Coveo.TemplateCache.registerTemplate("YouTubeVideo", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"width:220px; padding-top:7px\">\n      <span class=\"CoveoYouTubeThumbnail\">\n      </span>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"\">\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"font-size:18px\">\n          <a class=\"CoveoResultLink\">\n          </a>\n        </div>\n        <div class=\"coveo-result-cell\" style=\"text-align:right; width:120px;font-size:12px\">\n          <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"dateTime\">\n          </span>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"padding-top:10px;\">\n          <div class=\"CoveoExcerpt\">\n          </div>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"padding-top:10px;font-size:12px\">\n          <span class=\"CoveoFieldValue\" data-field=\"@ytvideoduration\" data-helper=\"timeSpan\" data-helper-options-is-milliseconds=\"false\">\n          </span>\n          <span class=\"CoveoText\" data-value=\"•\">\n          </span>\n          <span class=\"CoveoFieldValue\" data-field=\"@ytviewcount\">\n          </span>\n          <span class=\"CoveoText\" data-value=\"views\">\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":"list","fieldsToMatch":[{"field":"filetype","values":["YouTubeVideo"]}],"mobile":null,"role":null}),true, true)