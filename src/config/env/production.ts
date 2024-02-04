import { defineConfig } from "../defineConfig"

export function productionConfig() {
    return defineConfig({
        dataAPI: "https://library-management-system-api-172j.onrender.com/api/v1/",
        landingURL : "/fs16-front-end-lib/"
    })
}