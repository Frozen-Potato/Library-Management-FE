import { developmentConfig } from "./env/development";
import { productionConfig } from "./env/production";
import { testConfig } from "./env/test";

export const config = getConfig();

function getConfig() {
    switch (process.env.NODE_ENV) {
        case "development":
            return developmentConfig();
        case "test":
            return testConfig();
        case "production":
            return productionConfig();
        default:
            throw new Error(`Invalid Env`);
    }
}