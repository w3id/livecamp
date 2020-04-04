
const production = !process.env.ROLLUP_WATCH;
import { terser } from "rollup-plugin-terser";
export default {
    input: [
        'src/t-shell.js',
        'src/routes/t-home.js'
    ],
    output: {
        dir:'dist',
        format: 'esm'
    },
    plugins: [
		production && terser() // minify, but only in production
	]
  };