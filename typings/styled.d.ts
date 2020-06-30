// See docs: https://styled-components.com/docs/api#typescript
// import original module declarations
import 'styled-components';

// and extend
declare module 'styled-components' {
  export interface DefaultTheme {
    /**
     * Defines the color palette tokens.
     * Key should be uppercase
     */
    palette: {
      [key: string]: string;
    };
  }
}
