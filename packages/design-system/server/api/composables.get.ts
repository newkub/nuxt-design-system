import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return [
    {
      name: "State",
      composables: [
        {
          id: "useCounter",
          name: "useCounter",
          description: "A composable for managing a counter state with increment, decrement, and reset functionality.",
          overview: "The useCounter composable provides a simple way to manage a numeric counter state. It returns reactive state and methods to manipulate the counter value.",
          usage: 'import { useCounter } from "@wrikka/ui"\n\nconst { count, inc, dec, set, reset } = useCounter(1)',
          parameters: [
            {
              name: "initialValue",
              type: "number",
              default: "0",
              description: "The initial value of the counter"
            }
          ],
          returns: [
            {
              name: "count",
              type: "Ref<number>",
              description: "The current counter value"
            },
            {
              name: "inc",
              type: "Function",
              description: "Increments the counter by 1 or a specified amount"
            },
            {
              name: "dec",
              type: "Function",
              description: "Decrements the counter by 1 or a specified amount"
            },
            {
              name: "set",
              type: "Function",
              description: "Sets the counter to a specific value"
            },
            {
              name: "reset",
              type: "Function",
              description: "Resets the counter to its initial value"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useCounter } from "@wrikka/ui"\n\nconst { count, inc, dec, reset } = useCounter()\n</script>\n\n<template>\n  <div>\n    <p>Count: {{ count }}</p>\n    <button @click="inc()">Increment</button>\n    <button @click="dec()">Decrement</button>\n    <button @click="reset()">Reset</button>\n  </div>\n</template>'
            },
            {
              title: "With Custom Initial Value",
              code: 'const { count, inc, dec } = useCounter(10)'
            },
            {
              title: "With Custom Increment/Decrement Amount",
              code: 'const { count, inc, dec } = useCounter(0)\n\n// Increment by 5\ninc(5)\n\n// Decrement by 3\ndec(3)'
            }
          ]
        },
        {
          id: "useState",
          name: "useState",
          description: "A composable for managing local component state.",
          overview: "The useState composable provides a way to manage reactive state in your components. It's similar to Vue's built-in ref but with additional features.",
          usage: 'import { useState } from "@wrikka/ui"\n\nconst [state, setState] = useState(initialValue)',
          parameters: [
            {
              name: "initialValue",
              type: "any",
              default: "undefined",
              description: "The initial value of the state"
            }
          ],
          returns: [
            {
              name: "state",
              type: "Ref<any>",
              description: "The current state value"
            },
            {
              name: "setState",
              type: "Function",
              description: "Function to update the state value"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useState } from "@wrikka/ui"\n\nconst [name, setName] = useState("")\n</script>\n\n<template>\n  <div>\n    <input v-model="name" placeholder="Enter your name" />\n    <p>Hello, {{ name }}!</p>\n  </div>\n</template>'
            }
          ]
        }
      ]
    },
    {
      name: "Utilities",
      composables: [
        {
          id: "useClipboard",
          name: "useClipboard",
          description: "A composable for copying text to the clipboard.",
          overview: "The useClipboard composable provides an easy way to copy text to the user's clipboard and track the copy operation status.",
          usage: 'import { useClipboard } from "@wrikka/ui"\n\nconst { copy, copied, text } = useClipboard()',
          parameters: [],
          returns: [
            {
              name: "copy",
              type: "Function",
              description: "Function to copy text to clipboard"
            },
            {
              name: "copied",
              type: "Ref<boolean>",
              description: "Reactive flag indicating if text was copied"
            },
            {
              name: "text",
              type: "Ref<string>",
              description: "The text that was copied"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useClipboard } from "@wrikka/ui"\n\nconst { copy, copied } = useClipboard()\nconst source = ref("Hello, world!")\n</script>\n\n<template>\n  <div>\n    <input v-model="source" />\n    <button @click="copy(source)">\n      {{ copied ? "Copied!" : "Copy" }}\n    </button>\n  </div>\n</template>'
            }
          ]
        },
        {
          id: "useDark",
          name: "useDark",
          description: "A composable for toggling dark mode in your application.",
          overview: "The useDark composable provides a simple way to implement dark mode functionality in your application with automatic persistence.",
          usage: 'import { useDark } from "@wrikka/ui"\n\nconst { isDark, toggleDark } = useDark()',
          parameters: [],
          returns: [
            {
              name: "isDark",
              type: "Ref<boolean>",
              description: "Reactive flag indicating if dark mode is enabled"
            },
            {
              name: "toggleDark",
              type: "Function",
              description: "Function to toggle dark mode"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useDark } from "@wrikka/ui"\n\nconst { isDark, toggleDark } = useDark()\n</script>\n\n<template>\n  <div>\n    <button @click="toggleDark">\n      {{ isDark ? "Switch to Light Mode" : "Switch to Dark Mode" }}\n    </button>\n  </div>\n</template>'
            }
          ]
        },
        {
          id: "useFetch",
          name: "useFetch",
          description: "A composable for making HTTP requests with automatic loading and error states.",
          overview: "The useFetch composable provides a convenient way to fetch data from APIs with built-in loading and error handling.",
          usage: 'import { useFetch } from "@wrikka/ui"\n\nconst { data, pending, error, refresh } = useFetch(url)',
          parameters: [
            {
              name: "url",
              type: "string",
              default: "",
              description: "The URL to fetch data from"
            },
            {
              name: "options",
              type: "object",
              default: "{}",
              description: "Fetch options (method, headers, etc.)"
            }
          ],
          returns: [
            {
              name: "data",
              type: "Ref<any>",
              description: "The fetched data"
            },
            {
              name: "pending",
              type: "Ref<boolean>",
              description: "Reactive flag indicating if request is in progress"
            },
            {
              name: "error",
              type: "Ref<Error|null>",
              description: "Error object if request failed"
            },
            {
              name: "refresh",
              type: "Function",
              description: "Function to refresh the data"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useFetch } from "@wrikka/ui"\n\nconst { data, pending, error } = useFetch("/api/users")\n</script>\n\n<template>\n  <div>\n    <div v-if="pending">Loading...</div>\n    <div v-else-if="error">Error: {{ error.message }}</div>\n    <div v-else>\n      <ul>\n        <li v-for="user in data" :key="user.id">\n          {{ user.name }}\n        </li>\n      </ul>\n    </div>\n  </div>\n</template>'
            }
          ]
        }
      ]
    },
    {
      name: "Sensors",
      composables: [
        {
          id: "useMouse",
          name: "useMouse",
          description: "A composable for tracking mouse position.",
          overview: "The useMouse composable provides reactive mouse position tracking within a specified element or the entire document.",
          usage: 'import { useMouse } from "@wrikka/ui"\n\nconst { x, y } = useMouse()',
          parameters: [
            {
              name: "target",
              type: "HTMLElement | Ref<HTMLElement> | Window",
              default: "window",
              description: "The target element to track mouse position in"
            }
          ],
          returns: [
            {
              name: "x",
              type: "Ref<number>",
              description: "The X coordinate of the mouse"
            },
            {
              name: "y",
              type: "Ref<number>",
              description: "The Y coordinate of the mouse"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useMouse } from "@wrikka/ui"\n\nconst { x, y } = useMouse()\n</script>\n\n<template>\n  <div>\n    <p>Mouse position: {{ x }}, {{ y }}</p>\n  </div>\n</template>'
            }
          ]
        },
        {
          id: "useWindowSize",
          name: "useWindowSize",
          description: "A composable for tracking window size changes.",
          overview: "The useWindowSize composable provides reactive window dimensions that update when the window is resized.",
          usage: 'import { useWindowSize } from "@wrikka/ui"\n\nconst { width, height } = useWindowSize()',
          parameters: [],
          returns: [
            {
              name: "width",
              type: "Ref<number>",
              description: "The current window width"
            },
            {
              name: "height",
              type: "Ref<number>",
              description: "The current window height"
            }
          ],
          examples: [
            {
              title: "Basic Usage",
              code: '<script setup>\nimport { useWindowSize } from "@wrikka/ui"\n\nconst { width, height } = useWindowSize()\n</script>\n\n<template>\n  <div>\n    <p>Window size: {{ width }} x {{ height }}</p>\n  </div>\n</template>'
            }
          ]
        }
      ]
    }
  ]
})