import { Utils } from './Utils';
import { QueryStateModel, QueryEvents, Component, $$ } from '../Core';
import { ComponentEvents } from '../ui/Base/Component';
import { MODEL_EVENTS } from '../models/Model';
import { ComponentsTypes } from './ComponentsTypes';

export interface IDependentFacet {
  reset: () => void;
  toggleDependentFacet: (dependentFacet: Component) => void;
  element: HTMLElement;
  root: HTMLElement;
  dependsOn: string;
  id: string;
  queryStateModel: QueryStateModel;
  bind: ComponentEvents;
}

export class DependsOnManager {
  constructor(private facet: IDependentFacet) {
    this.facet.bind.onRootElement(QueryEvents.newQuery, () => this.handleNewQuery());
    this.updateVisibilityBasedOnDependsOn();
  }

  public listenToParentIfDependentFacet() {
    if (!this.isDependentFacet) {
      return;
    }
    this.facet.bind.onQueryState(MODEL_EVENTS.CHANGE, undefined, () => this.resetIfParentFacetHasNoSelectedValues());
  }

  public updateVisibilityBasedOnDependsOn() {
    if (!this.isDependentFacet) {
      return;
    }

    $$(this.facet.element).toggleClass('coveo-hidden', !this.parentFacetHasSelectedValues);
  }

  private get isDependentFacet() {
    return Utils.isNonEmptyString(this.facetDependsOnField);
  }

  private get facetDependsOnField() {
    return this.facet.dependsOn;
  }

  private resetIfParentFacetHasNoSelectedValues() {
    if (this.parentFacetHasSelectedValues) {
      return;
    }

    this.facet.reset();
  }

  private get parentFacetHasSelectedValues() {
    const parentSelectedValuesId = QueryStateModel.getFacetId(this.facetDependsOnField);
    return this.valuesExistForFacetWithId(parentSelectedValuesId);
  }

  private valuesExistForFacetWithId(id: string) {
    const values = this.facet.queryStateModel.get(id);
    return values != null && values.length != 0;
  }

  private handleNewQuery() {
    const allFacets = ComponentsTypes.getAllFacetsInstance(this.facet.root);
    const dependentFacets = allFacets.filter(facet => {
      return this.facet.id === facet.options.dependsOn;
    });

    dependentFacets.forEach(dependentFacet => {
      this.facet.toggleDependentFacet(dependentFacet);
    });
  }
}
