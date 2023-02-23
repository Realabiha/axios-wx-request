let cancel
export default function () {
  return {
    cancelPromise: new Promise((resolve, reject) => {
      cancel = resolve
    }),
    cancelFunc() {
      cancel()
    }
  }
}