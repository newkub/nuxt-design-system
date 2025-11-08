import { defineComponentMeta } from '~/composables/useComponentMeta'

export default defineComponentMeta({
  // Required
  id: 'base-button',
  name: 'Button',
  description: 'A versatile button component with multiple variants and sizes',
  category: 'base',
  status: 'stable',
  
  // Tags & Relations
  tags: ['button', 'action', 'interactive', 'form'] as const,
  related: ['base-icon-button', 'base-link'] as const,
  
  // Component API
  props: {
    type: {
      type: 'string',
      required: false,
      default: 'button',
      description: 'HTML button type'
    },
    variant: {
      type: 'string',
      required: false,
      default: 'primary',
      description: 'Button style variant'
    },
    size: {
      type: 'string',
      required: false,
      default: 'md',
      description: 'Button size'
    },
    disabled: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disable the button'
    },
    loading: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show loading spinner'
    },
    fullWidth: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'Full width button'
    },
    icon: {
      type: 'string',
      required: false,
      description: 'Icon to display'
    },
    iconPosition: {
      type: 'string',
      required: false,
      default: 'left',
      description: 'Icon position'
    }
  } as const,
  
  slots: ['default'] as const,
  
  events: {
    click: 'Emitted when button is clicked'
  } as const,
  
  // Examples
  examples: [
    {
      title: 'Primary Button',
      code: '<Button variant="primary">Click me</Button>'
    },
    {
      title: 'Loading State',
      code: '<Button :loading="true">Loading...</Button>'
    },
    {
      title: 'Disabled',
      code: '<Button disabled>Disabled</Button>'
    }
  ] as const
})
