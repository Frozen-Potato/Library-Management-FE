import { defineConfig } from "../defineConfig"

export function developmentConfig() {
    return defineConfig({
        dataAPI: "http://localhost:3000/api/v1/",
        landingURL : "/"
    })
}