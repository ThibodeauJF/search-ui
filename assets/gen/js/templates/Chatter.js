Coveo.TemplateCache.registerTemplate("CardChatter", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"width: 32px; vertical-align: middle;\">\n      <div class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\">\n      </div>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"text-align:left; padding-left: 10px; vertical-align: middle;\">\n      <a class=\"CoveoResultLink\"></a>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\" style=\"padding-top: 10px;\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"Date\" data-weight=\"bold\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\" data-helper-options-always-include-time=\"true\"></div>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"vertical-align:middle\">\n      <span class=\"CoveoChatterPostedBy\">\n      </span>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-top:5px;\">\n      <span class=\"CoveoChatterLikedBy\" data-nb-likes-to-render=\"1\">\n      </span>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-bottom:5px\">\n      <span class=\"CoveoChatterPostAttachment\">\n      </span>\n    </div>\n  </div>\n  <div class=\"CoveoCardActionBar\">\n    <div class=\"CoveoQuickview\"></div>\n    <div class=\"CoveoCardOverlay\" data-title=\"Replies\" data-icon=\"coveo-sprites-replies\">\n      <span class=\"CoveoResultFolding\" data-result-template-id=\"FeedComment\">\n      </span>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":"card","fieldsToMatch":[{"field":"objecttype","values":["FeedItem","FeedComment"]}],"mobile":null}),true, true)
Coveo.TemplateCache.registerTemplate("Chatter", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"width:85px; text-align:center; padding-top:5px\">\n      <span class=\"CoveoIcon\">\n      </span>\n      <div class=\"CoveoQuickview\">\n      </div>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"padding-left:15px\">\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"font-size:13px\">\n          <span class=\"CoveoChatterPostedBy\">\n          </span>\n        </div>\n        <div class=\"coveo-result-cell\" style=\"width:120px;text-align:right;font-size:12px\">\n          <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"date\">\n          </span>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"font-size:18px; padding-top:5px; padding-bottom:5px\">\n          <a class=\"CoveoResultLink\">\n          </a>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"padding-bottom:5px; padding-top:5px; font-size:13px;\">\n          <span class=\"CoveoChatterLikedBy\" data-nb-likes-to-render=\"1\">\n          </span>\n        </div>\n      </div>\n      <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px; font-size:13px;\">\n          <span class=\"CoveoChatterPostAttachment\">\n          </span>\n          <span class=\"CoveoResultFolding\" data-result-template-id=\"FeedComment\">\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":"list","fieldsToMatch":[{"field":"objecttype","values":["FeedItem","FeedComment"]}],"mobile":null}),true, true)
Coveo.TemplateCache.registerTemplate("FeedComment", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n    <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"width:50px;text-align:center\">\n            <span class=\"CoveoIcon\" data-small=\"true\"></span>\n            <div class=\"CoveoQuickview\"></div>\n        </div>\n        <div class=\"coveo-result-cell\">\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"font-size:13px\">\n                    <span class=\"CoveoChatterPostedBy\"></span>\n                </div>\n                <div class=\"coveo-result-cell\" style=\"width:120px;text-align:right;font-size:12px\">\n                    <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"date\"></span>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"font-size:18px; padding-top:5px; padding-bottom:5px\">\n                    <a class=\"CoveoResultLink\"></a>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"padding-bottom:5px; padding-top:5px\">\n                    <span class=\"CoveoChatterLikedBy\" data-nb-likes-to-render=\"1\"></span>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n                    <span class=\"CoveoChatterPostAttachment\"></span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",{"condition":null,"layout":null,"fieldsToMatch":null,"mobile":null}),false, false)