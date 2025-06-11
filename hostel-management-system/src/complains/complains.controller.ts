import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators';
import { Roles } from 'src/auth/decorators/roles.decoretor';
import { Role } from 'src/profile/entities/profile.entity';

@ApiBearerAuth()
@ApiTags('Complains')
@Controller('complains')
export class ComplainsController {
  constructor(private readonly complainsService: ComplainsService) { }

  @Public()
  @Post()
  create(@Body() createComplainDto: CreateComplainDto) {
    return this.complainsService.create(createComplainDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @Get()
  findAll() {
    return this.complainsService.findAll();
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @Get(':complainid')
  findOne(@Param('complainid') id: string) {
    return this.complainsService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @Patch(':complainid')
  update(
    @Param('complainid') id: string,
    @Body() updateComplainDto: UpdateComplainDto,
  ) {
    return this.complainsService.update(+id, updateComplainDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Delete(':complainid')
  remove(@Param('complainid') id: string) {
    return this.complainsService.remove(+id);
  }
}
