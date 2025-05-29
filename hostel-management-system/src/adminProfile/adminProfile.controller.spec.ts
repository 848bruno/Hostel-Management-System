import { Test, TestingModule } from '@nestjs/testing';
import { AdminProfileController } from './adminProfile.controller';
import { AdminProfileService } from './adminProfile.service';

describe('AdminProfileController', () => {
  let controller: AdminProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProfileController],
      providers: [AdminProfileService],
    }).compile();

    controller = module.get<AdminProfileController>(AdminProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
