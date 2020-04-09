import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

// import pkg from './package.json'

export default {
  input: {
    index: 'src/index.js',
    validators: 'src/utils/validators.js',
  },
  output: [
    { dir: 'lib', format: 'cjs' },
    { dir: 'es', format: 'es' },
  ],
  plugins: [
    external(),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
}
