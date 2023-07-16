import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        // globals: true,
        include: ['test/vitestTest.js'],
        watch: false
    },
});
