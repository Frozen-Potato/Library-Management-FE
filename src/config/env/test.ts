import { defineConfig } from "../defineConfig"

export function testConfig() {
    return defineConfig({
        dataAPI: "http://localhost:3000/api/v1/",
        landingURL : "/"
    })
}