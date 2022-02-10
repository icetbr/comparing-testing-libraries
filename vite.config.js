import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        // globals: true,
        include: ['test/employeeVitestTest.js'],
        watch: false
    },
});
