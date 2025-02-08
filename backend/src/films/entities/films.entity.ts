import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Schedules } from './schedules.entity';

@Entity('films')
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision', { nullable: false })
  rating: number;

  @Column('varchar', { length: 255, nullable: false })
  director: string;

  @Column('text', { nullable: false })
  tags: string;

  @Column('varchar', { length: 255, nullable: false })
  image: string;

  @Column('varchar', { length: 255, nullable: false })
  cover: string;

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('varchar', { length: 500, nullable: false })
  about: string;

  @Column('varchar', { length: 1000, nullable: false })
  description: string;

  @OneToMany(() => Schedules, (schedules) => schedules.films, { cascade: true })
  schedule: Schedules[];
}
