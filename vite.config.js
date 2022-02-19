import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        // globals: true,
        include: ['test/special/vitestTest.js'],
        watch: false
    },
});
