/**
 * @example
 * const cancel = render(time => {
 *   // render frame
 * })
 * cancel()
 * */
export const render = (cb: FrameRequestCallback): () => void => {
  let raf: number
  
  const frame: FrameRequestCallback = (time) => {
    cb(time)
    raf = requestAnimationFrame(frame)
  }
  
  raf = requestAnimationFrame(frame)
  
  return () => cancelAnimationFrame(raf)
}
