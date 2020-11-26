import typescript from "rollup-plugin-typescript2"
import url from 'rollup-plugin-url'
import pkg from "./package.json"
import {terser} from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.tsx";
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  typescript(),
  postcss({extract: 'styles/Caveat.css'}),
  url({
    limit: 5 * 1024, // inline files smaller than 5k
    publicPath: '',
    include: [
      '**/*.svg',
      '**/*.png',
      '**/*.jpg',
      '**/*.gif',
      '**/*.woff',
      '**/*.woff2',
    ],
    emitFiles: true,
  }),
  terser()
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
];
