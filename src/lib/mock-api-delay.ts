export function mockApiDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
