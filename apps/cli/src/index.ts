import { intro, outro, text, confirm, select } from '@clack/prompts'
import colors from 'picocolors'

const validateName = (value: string) => {
  if (value.length === 0) return 'Name is required!'
  return undefined
}

const runPromptFlow = async () => {
  console.log()
  intro(colors.bgCyan(colors.white(' wrikka cli ')))

  const name = await text({
    message: 'What is your name?',
    placeholder: 'Anonymous',
    initialValue: 'user',
    validate: validateName,
  })

  const shouldContinue = await confirm({
    message: 'Do you want to continue?',
  })

  if (!shouldContinue) {
    outro(colors.yellow('Operation cancelled.'))
    return false
  }

  await select({
    message: 'Select type',
    options: [
      { value: 'a', label: 'Type A' },
      { value: 'b', label: 'Type B' },
    ],
  })

  outro(colors.green(`Done, ${name}!`))
  return true
}

const main = async () => {
  try {
    await runPromptFlow()
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

main()
