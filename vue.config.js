module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/settings/_module-settings";`
      }
    }
  }
}
