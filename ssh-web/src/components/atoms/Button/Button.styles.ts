import { tv } from "tailwind-variants";

// primary, secondary 등 palette 정의되면 스타일 수정해야함
const variants = {
  blue: {
    normal: "bg-blue-500 hover:bg-blue-400 active:bg-blue-700 text-white",
    outlined:
      "border-2 border-blue-500 hover:border-blue-600 active:border-blue-700 text-blue-500 hover:text-blue-700 active:text-blue-900 hover:bg-blue-50 active:bg-blue-100",
  },

  gray: {
    normal: "bg-gray-500 hover:bg-gray-400 active:bg-gray-600 text-white",
    outlined:
      "border-2 border-gray-500 hover:border-gray-600 active:border-gray-700 text-gray-500 hover:text-gray-700 active:text-gray-900 hover:bg-gray-50 active:bg-gray-100",
  },
  none: {
    normal: "bg-transparent",
    outlined: "border-2 border-transparent hover:border-gray-200 active:border-gray-400",
  },
};

export const buttonStyles = tv({
  base: "w-max flex items-center justify-center rounded-md focus:outline-none transition duration-500 shadow-sm hover:shadow-md active:shadow-sm",
  variants: {
    bg: {
      blue: variants.blue.normal,
      gray: variants.gray.normal,
      none: variants.none.normal,
    },
    borderColor: {
      blue: variants.blue.outlined,
      gray: variants.gray.outlined,
      none: variants.none.outlined,
    },
    text: {
      blue: variants.blue.normal,
      gray: variants.gray.normal,
      outlined_blue: variants.blue.outlined,
      outlined_gray: variants.gray.outlined,
      none: "",
    },
    size: {
      sm: "px-3 py-2 text-sm max-h-10",
      md: "px-4 py-2 max-h-12",
      lg: "px-6 py-3 max-h-14 text-lg",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    fullWidth: {
      true: "w-full",
      false: "w-max",
    },
  },
  defaultVariants: {
    size: "md",
    bg: "blue",
    rounded: false,
    fullWidth: false,
  },
});
