/**
 * @example
 * ```ts
 * const cancel = fRender(time => {
 *   // render frame
 * })
 * cancel()
 * ```
 * */
export const fRender = (cb: FrameRequestCallback): () => void => {
  let raf: number

  const frame: FrameRequestCallback = (time) => {
    cb(time)
    raf = requestAnimationFrame(frame)
  }

  raf = requestAnimationFrame(frame)

  return () => cancelAnimationFrame(raf)
}
