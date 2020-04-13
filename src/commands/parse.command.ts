import { Console, Command, createSpinner } from 'nestjs-console';
import { Crash } from '../entities/crash.entity'
import { Connection } from 'typeorm';
import parser = require('papaparse');
import moment = require('moment');
import fs = require('fs');

@Console()
export class ParseCommand {

  constructor(
    private connection: Connection,
  ) {}

  @Command({
    command: 'parse <filePath>',
    description: 'Parse CSV file',
  })
  async parse(filePath: string): Promise<void> {
    // const spin = createSpinner();
    // spin.start(`Processing file ${filePath}`);

    await this.parseCsv(filePath);

    // spin.succeed(`File processed!`);
  }

  async parseCsv(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const csvFile = fs.createReadStream(filePath, { encoding: 'latin1' });

      parser.parse(csvFile, {
        header: true,
        worker: true,
        encoding: 'latin1',
        delimiter: ';',
        complete: (res: Array<string>) => {
          res['data'].forEach((record: Array<string>) => {
            this.storeCrash(record);
          });
          resolve();
        },
        error: (...args) => {
          console.log('error', args);
          reject(args);
        },
      });
    });
  }

  async storeCrash(data: Array<string>) {
    const crash = new Crash();
    crash.expId = data['Nº  EXPEDIENTE'];
    crash.datetime = moment(data['FECHA'] + ' ' + data['HORA'], "DD/MM/YYYY H:m");
    crash.street = data['CALLE'];
    crash.number = data['NÚMERO'];
    crash.district = data['DISTRITO'];
    crash.type = data['TIPO ACCIDENTE'];
    crash.weather = data['ESTADO METEREOLÓGICO'];
    crash.vehicle = data['TIPO VEHÍCULO'];
    crash.driver = data['TIPO PERSONA'];
    crash.age_range = data['RANGO DE EDAD'];
    crash.gender = data['SEXO'];
    crash.severity = data['LESIVIDAD*'];

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log('2');
    try {
      await queryRunner.manager.save(crash);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
