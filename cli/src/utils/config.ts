import fs from 'fs-extra';
import path from 'path';
import { CONFIG_FILES } from './constants';

export async function getConfig() {
  const cwd = process.cwd();
  
  // Try each possible config file name
  for (const configFile of CONFIG_FILES) {
    const configPath = path.join(cwd, configFile);
    
    if (await fs.pathExists(configPath)) {
      try {
        if (configFile.endsWith('.json')) {
          const content = await fs.readJson(configPath);
          return content;
        } else {
          // For .js and .cjs files
          const content = require(configPath);
          return content;
        }
      } catch (error) {
        console.error(`Error reading config file ${configFile}:`, error);
      }
    }
  }
  
  return null;
}
