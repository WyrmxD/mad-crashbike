import { Console, Command, createSpinner } from 'nestjs-console';
import fs = require('fs');
import https = require('https');

@Console()
export class DataCommand {
  readonly downloadFolder = './downloads';
  readonly baseUrl = 'https://datos.madrid.es/egobfiles/MANUAL/300110';
  readonly fileName = 'AccidentesBicicletas_2020.csv';

  @Command({
    command: 'download',
    description: 'Downloads data CSV file',
  })
  async download(): Promise<void> {
    const spin = createSpinner();
    spin.start(`Downloading CSV file ${this.fileName}`);

    await this.downloadCsv();

    spin.succeed(`Downloaded! ${this.downloadFolder}/${this.fileName}`);
  }

  downloadCsv(): Promise<void> {
    return new Promise((resolve, reject) => {
      https.get(`${this.baseUrl}/${this.fileName}`, response => {
        if (response.statusCode !== 200) {
          reject('Download error');
        }

        const file = fs.createWriteStream(
          `${this.downloadFolder}/${this.fileName}`,
        );
        response.pipe(file);

        file.on('error', () => {
          reject('Error writing to file!');
        });

        file.on('finish', () => {
          file.close();
          resolve();
        });
      });
    });
  }
}
