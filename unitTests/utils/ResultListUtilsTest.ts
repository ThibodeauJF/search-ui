import * as Mock from '../MockEnvironment';
import { ResultListUtils } from '../../src/utils/ResultListUtils';
import { IResultListOptions } from '../../src/ui/ResultList/ResultListOptions';
import { ResultList } from '../../src/ui/ResultList/ResultList';
import { Component } from '../../src/Core';
import { SearchInterface } from '../../src/ui/SearchInterface/SearchInterface';

export const ResultListUtilsTest = () => {
  describe('ResultListUtils', () => {
    const utils = ResultListUtils;
    let root: SearchInterface;
    let cmp: Component;

    function appendResultListToRoot(options: IResultListOptions = {}, disabled = false) {
      const resultList = Mock.optionsComponentSetup<ResultList, IResultListOptions>(ResultList, options).cmp;
      resultList.disabled = disabled;
      root.element.appendChild(resultList.element);
    }

    function initSearchInterface() {
      root = Mock.basicComponentSetup<SearchInterface>(SearchInterface).cmp;
    }

    function initComponent() {
      const div = document.createElement('div');
      cmp = new Component(div, 'Pager', { searchInterface: root });
    }

    beforeEach(() => initSearchInterface());

    describe(`when a result list with enableInfiniteScroll set to 'false' is appended to the root,
    when initializing a component`, () => {
      beforeEach(() => {
        appendResultListToRoot({ enableInfiniteScroll: false });
        initComponent();
      });

      it('when calling #hideIfInfiniteScrollEnabled, it calls #enable', () => {
        spyOn(cmp, 'enable');
        utils.hideIfInfiniteScrollEnabled(cmp);
        expect(cmp.enable).toHaveBeenCalledTimes(1);
      });

      it(`when calling #hideIfInfiniteScrollEnabled,
      it sets the css display property to an empty string`, () => {
        utils.hideIfInfiniteScrollEnabled(cmp);
        expect(cmp.element.style.display).toBe('');
      });
    });

    describe(`when a result list with enableInfiniteScroll set to 'true' is appended to the root,
    when initializing a component`, () => {
      beforeEach(() => {
        appendResultListToRoot({ enableInfiniteScroll: true });
        initComponent();
      });

      it('when calling #hideIfInfiniteScrollEnabled, it calls #disable', () => {
        spyOn(cmp, 'disable');
        utils.hideIfInfiniteScrollEnabled(cmp);
        expect(cmp.disable).toHaveBeenCalledTimes(1);
      });

      it(`when calling #hideIfInfiniteScrollEnabled,
      it sets the css display property to 'none'`, () => {
        utils.hideIfInfiniteScrollEnabled(cmp);
        expect(cmp.element.style.display).toBe('none');
      });
    });

    it(`when a result list with enableInfiniteScroll set to 'false' is appended to the root,
    when calling #isInfiniteScrollEnabled,
    it returns 'false'`, () => {
      appendResultListToRoot({ enableInfiniteScroll: false });
      expect(utils.isInfiniteScrollEnabled(root.element)).toBe(false);
    });

    it(`when a result list with enableInfiniteScroll set to 'true' is appended to the root,
    when calling #isInfiniteScrollEnabled,
    it returns 'true'`, () => {
      appendResultListToRoot({ enableInfiniteScroll: true });
      expect(utils.isInfiniteScrollEnabled(root.element)).toBe(true);
    });

    it(`when appending a result list where enableInfiniteScroll is 'true' but is disabled,
    when calling #isInfiniteScrollEnabled,
    it returns 'false'`, () => {
      appendResultListToRoot({ enableInfiniteScroll: true }, true);
      expect(utils.isInfiniteScrollEnabled(root.element)).toBe(false);
    });

    describe(`when calling #scrollToTop`, () => {
      let infiniteScrollContainer: HTMLElement;
      let scrollTopSpy: jasmine.Spy;

      beforeEach(() => {
        infiniteScrollContainer = document.createElement('div');
        spyOn(window, 'scrollTo');
        spyOn(infiniteScrollContainer, 'scrollTo');

        let innerValue = 500;
        scrollTopSpy = jasmine.createSpy('scrollTop', v => (innerValue = v));
        Object.defineProperty(infiniteScrollContainer, 'scrollTop', {
          get: () => innerValue,
          set: scrollTopSpy
        });
      });

      it(`with no active result list
      should scroll to top on the window`, () => {
        appendResultListToRoot({ infiniteScrollContainer }, true);
        utils.scrollToTop(root.element);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      });

      it(`with an active result list in a normal browser (not IE11)
      should call the ScrollTo method of the HTMLElement`, () => {
        appendResultListToRoot({ infiniteScrollContainer });

        utils.scrollToTop(root.element);
        expect(infiniteScrollContainer.scrollTo).toHaveBeenCalledWith(0, window.pageYOffset + root.element.getBoundingClientRect().top);
      });

      it(`with an active result list the IE11 browser
      should change the scrollTop property of the scrollContainer`, () => {
        appendResultListToRoot({ infiniteScrollContainer });
        infiniteScrollContainer.scrollTo = undefined;

        utils.scrollToTop(root.element);
        expect(scrollTopSpy).toHaveBeenCalledWith(0);
      });
    });
  });
};
