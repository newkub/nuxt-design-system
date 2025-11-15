import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return [
    {
      name: "Base Components",
      components: [
        {
          id: "button",
          name: "Button",
          description: "The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.",
          overview: "Buttons are used to communicate actions that users can take and are typically placed in forms, dialog boxes, and toolbars. Some buttons are specialized for particular tasks, such as navigation or presenting menus.",
          usage: '<WButton variant="primary">Click me</WButton>',
          props: [
            {
              name: "variant",
              type: "'primary' | 'secondary' | 'outline' | 'ghost'",
              default: "'primary'",
              description: "The visual style of the button"
            },
            {
              name: "size",
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: "The size of the button"
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the button is disabled"
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description: "Whether the button shows a loading state"
            }
          ],
          examples: [
            {
              title: "Variants",
              code: '<WButton variant="primary">Primary</WButton>\n<WButton variant="secondary">Secondary</WButton>\n<WButton variant="outline">Outline</WButton>\n<WButton variant="ghost">Ghost</WButton>'
            },
            {
              title: "Sizes",
              code: '<WButton size="sm">Small</WButton>\n<WButton size="md">Medium</WButton>\n<WButton size="lg">Large</WButton>'
            },
            {
              title: "With Icon",
              code: '<WButton>\n  <template #icon>\n    <WIcon name="check" />\n  </template>\n  Confirm\n</WButton>'
            }
          ]
        },
        {
          id: "card",
          name: "Card",
          description: "The Card component is used to display content in a boxed container.",
          overview: "Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information.",
          usage: '<WCard title="Card Title">\n  <p>Card content</p>\n</WCard>',
          props: [
            {
              name: "title",
              type: "string",
              default: "null",
              description: "The title of the card"
            },
            {
              name: "elevated",
              type: "boolean",
              default: "false",
              description: "Whether the card has a shadow"
            },
            {
              name: "bordered",
              type: "boolean",
              default: "false",
              description: "Whether the card has a border"
            }
          ],
          examples: [
            {
              title: "Basic Card",
              code: '<WCard title="Card Title">\n  <p>This is a basic card component.</p>\n</WCard>'
            },
            {
              title: "Elevated Card",
              code: '<WCard title="Card Title" elevated>\n  <p>This card has a shadow.</p>\n</WCard>'
            }
          ]
        },
        {
          id: "typography",
          name: "Typography",
          description: "Typography components for consistent text rendering.",
          overview: "Typography components ensure consistent text styles across your application.",
          usage: '<WHeading level="1">Heading 1</WHeading>\n<WText>Body text</WText>',
          props: [
            {
              name: "level",
              type: "1 | 2 | 3 | 4 | 5 | 6",
              default: "1",
              description: "The heading level (for WHeading component)"
            },
            {
              name: "variant",
              type: "'body' | 'caption' | 'lead'",
              default: "'body'",
              description: "The text variant (for WText component)"
            }
          ],
          examples: [
            {
              title: "Headings",
              code: '<WHeading level="1">Heading 1</WHeading>\n<WHeading level="2">Heading 2</WHeading>\n<WHeading level="3">Heading 3</WHeading>'
            },
            {
              title: "Text Variants",
              code: '<WText variant="body">Body text</WText>\n<WText variant="caption">Caption text</WText>\n<WText variant="lead">Lead text</WText>'
            }
          ]
        }
      ]
    },
    {
      name: "Form Components",
      components: [
        {
          id: "input",
          name: "Input",
          description: "The Input component is used for text input fields.",
          overview: "Input components are used to capture user input. They come in various styles and can be customized with different attributes.",
          usage: '<WInput placeholder="Enter text" />',
          props: [
            {
              name: "placeholder",
              type: "string",
              default: "null",
              description: "Placeholder text for the input"
            },
            {
              name: "type",
              type: "string",
              default: "'text'",
              description: "Type of input (text, password, email, etc.)"
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the input is disabled"
            },
            {
              name: "readonly",
              type: "boolean",
              default: "false",
              description: "Whether the input is read-only"
            }
          ],
          examples: [
            {
              title: "Input Types",
              code: '<WInput type="text" placeholder="Text input" />\n<WInput type="password" placeholder="Password input" />\n<WInput type="email" placeholder="Email input" />'
            },
            {
              title: "Disabled Input",
              code: '<WInput placeholder="Disabled input" disabled />'
            }
          ]
        },
        {
          id: "select",
          name: "Select",
          description: "The Select component is used for selecting from a list of options.",
          overview: "Select components allow users to choose one option from a dropdown list.",
          usage: '<WSelect :options="options" placeholder="Select an option" />',
          props: [
            {
              name: "options",
              type: "Array<{ label: string; value: string }>",
              default: "[]",
              description: "The available options"
            },
            {
              name: "placeholder",
              type: "string",
              default: "null",
              description: "Placeholder text for the select"
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the select is disabled"
            }
          ],
          examples: [
            {
              title: "Basic Select",
              code: '<WSelect \n  :options="[\n    { label: \'Option 1\', value: \'1\' },\n    { label: \'Option 2\', value: \'2\' },\n    { label: \'Option 3\', value: \'3\' }\n  ]" \n  placeholder="Select an option" \n/>'
            }
          ]
        },
        {
          id: "checkbox",
          name: "Checkbox",
          description: "The Checkbox component is used for selecting multiple options.",
          overview: "Checkboxes allow users to select one or more options from a set.",
          usage: '<WCheckbox v-model="checked">Label</WCheckbox>',
          props: [
            {
              name: "modelValue",
              type: "boolean",
              default: "false",
              description: "The checked state of the checkbox"
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the checkbox is disabled"
            },
            {
              name: "indeterminate",
              type: "boolean",
              default: "false",
              description: "Whether the checkbox is in an indeterminate state"
            }
          ],
          examples: [
            {
              title: "Basic Checkbox",
              code: '<WCheckbox v-model="checked">Accept terms and conditions</WCheckbox>'
            },
            {
              title: "Disabled Checkbox",
              code: '<WCheckbox v-model="checked" disabled>Disabled checkbox</WCheckbox>'
            }
          ]
        }
      ]
    },
    {
      name: "Navigation",
      components: [
        {
          id: "navbar",
          name: "Navbar",
          description: "The Navbar component provides top-level navigation for your application.",
          overview: "Navbars are responsive navigation headers that include support for branding, navigation, and more.",
          usage: '<WNavbar>\n  <template #brand>\n    <div>Brand</div>\n  </template>\n  <template #menu>\n    <div>\n      <a>Home</a>\n      <a>About</a>\n    </div>\n  </template>\n</WNavbar>',
          props: [
            {
              name: "sticky",
              type: "boolean",
              default: "false",
              description: "Whether the navbar sticks to the top"
            },
            {
              name: "transparent",
              type: "boolean",
              default: "false",
              description: "Whether the navbar is transparent"
            }
          ],
          examples: [
            {
              title: "Basic Navbar",
              code: '<WNavbar>\n  <template #brand>\n    <div>My App</div>\n  </template>\n  <template #menu>\n    <div>\n      <a>Home</a>\n      <a>About</a>\n      <a>Contact</a>\n    </div>\n  </template>\n</WNavbar>'
            }
          ]
        },
        {
          id: "sidebar",
          name: "Sidebar",
          description: "The Sidebar component provides side navigation for your application.",
          overview: "Sidebars are vertical navigation panels that can be toggled or permanently visible.",
          usage: '<WSidebar>\n  <a>\n    <span class="sidebar-item-icon">\n      <WIcon name="dashboard" />\n    </span>\n    <span class="sidebar-item-label">Dashboard</span>\n  </a>\n  <a>\n    <span class="sidebar-item-icon">\n      <WIcon name="user" />\n    </span>\n    <span class="sidebar-item-label">Profile</span>\n  </a>\n</WSidebar>',
          props: [
            {
              name: "collapsed",
              type: "boolean",
              default: "false",
              description: "Whether the sidebar is collapsed"
            },
            {
              name: "width",
              type: "string",
              default: "'250px'",
              description: "The width of the sidebar"
            }
          ],
          examples: [
            {
              title: "Basic Sidebar",
              code: '<WSidebar>\n  <a>\n    <span class="sidebar-item-icon">\n      <WIcon name="dashboard" />\n    </span>\n    <span class="sidebar-item-label">Dashboard</span>\n  </a>\n  <a>\n    <span class="sidebar-item-icon">\n      <WIcon name="user" />\n    </span>\n    <span class="sidebar-item-label">Profile</span>\n  </a>\n</WSidebar>'
            }
          ]
        }
      ]
    }
  ]
})