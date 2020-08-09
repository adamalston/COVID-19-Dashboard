/**
 * isDomAvailable
 * @description Checks to see if the DOM is available by checking the existence of the window and document
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js#L12
 */

export function isDomAvailable() {
  return typeof window !== 'undefined' && !!window.document && !!window.document.createElement;
}
export function formatNum( value ) {
  return value.toLocaleString( 'en-US' );
}

export function formatDate( value ) {
  const date = new Date( value );
  return date.toLocaleString( 'en-US' );
}
