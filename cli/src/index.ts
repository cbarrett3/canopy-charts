#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./commands/add"
import { init } from "./commands/init"
import chalk from "chalk"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("canopy-charts")
    .description("Beautiful D3 charts for modern web apps")
    .version("1.0.0")

  program
    .command("init")
    .description("Initialize Canopy Charts in your project")
    .option("-y, --yes", "Skip confirmation prompt")
    .action(init)

  program
    .command("add <chart>")
    .description("Add a chart to your project")
    .option("-y, --yes", "Skip confirmation prompt")
    .option("-o, --overwrite", "Overwrite existing files")
    .action(add)

  program.addHelpText("afterAll", `
${chalk.bold("Examples:")}

  ${chalk.dim("$")} npx canopy-charts@latest init
  ${chalk.dim("$")} npx canopy-charts@latest add line-chart
  ${chalk.dim("$")} npx canopy-charts@latest add bar-chart --overwrite
`)

  await program.parseAsync(process.argv)
}

main().catch((error) => {
  console.error(chalk.red("Error:"), error.message)
  process.exit(1)
})
