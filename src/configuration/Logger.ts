// @ts-ignore
import {Category, CategoryConfiguration, CategoryServiceFactory, LogLevel} from "typescript-logging";

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));
// @ts-ignore
export const catService = new Category("service");
// @ts-ignore
export const prod = new Category("product", catService);
// @ts-ignore
