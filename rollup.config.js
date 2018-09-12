import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
    input: 'dist/src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        strict: false,
        banner: '#! /usr/bin/env node\n',
    },
    plugins: [resolve(), json(), commonjs({
        namedExports: {
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            'node_modules/turbocolor/index.js': ['dim']
        }
    })],
    external: [
        'child_process',
        'fs',
        'path',
        'os',
        'https',
        'readline',
        'zlib',
        'events',
        'stream',
        'util',
        'buffer'
    ]
};