import {Category, CategoryConfiguration, CategoryServiceFactory, LogLevel} from "typescript-logging";

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));
export const routeLogging = new Category("ROUTER", null);
export const HTMLLogging = new Category("HTML", null);
export const DatabaseLogging = new Category("Database", null);
