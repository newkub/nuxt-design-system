import { ReexportGenerator } from './generator'

const generator = new ReexportGenerator({
  basePath: 'app/components',
  folders: [
    'auth',
    'base',
    'canvas',
    'chart',
    'data',
    'developer',
    'display',
    'feedback',
    'form',
    'layout',
    'media',
    'navigation',
    'ui'
  ],
  verbose: true,
  generateRootIndex: true,
  rootIndexPath: 'app'
})

generator.generateAll()
