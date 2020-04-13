import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Crash {

  @PrimaryColumn()
  expId: string;

  @Column({ type: 'datetime' })
  datetime;

  @Column('varchar', { length: 150, default: '-' })
  street: string;

  @Column('varchar', { length: 5, default: '-' })
  number: string;

  @Column('varchar', { length: 5, default: '-' })
  district: string;

  @Column('varchar', { length: 60, default: '-' })
  type: string;

  @Column('varchar', { length: 20, default: '-' })
  weather: string;

  @Column('varchar', { length: 20, default: '-' })
  vehicle: string;

  @Column('varchar', { length: 20, default: '-' })
  driver: string;

  @Column('varchar', { length: 30, default: '-' })
  age_range: string;

  @Column('varchar', { length: 6, default: '-' })
  gender: string;

  @Column('varchar', { length: 2, default: '01' })
  severity: string;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}
