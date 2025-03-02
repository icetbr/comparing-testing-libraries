import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        isolate: false,
        fileParallelism: false,
        include: ['test/vitestTest.js'],
        watch: false,
    }
});
