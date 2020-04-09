export const required = () => v => !!v

/* String detection */
export const email = () => v =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)

/* Input Length */
export const minlen = compareTo => v => v && v.length >= compareTo
export const maxlen = compareTo => v => v && v.length <= compareTo

/* Input value comparators */
export const equal = compareTo => v => v && v === compareTo
export const gt = compareTo => v => v > compareTo
export const lt = compareTo => v => v < compareTo
export const gte = compareTo => v => v >= compareTo
export const lte = compareTo => v => v <= compareTo
export const notEqual = compareTo => v => v && v.length !== compareTo
