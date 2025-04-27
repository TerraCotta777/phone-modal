import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import { readFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ 
      file: "dist/types/index.d.ts",
      format: "es"
    }],
    plugins: [dts()],
  },
];
