import type { Component, DefineComponent } from 'vue';
export type CatalogEntry = Component | DefineComponent | (() => Promise<{
    default: Component;
}>);
export interface Catalog {
    [key: string]: CatalogEntry;
}
export declare const DEFAULT_CATALOG: Catalog;
export declare function registerStandardComponents(catalog: Catalog): void;
