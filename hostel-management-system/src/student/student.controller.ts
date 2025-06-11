import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from 'src/student/student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Role } from 'src/profile/entities/profile.entity';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators';
import { AtGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decoretor';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@ApiBearerAuth()
@Controller('students')
@UseGuards(AtGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Public()

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
