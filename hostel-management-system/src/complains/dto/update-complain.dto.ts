import { PartialType } from '@nestjs/mapped-types';
import { CreateComplainDto } from './create-complain.dto';
import { User } from 'src/user/entities/user.entity';

export class UpdateComplainDto extends PartialType(CreateComplainDto) {
  user?: User;
}
