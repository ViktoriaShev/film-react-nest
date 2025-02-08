import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../src/films/films.controller';
import { FilmsService } from '../src/films/films.service';
import { FilmDto, ScheduleDto } from '../src/films/dto/films.dto';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as supertest from 'supertest';

describe('FilmsController', () => {
  let app: INestApplication;

  // Пример моков для данных фильмов и расписания
  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmById: jest.fn(),
  };

  const mockFilms: Omit<FilmDto, 'schedule'>[] = [
    {
      id: '1',
      title: 'Film 1',
      rating: 1,
      director: 'Artur',
      tags: '',
      image: '',
      cover: '',
      about: '',
      description: '',
    },
    {
      id: '2',
      title: 'Film 2',
      rating: 2,
      director: 'Robert',
      tags: '',
      image: '',
      cover: '',
      about: '',
      description: '',
    },
  ];

  const mockSchedule: ScheduleDto = {
    id: '1',
    daytime: 'day',
    hall: 1,
    rows: 1,
    seats: 1,
    price: 100,
    taken: '1:1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(mockFilmsService)
      .compile();

    app = module.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  describe('GET /films', () => {
    it('should return a list of films', async () => {
      mockFilmsService.getAllFilms.mockResolvedValue({
        total: 2,
        items: mockFilms,
      });

      return supertest(app.getHttpServer())
        .get('/films')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            total: 2,
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                rating: expect.any(Number),
                director: expect.any(String),
                tags: expect.any(String),
                image: expect.any(String),
                cover: expect.any(String),
                about: expect.any(String),
                description: expect.any(String),
              }),
            ]),
          });
        });
    });
  });

  describe('GET /films/:id/schedule', () => {
    it('should return film schedule by ID', async () => {
      mockFilmsService.getFilmById.mockResolvedValue({
        total: 1,
        items: mockSchedule,
      });

      return supertest(app.getHttpServer())
        .get('/films/1/schedule')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            total: 1,
            items: expect.objectContaining({
              id: expect.any(String),
              daytime: expect.any(String),
              hall: expect.any(Number),
              rows: expect.any(Number),
              seats: expect.any(Number),
              price: expect.any(Number),
              taken: expect.any(String),
            }),
          });
        });
    });

    it('should return 404 if film is not found', async () => {
      mockFilmsService.getFilmById.mockRejectedValue(
        new NotFoundException('Film not found'),
      ); // Выбрасываем исключение

      return supertest(app.getHttpServer())
        .get('/films/9999999/schedule')
        .expect(404); // Ожидаем 404
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
