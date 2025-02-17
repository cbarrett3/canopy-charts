import type { QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';

export async function promptForChartConfig(chartName: string) {
  const questions: QuestionCollection = [
    {
      type: 'input',
      name: 'title',
      message: 'Chart title:',
      default: chartName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    },
    {
      type: 'input',
      name: 'description',
      message: 'Chart description:',
      default: `A ${chartName} visualization`
    },
    {
      type: 'confirm',
      name: 'responsive',
      message: 'Make chart responsive?',
      default: true
    }
  ];

  return inquirer.prompt(questions);
}

export async function promptForFramework(yes?: boolean) {
  if (yes) {
    return 'react'; // Default to React in non-interactive mode
  }

  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework are you using?',
      choices: ['react', 'vue', 'svelte', 'vanilla'],
      default: 'react'
    }
  ]);
  return framework;
}
