// Fallback global JSX declaration: allows intrinsic elements when TS can't find React's JSX types.
// This relaxes typings but resolves editor/build errors where `JSX.IntrinsicElements` is missing.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
