import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProfileService } from './adminProfile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decoretor';
import { Role } from './entities/profile.entity';
import { Public } from 'src/auth/decorators';
@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) { }
  @Public()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.ProfileService.create(createProfileDto);
  }


  @Roles(Role.ADMIN, Role.STUDENT)

  @Get()
  findAll() {
    return this.ProfileService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProfileService.findOne(+id);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.ProfileService.update(+id, updateProfileDto);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProfileService.remove(+id);
  }
}
