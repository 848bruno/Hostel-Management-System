import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './adminProfile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('admin-profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) { }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.ProfileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.ProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.ProfileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProfileService.remove(+id);
  }
}
