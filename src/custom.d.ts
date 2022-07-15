declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

declare module '*.png';

declare module '*.gif';