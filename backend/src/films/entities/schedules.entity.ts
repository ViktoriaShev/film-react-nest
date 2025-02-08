import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Films } from './films.entity';

@Entity('schedules')
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  daytime: string;

  @Column('integer', { nullable: false })
  hall: number;

  @Column('integer', { nullable: false })
  rows: number;

  @Column('integer', { nullable: false })
  seats: number;

  @Column('double precision', { nullable: false })
  price: number;

  @Column('text', { nullable: false })
  taken: string;

  @Column('uuid', { nullable: false })
  filmId: string;

  @ManyToOne(() => Films, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filmId' })
  films: Films;
}
