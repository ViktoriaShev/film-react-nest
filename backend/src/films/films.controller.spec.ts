import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let filmsController: FilmsController;

  const filmsServiceMock = {
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
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsServiceMock)
      .compile();

    filmsController = moduleRef.get<FilmsController>(FilmsController);
  });

  describe('GET /films', () => {
    it('should return a list of films', async () => {
      filmsServiceMock.getAllFilms.mockResolvedValue({
        total: 2,
        items: mockFilms,
      });

      const result = await filmsController.getAllFilms();
      expect(result).toEqual({
        total: 2,
        items: mockFilms,
      });

      expect(filmsServiceMock.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('GET /films/:id/schedule', () => {
    it('should return film schedule by ID', async () => {
      filmsServiceMock.getFilmById.mockResolvedValue({
        total: 1,
        items: mockSchedule,
      });

      const result = await filmsController.getFilmById('1');
      expect(result).toEqual({
        total: 1,
        items: mockSchedule,
      });

      expect(filmsServiceMock.getFilmById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if film is not found', async () => {
      filmsServiceMock.getFilmById.mockResolvedValue(null);

      try {
        await filmsController.getFilmById('999');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }

      expect(filmsServiceMock.getFilmById).toHaveBeenCalledWith('999');
    });
  });
});
