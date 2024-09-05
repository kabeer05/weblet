export default [
  {
    name: "javascript",
    code: `console.log('Hello, World!')`,
    extension: "js",
  },
  {
    name: "python",
    code: `print('Hello, World!')`,
    extension: "py",
  },
  {
    name: "java",
    code: `class Main {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }`,
    extension: "java",
  },
  {
    name: "c",
    code: `#include <stdio.h>
            int main() {
                printf("Hello, World!");
                return 0;
            }`,
    extension: "c",
  },
  {
    name: "cpp",
    code: `#include <iostream>
            int main() {
                std::cout << "Hello, World!";
                return 0;
            }`,
    extension: "cpp",
  },
];
