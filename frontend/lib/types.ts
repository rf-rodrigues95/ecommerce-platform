export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number
};

export type User = {
  id: number;
  username: string;
  role: UserRole
}

export type cartItems = {
  cartItemId: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
};

type ImageEntry = {
  light: string;
  dark: string;
  alt: string
}

export const imageMap: { [key: string]: ImageEntry} = {
  imac: {
    light:"https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    alt: "imac image",
  },
  ps5: {
    light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg",
    alt: "imac image"
  },
  applewatch: {
    light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg",
    alt: "imac image"
  },
  ipad: {
    light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg",
    alt: "imac image"
  },
  macbookpro: {
    light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg",
    alt: "imac image"
  },
  iphone: {
    light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
    dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg",
    alt: "imac image"
  }
}
