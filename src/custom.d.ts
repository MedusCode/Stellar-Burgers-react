declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare module '*.png';

declare module '*.gif';